import React from "react"
import Amplify from "aws-amplify"
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import awsconfig from "../aws-exports"
import App from "./App"
import { Router } from "@reach/router"
import Profile from "./Profile"
import Authentication from "./Authentication"

Amplify.configure(awsconfig)

const AppWithAuth: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>()
  const [user, setUser] = React.useState<object | undefined>()

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      console.log("onAuthUIStateChange HERE")
      console.log("nextAuthState", nextAuthState)
      console.log("authData", authData)

      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user ? (
    <div>
      <Router basepath="/app">
        <Profile path="/profile" />
      </Router>
      <App />
    </div>
  ) : (
    // <App />
    <Authentication />
  )
}

export default AppWithAuth
