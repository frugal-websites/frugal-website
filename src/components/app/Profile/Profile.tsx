import React from "react"
import Layout from "../../website/Layout/Layout"
import { WebsiteIdContext } from "../WebsiteIdProvider/WebsiteIdProvider"
import { RouteComponentProps } from "@reach/router"

interface IProfileProps extends RouteComponentProps {}

const Profile: React.FunctionComponent<IProfileProps> = ({}: IProfileProps) => {
  return (
    <WebsiteIdContext.Consumer>
      {websiteId => (
        <Layout>
          <div>
            <p>Welcome back to your profile, {websiteId}!</p>
            <p>
              This is a client-only route. You could set up a form to save
              information about a user here.
            </p>
          </div>
        </Layout>
      )}
    </WebsiteIdContext.Consumer>
  )
}

export default Profile
