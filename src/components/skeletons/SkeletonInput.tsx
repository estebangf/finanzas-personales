import { Skeleton } from "@mui/material";

export default function SkeletonInput() {

  return <>
    <Skeleton sx={{ mb: -2, width: 48 }} />
    <Skeleton sx={{ height: 68 }} />
  </>
}