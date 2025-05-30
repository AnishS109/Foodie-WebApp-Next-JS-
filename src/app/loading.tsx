import { CircularProgress } from "@mui/material"

const loading = () => {
  return (
    <>
    <div className="h-[70vh] w-full flex justify-center items-center">
      <CircularProgress size={35} sx={{color:"black"}}/>
    </div>
    </>
  )
}

export default loading