import React from "react"
import { Router } from "@reach/router"

import AdminDashboard from "../AdminDashboard/AdminDashboard"
import EditPage from "../EditPage/EditPage"
import UserDashboardPage from "../UserDashboardPage/UserDashboardPage"
import ProfilePage from "../ProfilePage/ProfilePage"

type AppProps = {
  isAdmin: boolean
  websiteEmailId: string
}

const App = ({ isAdmin, websiteEmailId }: AppProps) => {
  return isAdmin ? (
    <Router>
      <AdminDashboard path="/app" />
    </Router>
  ) : (
    <Router id="reach-router-focus-wrapper">
      <UserDashboardPage path="/app" websiteEmailId={websiteEmailId} />
      <EditPage path="/app/edit" />
      <ProfilePage path="/app/profile" />
    </Router>
  )
}
export default App
