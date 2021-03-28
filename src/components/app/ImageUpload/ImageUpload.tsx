import React, { useState, useEffect } from "react"
import { Box, Button, CircularProgress, IconButton } from "@material-ui/core"
import AddAPhotoSharpIcon from "@material-ui/icons/AddAPhotoSharp"
import { v4 as uuid } from "uuid"
import { Storage } from "aws-amplify"
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
} from "./ImageUploadMessages"

interface IImageData {
  name: string
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
  },
  saving: false,
}

interface IImageUploadProps {
  formEditorState: string
  formOnChange: (value: string) => void
}

const IMAGE_FILE_NAME_UUID_SEPARATOR = "_"
const UUID_STRING_LENGTH = 36

const ImageUpload: React.FunctionComponent<IImageUploadProps> = (
  props: IImageUploadProps
) => {
  const classes = useStyles()
  /* 1. Create local state with useState hook */
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [uploaderState, setUploaderState] = useState<IUploaderState>(
    initialUploaderState
  )
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>(
    initialSnackBarState
  )

  useEffect(() => {
    if (props.formEditorState && isFirstRender) {
      setUploaderState({ ...uploaderState, saving: true })

      const getImage = async () => {
        await Storage.get(props.formEditorState, {
          identityId: "us-east-1:236b2a21-a9d2-4de2-b065-4048ab213e45",
        })
          .then((signedURL: Object | string) => {
            let signedURLString =
              typeof signedURL == "string" ? String(signedURL) : null

            if (signedURLString) {
              const uploadedImage: IImageData = {
                name: props.formEditorState.slice(
                  0,
                  -(UUID_STRING_LENGTH + IMAGE_FILE_NAME_UUID_SEPARATOR.length)
                ),
              }

              setUploaderState({
                image: uploadedImage,
                fileURL: signedURLString,
                saving: false,
              })

              setIsFirstRender(false)
            }
          })
          .catch(err => {
            console.log("err", err)
            setUploaderState({ ...uploaderState, saving: false })
            triggerErrorSnackBar(<ErrorTryAgain />)
          })
      }
      getImage()
    }
  }, [props.formEditorState])

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

    const image_name_saved = `${
      filesInput![0].name
    }${IMAGE_FILE_NAME_UUID_SEPARATOR}${uuid()}`
    const image_file = filesInput![0]

    setUploaderState({ ...uploaderState, saving: true })

    await Storage.put(image_name_saved, image_file)
      .then(result => {
        console.log("result", result)
        const uploadedImage: IImageData = {
          name: image_file.name,
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
          <Button
            component="label"
            variant="contained"
            color="default"
            size="large"
            startIcon={<AddAPhotoSharpIcon />}
          >
            Add Image
            <input
              type="file"
              accept="image/*"
              onChange={onChangeFile}
              hidden
            />
          </Button>
        </Box>
      )}

      {uploaderState.fileURL && !uploaderState.saving && (
        <Box className={classes.imageRoot}>
          <Box className={classes.imageParentBox}>
            <Box className={classes.imageBox}>
              <Button
                component="label"
                variant="contained"
                color="default"
                size="large"
                className={classes.onHoverUploadButton}
                startIcon={<AddAPhotoSharpIcon />}
              >
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={onChangeFile}
                  hidden
                />
              </Button>

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
              <IconButton component="label" color="default">
                <AddAPhotoSharpIcon />
                <input
                  type="file"
                  accept="image/*"
                  onChange={onChangeFile}
                  hidden
                />
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
      justifyContent: `center`,
      alignItems: `center`,

      // backgroundColor: `Beige`,
      "&:hover > div": {
        opacity: 0.3,
      },
      "&:hover > label": {
        opacity: 1,
      },
    },
    imageContainer: {
      // backgroundColor: `green`,
      height: `100%`,
      display: `flex`,
      minHeight: 0,
      minWidth: 0,
      transition: `.5s ease`,
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
    onHoverUploadButton: {
      transition: `.5s ease`,
      position: `absolute`,
      transform: `translate(0, -50%)`,
      opacity: 0,
      zIndex: 1,
    },
  })
)

// https://stackoverflow.com/questions/42130384/why-should-i-specify-height-0-even-if-i-specified-flex-basis-0-in-css3-flexbox
// https://stackoverflow.com/questions/36230944/prevent-flex-items-from-overflowing-a-container
// https://stackoverflow.com/questions/62862296/how-to-get-a-div-with-extrinsic-height-and-intrinsic-width-inside-a-flexbox
export default ImageUpload
