import React from "react"
import Layout from "../../website/Layout/Layout"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { RouteComponentProps } from "@reach/router"
import AppLayout from "../AppLayout/AppLayout"

interface IUserDashboardProps extends RouteComponentProps {
  userEmail: string
}

const UserDashboard: React.FunctionComponent<IUserDashboardProps> = (
  props: IUserDashboardProps
) => {
  return (
    <AppLayout>
      <div>
        <div style={{ maxWidth: `200px`, margin: `1.4rem`, float: `right` }}>
          <AmplifySignOut />
        </div>
        <h2>Congrats you are a User.</h2>
        <h3>Hello {props.userEmail}.</h3>
      </div>
    </AppLayout>
  )
}
export default UserDashboard
