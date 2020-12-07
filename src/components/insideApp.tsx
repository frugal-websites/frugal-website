import React from "react"
import Layout from "./layout"
// import Profile from "../components/Profile"
// import Details from "../components/Details"
// import Login from "../components/Login"
// import Default from "../components/Default"
import { AmplifySignOut } from "@aws-amplify/ui-react"

const InsideApp = () => {
  return (
    <Layout>
      <div>
        <div style={{ maxWidth: `200px`, margin: `1.4rem`, float: `right` }}>
          <AmplifySignOut />
        </div>
        <h2>Second Bla Bla Bla ...</h2>
      </div>
    </Layout>
  )
}
export default InsideApp
