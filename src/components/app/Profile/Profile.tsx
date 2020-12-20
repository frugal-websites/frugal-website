import React, { useContext } from "react"
import { WebsiteEmailIdContext } from "../WebsiteEmailIdProvider/WebsiteEmailIdProvider"
import { RouteComponentProps } from "@reach/router"
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core"
import AppLayout from "../AppLayout/AppLayout"
import { useForm, Controller } from "react-hook-form"
import { gql, useQuery, useMutation } from "@apollo/client"

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

interface IProfileProps extends RouteComponentProps {}

const Profile: React.FunctionComponent<IProfileProps> = ({}: IProfileProps) => {
  const websiteEmailId = useContext(WebsiteEmailIdContext)

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues,
  })

  const { loading, error } = useQuery(GET_WEBSITE_DATA, {
    variables: { websiteEmailId },
    onCompleted: data => {
      reset(data.website)
    },
  })

  const [
    updateWebsiteData,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_WEBSITE_DATA)

  const onSubmit = (formData: IFormInput) => {
    console.log(formData)
    updateWebsiteData({
      variables: { websiteEmailId, formData },
    })
  }

  if (loading) return <p>LOADING</p>
  if (error) return <p>ERROR</p>

  return (
    <AppLayout>
      <div>
        <h2>Welcome back to your profile, {websiteEmailId}!</h2>
        <h4>TODO add info about: </h4>
        <ul>
          <li>FirstName</li>
          <li>Fr or Eng for app</li>
          <li>Phone Number</li>
          <li>FR or En for website.</li>
          <li>Payments details</li>
        </ul>
      </div>

      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="container">
            <section>
              <label>Account Email</label>
              <Controller
                as={TextField}
                name="websiteEmailId"
                control={control}
              />
            </section>
            <section>
              <label>Notification Email</label>
              <Controller
                as={TextField}
                name="notificationEmail"
                control={control}
              />
            </section>

            <section>
              <label>First Name</label>
              <Controller as={TextField} name="firstName" control={control} />
            </section>

            <section>
              <label>Phone Number</label>
              <Controller as={TextField} name="phoneNumber" control={control} />
            </section>

            <section>
              <label>App language</label>
              <Controller
                name="appLanguage"
                defaultValue=""
                control={control}
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
            </section>
          </Box>

          <button className="button">submit</button>
        </form>
      </Box>
    </AppLayout>
  )
}

export default Profile
