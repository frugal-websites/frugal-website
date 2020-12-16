import React from "react"
import Layout from "../../website/Layout/Layout"
import { WebsiteIdContext } from "../WebsiteIdProvider/WebsiteIdProvider"
import { RouteComponentProps } from "@reach/router"
import { Typography } from "@material-ui/core"
import AppLayout from "../AppLayout/AppLayout"

interface IProfileProps extends RouteComponentProps {}

const Profile: React.FunctionComponent<IProfileProps> = ({}: IProfileProps) => {
  return (
    <WebsiteIdContext.Consumer>
      {websiteId => (
        <AppLayout>
          <Typography variant="h1" gutterBottom>
            Welcome back to your profile, {websiteId}!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            This is a client-only route. You could set up a form to save
            information about a user here.
          </Typography>
        </AppLayout>
      )}
    </WebsiteIdContext.Consumer>
  )
}

export default Profile
