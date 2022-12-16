import { Skeleton } from '@mui/material'

const SkeletonInput: React.FC<{}> = () => {
  return <>
    <Skeleton sx={{ mb: -2, width: 48 }} />
    <Skeleton sx={{ height: 68 }} />
  </>
}

export default SkeletonInput
