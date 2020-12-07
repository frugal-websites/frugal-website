import React from "react"
import Amplify from "aws-amplify"
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import awsconfig from "../aws-exports"
import InsideApp from "./insideApp"

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
    <InsideApp />
  ) : (
    // <App />
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email",
            placeholder: "example@email.com",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "********",
            required: true,
          },
        ]}
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
  )
}

export default AppWithAuth
