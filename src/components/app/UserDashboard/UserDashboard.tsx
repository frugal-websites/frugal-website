import React from "react"
import { RouteComponentProps } from "@reach/router"
import AppLayout from "../AppLayout/AppLayout"

interface IUserDashboardProps extends RouteComponentProps {
  websiteEmailId: string
}

const UserDashboard: React.FunctionComponent<IUserDashboardProps> = (
  props: IUserDashboardProps
) => {
  return (
    <AppLayout>
      <div>
        <h2>Congrats you are a User.</h2>
        <h3>Hello {props.websiteEmailId}.</h3>
        <h4>TODO add info about: </h4>
        <ul>
          <li>Website status</li>
          <li>Stats about website traffic etc.</li>
        </ul>
      </div>
    </AppLayout>
  )
}
export default UserDashboard
