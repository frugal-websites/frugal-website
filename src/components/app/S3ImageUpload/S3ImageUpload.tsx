import React, { ReactElement, useState } from "react"
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  IconButton,
  Snackbar,
} from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { AlertProps } from "@material-ui/lab/Alert"
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined"
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined"
import { v4 as uuid } from "uuid"
import { Storage, API, Auth } from "aws-amplify"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import BaseSnackBar, {
  ISnackBarState,
  initialSnackBarState,
  newErrorSnackBarState,
} from "../SnackBars/BaseSnackBar"
import {
  ErrorFileSizeTooBig,
  ErrorNeedOneFileInput,
  ErrorOnlyOneFileInput,
  ErrorTryAgain,
  ErrorWithFileInput,
  ErrorWrongFileType,
} from "./S3ImageUploadMessages"

// x Button delete top right always visible
// x Button to change picture always visible

// never mind
// - on: hover
// 	- button CHANGE to be able to update the picture
// 	- button DELETE to delete the picture

// Make delete button work
// Make Update button work

interface IImageData {
  name: string
  file: File | null
}

interface IUploaderState {
  fileURL: string
  image: IImageData
  saving: boolean
}
/* Initial state to hold form input, saving state */
const initialUploaderState: IUploaderState = {
  fileURL: "",
  image: {
    name: "",
    file: null,
  },
  saving: false,
}

interface IS3ImageUploadProps {}

