import React from "react"
import Layout from "./Layout"
import { AmplifySignOut } from "@aws-amplify/ui-react"

type AdminDashboardProps = {}

const AdminDashboard = ({}: AdminDashboardProps) => {
  return (
    <Layout>
      <div>
        <div style={{ maxWidth: `200px`, margin: `1.4rem`, float: `right` }}>
          <AmplifySignOut />
        </div>
        <h2>Congrats you are an Admin.</h2>
      </div>
    </Layout>
  )
}
export default AdminDashboard
