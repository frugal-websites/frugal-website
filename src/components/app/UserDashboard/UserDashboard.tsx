import React from "react"
import Layout from "../../website/Layout/Layout"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { RouteComponentProps } from "@reach/router"

interface IUserDashboardProps extends RouteComponentProps {
  userEmail: string
}

const UserDashboard: React.FunctionComponent<IUserDashboardProps> = (
  userEmail: IUserDashboardProps
) => {
  return (
    <Layout>
      <div>
        <div style={{ maxWidth: `200px`, margin: `1.4rem`, float: `right` }}>
          <AmplifySignOut />
        </div>
        <h2>Congrats you are an User.</h2>
        <h3>Hello {userEmail}.</h3>
      </div>
    </Layout>
  )
}
export default UserDashboard
