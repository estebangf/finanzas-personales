import { DocumentData } from "firebase/firestore"
import { Timestamp } from "firebase/firestore"

const PROFILES_COLLECTION = "profiles";

interface ProfileModel {
  _id: string
  createdAt: Date
  displayName: string
  email: string
  phoneNumber: string
  photoURL: string
}

// Firestore data converter
const profileConverter = {
  toFirestore: (profile: ProfileModel) => {
    return {
      createdAt: Timestamp.fromDate(profile.createdAt),
      displayName: profile.displayName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      photoURL: profile.photoURL,
    }
  },
  fromFirestore: (snapshot: DocumentData, options: any) => {
    const data = snapshot.data(options)
    let newProfile: ProfileModel = {
      _id: snapshot.id,
      createdAt: data.createdAt.toDate(),
      displayName: data.displayName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      photoURL: data.photoURL,
    }
    return newProfile;
  },
}

const initialProfile: ProfileModel = {
  _id: "new",
  createdAt: new Date(),
  displayName: "",
  email: "",
  phoneNumber: "",
  photoURL: "",
}


export {
  PROFILES_COLLECTION,
  profileConverter,
  initialProfile
}

export default ProfileModel;