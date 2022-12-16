import React, { useEffect, useState } from 'react'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { doc, Firestore, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth'
import firebaseConfig from '../tools/firebase.config'
import ProfileModel, { PROFILES_COLLECTION, profileConverter } from '../models/ProfileModel'

export interface AuthContextType {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  user: User | null
  accessToken: string | null
  firebase: FirebaseApp
  analytics: Analytics
  firestore: Firestore
  signInGoogle: () => Promise<User>
  signout: () => Promise<void>
}

export const AuthContext = React.createContext<AuthContextType>(null!)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState('Finanzas Personales')
  const [user, setUser] = useState<User | null>(null)
  // const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const firebase: FirebaseApp = initializeApp(firebaseConfig)
  const analytics: Analytics = getAnalytics(firebase)
  const firestore: Firestore = getFirestore(firebase)
  const auth: Auth = getAuth(firebase)

  useEffect(() => {
    auth.onAuthStateChanged(userObserver => {
      if (userObserver == null) {
        localStorage.removeItem('userUID')
        localStorage.removeItem('accessToken')
      }
      setUser(userObserver)
    })
  }, [auth])

  useEffect(() => {
    if (user != null) {
      const lastUserUID = localStorage.getItem('userUID')
      if (lastUserUID === user.uid) { setAccessToken(localStorage.getItem('accessToken')) }
    }
  }, [user])

  return (
    <AuthContext.Provider value={{
      title,
      setTitle,
      user,
      accessToken,
      firebase,
      analytics,
      firestore,
      signInGoogle: () => new Promise<User>((resolve, reject) => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log('result auth', result)
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)
            console.log('credentials auth', credential)
            if (credential != null) {
              const accessToken = credential.accessToken
              if (accessToken) localStorage.setItem('accessToken', accessToken)
              // The signed-in user info.
              const user = result.user
              localStorage.setItem('userUID', user.uid)
              const userRefDoc = doc(firestore, PROFILES_COLLECTION, user.uid).withConverter(profileConverter)
              getDoc(userRefDoc).then(userDocSnapshot => {
                if (!userDocSnapshot.exists()) {
                  const profile: ProfileModel = {
                    createdAt: new Date(),
                    displayName: user.displayName!,
                    email: user.email!,
                    phoneNumber: user.phoneNumber!,
                    photoURL: user.photoURL!,
                    _id: ''
                  }
                  setDoc(doc(firestore, PROFILES_COLLECTION, user.uid).withConverter(profileConverter), profile).then(() => {
                    resolve(user)
                  }).catch(error => {
                    alert('ERROR: REGISTRO DE PROFILEA')
                    console.error('REGISTRO DE PROFILEA => ', error)
                    reject(error.message)
                  })
                } else {
                  // setProfile(userDocSnapshot.data())
                  resolve(user)
                }
              }).catch(error => {
                console.error('Error col users => ', error)
                const code = 'ERROR'
                const message = 'Error'
                reject(new Error(message))
              })
            } else {
              const code = 'ERROR'
              const message = 'Error'
              reject(new Error(message))
            }
          })
          .catch((error) => {
            // Handle Errors here.
            const code = error.code
            const message = error.message
            // The email of the user's account used.
            const email = error.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            // ...
            reject(new Error(message, { cause: { code, message, email, credential } }))
          })
      }),
      signout: () => signOut(auth)
    }}
    >{children}</AuthContext.Provider>
  )
}

export default AuthProvider
