import React from "react"
import { Router } from "@reach/router"
import Profile from "../Profile/Profile"

import AdminDashboard from "../AdminDashboard/AdminDashboard"
import UserDashboard from "../UserDashboard/UserDashboard"
import EditPage from "../EditPage/EditPage"

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
      <EditPage path="/app/edit" />
      <Profile path="/app/profile" />
    </Router>
  )
}
export default App