const S3ImageUpload: React.FunctionComponent<IS3ImageUploadProps> = ({}: IS3ImageUploadProps) => {
  const classes = useStyles()
  /* 1. Create local state with useState hook */
  const [uploaderState, setUploaderState] = useState<IUploaderState>(
    initialUploaderState
  )
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>(
    initialSnackBarState
  )

  function areFilesInputValid(fileListInput: FileList | null) {
    if (!fileListInput) {
      triggerErrorSnackBar(<ErrorWithFileInput />)
      return false
    }

    if (fileListInput.length > 1) {
      triggerErrorSnackBar(<ErrorOnlyOneFileInput />)
      return false
    }

    const fileInput = fileListInput[0]

    if (fileListInput.length != 1 || !fileInput) {
      triggerErrorSnackBar(<ErrorNeedOneFileInput />)
      return false
    }

    const re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i
    if (!re.exec(fileInput.name.toLowerCase())) {
      triggerErrorSnackBar(<ErrorWrongFileType />)
      return false
    }

    const twentyOneMBInBytes = 22020096
    if (fileInput.size > twentyOneMBInBytes) {
      triggerErrorSnackBar(<ErrorFileSizeTooBig />)
    }

    return true
  }

  /* 3. onChangeFile handler will be fired when a user uploads a file  */
  async function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    event.persist()
    const filesInput = event.target ? event.target.files : null

    const areFilesValid = areFilesInputValid(filesInput)
    if (!areFilesValid) {
      return
    }

    const image_name_saved = `${filesInput![0].name}_${uuid()}`
    const image_file = filesInput![0]

    setUploaderState({ ...uploaderState, saving: true })

    await Storage.put(image_name_saved, image_file)
      .then(result => {
        console.log("result", result)
        const uploadedImage: IImageData = {
          name: image_file.name,
          file: image_file,
        }

        setUploaderState({
          image: uploadedImage,
          fileURL: URL.createObjectURL(event.target.files![0]),
          saving: false,
        })
      })
      .catch(err => {
        console.log("err", err)
        setUploaderState({ ...uploaderState, saving: false })
        triggerErrorSnackBar(<ErrorTryAgain />)
      })
  }

  const triggerErrorSnackBar = (MessageReactNode: React.ReactNode) => {
    handleSnackBarOpen({
      ...newErrorSnackBarState,
      message: MessageReactNode,
    })
  }

  const handleSnackBarOpen = (newSnackBarState: ISnackBarState) => {
    setSnackBarState(newSnackBarState)
  }

  const handleSnackBarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setSnackBarState({ ...snackBarState, isOpen: false })
  }

  const getTruncatedFileName = (fileName: string) => {
    if (!fileName) {
      return ""
    }

    if (fileName.length < 50) {
      return fileName
    }

    const re = /(?:\.([^.]+))?$/
    const fileType = re.exec(fileName)![1] ? re.exec(fileName)![1] : ""

    const numberOfCharKeptBeginningAndEndOfWord = 15
    const fileNamePartOne = fileName.substring(
      0,
      numberOfCharKeptBeginningAndEndOfWord
    )
    const fileNameMiddlePart = " ... "

    const fileNamePartTwo = fileName.slice(
      fileName.length - numberOfCharKeptBeginningAndEndOfWord
    )
    const truncatedFileName =
      fileNamePartOne + fileNameMiddlePart + fileNamePartTwo

    return truncatedFileName
  }

  return (
    <Box className={classes.root}>
      {!uploaderState.fileURL && !uploaderState.saving && (
        <Box className={classes.inputRoot} border={1} borderColor="grey.main">
          <Fab component="label">
            <AddPhotoAlternateOutlinedIcon />
            <input
              type="file"
              accept="image/*"
              onChange={onChangeFile}
              id="imageInput"
              hidden
            />
          </Fab>
        </Box>
      )}

      {uploaderState.fileURL && (
        <Box className={classes.imageRoot}>
          <Box className={classes.imageParentBox}>
            <Box className={classes.imageBox}>
              <Box className={classes.imageContainer}>
                <img
                  className={classes.imageStyle}
                  alt="preview"
                  src={uploaderState.fileURL}
                />
                <Box className={classes.imageNameContainer}>
                  <Box
                    component="span"
                    className={classes.textImageNameContainer}
                  >
                    {getTruncatedFileName(uploaderState.image.name)}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.imageSideMenuContainer}>
              <IconButton color="primary">
                <DeleteForeverOutlinedIcon />
              </IconButton>

              <IconButton color="primary">
                <AddPhotoAlternateOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
      {uploaderState.saving && (
        <Box className={classes.savingContainer}>
          <CircularProgress />
        </Box>
      )}
      <BaseSnackBar
        snackBarState={snackBarState}
        handleSnackBarClose={handleSnackBarClose}
      />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: `100%`,
      height: `100%`,
      // backgroundColor: `purple`,
      display: `flex`,
      justifyContent: `center`,
    },
    inputRoot: {
      width: `100%`,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
      // backgroundColor: `yellow`,
      minWidth: 0,
    },
    imageRoot: {
      // backgroundColor: `lightsteelblue`,
      height: `100%`,
    },
    imageParentBox: {
      height: `100%`,
      display: `flex`,
      // padding: theme.spacing(4),
      minWidth: 0,
      // backgroundColor: `Aqua`,
    },
    imageBox: {
      height: `100%`,
      display: `flex`,
      minWidth: 0,
      // backgroundColor: `Beige`,
    },
    imageContainer: {
      // backgroundColor: `green`,
      height: `100%`,
      display: `flex`,
      minHeight: 0,
      minWidth: 0,
      // justifyContent: `center`, PEUT-[ETRE AJOUTER]
      flexDirection: `column`,
    },
    imageStyle: {
      objectFit: `contain`,
      maxHeight: `85%`,
      margin: 0,
    },
    imageNameContainer: {
      wordBreak: `break-all`,
      maxWidth: `fit-content`,
      alignSelf: `center`,
      display: `flex`,
      minWidth: 0,
    },
    textImageNameContainer: {
      textAlign: `center`,
      marginTop: theme.spacing(2),
    },
    imageSideMenuContainer: {
      display: `flex`,
      flexDirection: `column`,
    },
    savingContainer: {
      width: `100%`,
      minHeight: `100%`,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
      // backgroundColor: `red`,
    },
  })
)

// https://stackoverflow.com/questions/42130384/why-should-i-specify-height-0-even-if-i-specified-flex-basis-0-in-css3-flexbox
// https://stackoverflow.com/questions/36230944/prevent-flex-items-from-overflowing-a-container
// https://stackoverflow.com/questions/62862296/how-to-get-a-div-with-extrinsic-height-and-intrinsic-width-inside-a-flexbox
export default S3ImageUpload
