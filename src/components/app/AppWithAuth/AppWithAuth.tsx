import React, { Fragment } from "react"
import Amplify from "aws-amplify"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import awsconfig from "../../../aws-exports"
import App from "../App/App"
import { Router } from "@reach/router"
import Profile from "../Profile/Profile"
import Authentication from "../Authentication/Authentication"
import { RealmAppProvider } from "../RealmApp/RealmApp"
import RealmApolloProvider from "../RealmApolloProvider/RealmApolloProvider"
import { WebsiteEmailIdContext } from "../WebsiteEmailIdProvider/WebsiteEmailIdProvider"
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
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
    <Fragment>
      <RealmAppProvider appId={process.env.GATSBY_REALM_APP_ID}>
        <RealmApolloProvider>
          <WebsiteEmailIdContext.Provider value={getWebsiteId()}>
            <MuiThemeProvider theme={getMuiTheme()}>
              <App isAdmin={isAdmin()} websiteEmailId={getWebsiteId()} />
            </MuiThemeProvider>
          </WebsiteEmailIdContext.Provider>
        </RealmApolloProvider>
      </RealmAppProvider>
    </Fragment>
  ) : (
    <Authentication />
  )
}

export default AppWithAuth
