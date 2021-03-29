import React, { useContext } from "react"
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
import { green } from "@material-ui/core/colors"
import clsx from "clsx"
import ErrorPage from "../ErrorPage/ErrorPage"
import LoadingButton from "../../common/LoadingButton/LoadingButton"

interface IGetWebsiteData {
  website: IFormInput
}

interface IGetWebsiteVars {
  websiteEmailId: string
}

interface IUpdateWebsiteVars {
  websiteEmailId: string
  formData: IFormInput
}

interface IFormInput {
  websiteEmailId: string
  notificationEmail: string
  firstName: string
  phoneNumber: string
  appLanguage: string
}

const defaultValues: IFormInput = {
  websiteEmailId: "",
  notificationEmail: "",
  firstName: "",
  phoneNumber: "",
  appLanguage: "fr",
}

const GET_WEBSITE_DATA = gql`
  query($websiteEmailId: String!) {
    website(query: { websiteEmailId: $websiteEmailId }) {
      websiteEmailId
      notificationEmail
      firstName
      phoneNumber
      appLanguage
    }
  }
`

const UPDATE_WEBSITE_DATA = gql`
  mutation($websiteEmailId: String!, $formData: WebsiteUpdateInput!) {
    updateOneWebsite(
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
  })
)

interface IProfilePageProps extends RouteComponentProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = ({}: IProfilePageProps) => {
  const classes = useStyles()

  const websiteEmailId: string = useContext(WebsiteEmailIdContext)
    .websiteEmailId

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues,
  })

  const { loading: queryLoading, error: queryError, data } = useQuery<
    IGetWebsiteData,
    IGetWebsiteVars
  >(GET_WEBSITE_DATA, {
    variables: { websiteEmailId },
    onCompleted: data => {
      reset(data.website)
    },
  })

  const [
    updateWebsiteData,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation<{}, IUpdateWebsiteVars>(UPDATE_WEBSITE_DATA)

  const onSubmit = (formData: IFormInput) => {
    updateWebsiteData({
      variables: { websiteEmailId, formData },
    })
  }

  if (queryLoading)
    return (
      <AppLayout>
        <LoadingPage />
      </AppLayout>
    )

  if (queryError || mutationError)
    return (
      <AppLayout>
        <ErrorPage />
      </AppLayout>
    )

  return (
    <AppLayout>
      <Box className={classes.root}>
        <Box mt={8} mb={4}>
          <Typography variant="h4">
            Welcome back to your profile,{" "}
            {data && data.website.firstName
              ? data?.website.firstName
              : data?.website.websiteEmailId}
            !
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.formWrapper}>
            <label>Account Email</label>
            <Controller
              as={TextField}
              name="websiteEmailId"
              control={control}
              className={classes.formInput}
              InputProps={{
                readOnly: true,
              }}
            />

            <label>Notification Email</label>
            <Controller
              as={TextField}
              name="notificationEmail"
              control={control}
              className={classes.formInput}
            />

            <label>First Name</label>
            <Controller
              as={TextField}
              name="firstName"
              control={control}
              className={classes.formInput}
            />

            <label>Phone Number</label>
            <Controller
              as={TextField}
              name="phoneNumber"
              control={control}
              className={classes.formInput}
            />

            <label>App language</label>
            <Controller
              name="appLanguage"
              defaultValue=""
              control={control}
              className={classes.formInput}
              as={
                <RadioGroup aria-label="language">
                  <FormControlLabel
                    value="fr"
                    control={<Radio />}
                    label="French"
                  />
                  <FormControlLabel
                    value="en"
                    control={<Radio />}
                    label="English"
                  />
                </RadioGroup>
              }
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
    </AppLayout>
  )
}

export default ProfilePage
