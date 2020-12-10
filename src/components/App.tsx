import React from "react"
import Layout from "./Layout"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import AdminDashboard from "./AdminDashboard"
import UserDashboard from "./UserDashboard"

type AppProps = {
  isAdmin: boolean
  userEmail: string
}

const App = ({ isAdmin, userEmail }: AppProps) => {
  return isAdmin ? <AdminDashboard /> : <UserDashboard userEmail={userEmail} />
}
export default App
