import React, { useContext, useRef } from "react"
import { WebsiteEmailIdContext } from "../WebsiteEmailIdProvider/WebsiteEmailIdProvider"
import { RouteComponentProps } from "@reach/router"
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core"
import AppLayout from "../AppLayout/AppLayout"
import { useForm, Controller } from "react-hook-form"
import { gql, useQuery, useMutation } from "@apollo/client"
import LoadingPage from "../LoadingPage/LoadingPage"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import ErrorPage from "../ErrorPage/ErrorPage"
import LoadingButton from "../../common/LoadingButton/LoadingButton"
import RichTextEditor from "../RichTextEditor/RichTextEditor"
import {
  AmplifyS3TextPicker,
  AmplifyS3ImagePicker,
} from "@aws-amplify/ui-react"
import ImageUpload from "../ImageUpload/ImageUpload"

interface IGetLayoutData {
  layout: IFormInput
}

interface IGetLayoutVars {
  websiteEmailId: string
}

interface IUpdateLayoutVars {
  websiteEmailId: string
  formData: IFormInput
}

interface IFormInput {
  title: string
  testRichTextEditorContent: ""
}

const defaultValues: IFormInput = {
  title: "",
  testRichTextEditorContent: "",
}

const GET_LAYOUT_DATA = gql`
  query($websiteEmailId: String!) {
    layout(query: { websiteEmailId: $websiteEmailId }) {
      title
      testRichTextEditorContent
      testImageUrl
    }
  }
`

const UPDATE_LAYOUT_DATA = gql`
  mutation($websiteEmailId: String!, $formData: LayoutUpdateInput!) {
    updateOneLayout(
      query: { websiteEmailId: $websiteEmailId }
      set: $formData
    ) {
      websiteEmailId
    }
  }
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
      flexFlow: `column wrap`,
    },
    formTag: {
      width: `100%`,
    },
    formWrapper: {
      display: `flex`,
      alignItems: `flex-start`,
      flexFlow: `column wrap`,
      "& > label": {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
      },
    },
    formInput: {
      // marginLeft: theme.spacing(1),
    },
    saveButtonBox: {
      marginTop: theme.spacing(4),
      alignSelf: `center`,
    },
    imageTestWidthBox: {
      width: `100%`,
      height: `40vh`,
    },
  })
)

interface IEditContentSectionProps {}

const EditContentSection: React.FunctionComponent<IEditContentSectionProps> = ({}: IEditContentSectionProps) => {
  const classes = useStyles()

  const websiteEmailId: string = useContext(WebsiteEmailIdContext)
    .websiteEmailId

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues,
  })

  const { loading: queryLoading, error: queryError } = useQuery<
    IGetLayoutData,
    IGetLayoutVars
  >(GET_LAYOUT_DATA, {
    variables: { websiteEmailId },
    onCompleted: data => {
      // Need to make sure reset is finished before resetting RichTextEditors values.
      // https://github.com/react-hook-form/react-hook-form/discussions/2746
      const resetForm = async (data: any) => await reset(data)
      resetForm(data.layout)
    },
  })

  const [
    updateLayoutData,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation<{}, IUpdateLayoutVars>(UPDATE_LAYOUT_DATA)

  const onSubmit = (formData: IFormInput) => {
    updateLayoutData({
      variables: { websiteEmailId, formData },
    })
  }

  // if (queryError || mutationError) {
  //   console.log("HERE")
  //   console.log("queryError", queryError)
  //   console.log(queryError)

  //   console.log("mutationError", mutationError)
  // }

  if (queryLoading) return <LoadingPage />

  if (queryError || mutationError) return <ErrorPage />

  return (
    <Box className={classes.root}>
      <h1>Welcome to Content section.</h1>

      <form className={classes.formTag} onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.formWrapper}>
          <Box className={classes.imageTestWidthBox}>
            <Controller
              name="testImageUrl"
              control={control}
              render={({ value, onChange }) => {
                return (
                  <ImageUpload
                    formEditorState={value}
                    formOnChange={onChange}
                  />
                )
              }}
            />
          </Box>

          <label>Title</label>
          <Controller
            as={TextField}
            name="title"
            control={control}
            className={classes.formInput}
          />

          <Controller
            name="testRichTextEditorContent"
            control={control}
            render={({ value, onChange }) => {
              return (
                <RichTextEditor
                  formEditorState={value}
                  formOnChange={onChange}
                />
              )
            }}
          />

          <Box className={classes.saveButtonBox}>
            <LoadingButton
              displayName={"Save"}
              isLoading={mutationLoading}
              isError={mutationError != null}
            />
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default EditContentSection
