import React from "react"
import Layout from "./Layout"

const Profile = () => {
  const { name } = "getCurrentUser()"

  return (
    <Layout>
      <div>
        <p>Welcome back to your profile, {name}!</p>
        <p>
          This is a client-only route. You could set up a form to save
          information about a user here.
        </p>
      </div>
    </Layout>
  )
}

export default Profile
