import React from "react"
import Layout from "./Layout"
import { AmplifySignOut } from "@aws-amplify/ui-react"

type UserDashboardProps = {
  userEmail: string
}

const UserDashboard = ({ userEmail }: UserDashboardProps) => {
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
