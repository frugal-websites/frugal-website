import React from "react"
import Amplify from "aws-amplify"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import awsconfig from "../../../aws-exports"
import App from "../App/App"
import { Router } from "@reach/router"
import Profile from "../Profile/Profile"
import Authentication from "../Authentication/Authentication"
import { RealmAppProvider } from "../RealmApp/RealmApp"
import RealmApolloProvider from "../RealmApolloProvider/RealmApolloProvider"
import { WebsiteIdContext } from "../WebsiteIdProvider/WebsiteIdProvider"
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core"

Amplify.configure(awsconfig)

const AppWithAuth: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>()
  const [user, setUser] = React.useState<object | undefined>()
  let theme = null

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      console.log("onAuthUIStateChange HERE")
      console.log("nextAuthState", nextAuthState)
      console.log("authData", authData)

      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  const isAdmin = () => {
    const userGroups =
      user.signInUserSession.accessToken.payload["cognito:groups"]

    if (userGroups == null) {
      return false
    }

    if (userGroups.includes("AdminUsers")) {
      return true
    }

    return false
  }

  const getWebsiteId = () => {
    return user.attributes.email
  }

  const getMuiTheme = () => {
    theme = createMuiTheme()
    theme = responsiveFontSizes(theme)
    return theme
  }

  return authState === AuthState.SignedIn && user ? (
    <div>
      <RealmAppProvider appId={process.env.GATSBY_REALM_APP_ID}>
        <RealmApolloProvider>
          <WebsiteIdContext.Provider value={getWebsiteId()}>
            <MuiThemeProvider theme={getMuiTheme()}>
              <App isAdmin={isAdmin()} userEmail={getWebsiteId()} />
            </MuiThemeProvider>
          </WebsiteIdContext.Provider>
        </RealmApolloProvider>
      </RealmAppProvider>
    </div>
  ) : (
    <Authentication />
  )
}

export default AppWithAuth
