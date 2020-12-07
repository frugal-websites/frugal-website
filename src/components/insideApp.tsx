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
      {/* <Router basepath="/app"> */}
      <div>
        <div>Hello 3333</div>
        <AmplifySignOut />
      </div>
      {/* <Profile path="/profile" />
        <Details path="/details" />
        <Login path="/login" />
        <Default path="/" /> */}
      {/* </Router> */}
    </Layout>
  )
}
export default InsideApp
