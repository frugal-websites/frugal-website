import React from "react"
import { Box } from "@material-ui/core"

export const ErrorWithFileInput: React.FC = () => (
  <Box>
    An error occurred please try again, if it persist please try a new file.
  </Box>
)

export const ErrorOnlyOneFileInput: React.FC = () => (
  <Box>Please only select one image.</Box>
)

export const ErrorNeedOneFileInput: React.FC = () => (
  <Box>Please select one image.</Box>
)

export const ErrorWrongFileType: React.FC = () => (
  // TODO add current file type using files[0].type
  <Box>
    Please select an image with a valid file type.
    <Box>Valid file types:</Box>
    <Box fontWeight="fontWeightBold">.jpg .jpeg .bmp .gif or .png</Box>
  </Box>
)

export const ErrorFileSizeTooBig: React.FC = () => (
  // TODO add current file size?
  <Box>Please select an image of size less than 20MB.</Box>
)

export const ErrorTryAgain: React.FC = () => (
  <Box>Something went wrong. Please try to upload the image again.</Box>
)
