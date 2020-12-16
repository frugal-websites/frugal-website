import React from "react"
import Layout from "../../website/Layout/Layout"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { Router } from "@reach/router"
import Profile from "../Profile/Profile"

import AdminDashboard from "../AdminDashboard/AdminDashboard"
import UserDashboard from "../UserDashboard/UserDashboard"

type AppProps = {
  isAdmin: boolean
  userEmail: string
}

const App = ({ isAdmin, userEmail }: AppProps) => {
  console.log("APP_UserEmail", userEmail)
  return isAdmin ? (
    <Router>
      <AdminDashboard path="/app" />
    </Router>
  ) : (
    <Router>
      <UserDashboard path="/app" userEmail={userEmail} />
      <Profile path="/app/profile" />
    </Router>
  )
}
export default App
