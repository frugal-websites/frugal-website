import React from "react"
import { Router } from "@reach/router"
import Profile from "../Profile/Profile"

import AdminDashboard from "../AdminDashboard/AdminDashboard"
import UserDashboard from "../UserDashboard/UserDashboard"

type AppProps = {
  isAdmin: boolean
  websiteEmailId: string
}

const App = ({ isAdmin, websiteEmailId }: AppProps) => {
  console.log("APP_UserEmail", websiteEmailId)
  return isAdmin ? (
    <Router>
      <AdminDashboard path="/app" />
    </Router>
  ) : (
    <Router id="reach-router-focus-wrapper">
      <UserDashboard path="/app" websiteEmailId={websiteEmailId} />
      <Profile path="/app/profile" />
    </Router>
  )
}
export default App
