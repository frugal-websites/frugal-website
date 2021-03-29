import React, { Fragment } from "react"
import Amplify, { Auth, Storage } from "aws-amplify"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import awsconfig from "../../../aws-exports"
import App from "../App/App"
import Authentication from "../Authentication/Authentication"
import { RealmAppProvider } from "../RealmApp/RealmApp"
import RealmApolloProvider from "../RealmApolloProvider/RealmApolloProvider"
import { WebsiteEmailIdContext } from "../WebsiteEmailIdProvider/WebsiteEmailIdProvider"
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core"
import { navigate } from "gatsby"

Amplify.configure(awsconfig)
Storage.configure({ level: "protected" })

const AppWithAuth: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>()
  const [user, setUser] = React.useState<object | undefined>()
  const [identityId, setIdentityId] = React.useState<string>("")

  let theme = null

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      // console.log("onAuthUIStateChange HERE")
      // console.log("nextAuthState", nextAuthState)
      // console.log("authData", authData)

      //setUser(authData)
      setUser(authData)

      setAuthState(nextAuthState)

      const getCreds = async () => {
        const credentials = await Auth.currentUserCredentials()
        // TODO add credentials.identityId in user info, because if not can`t map cognito username
        // to cognito identityId an can`t find which S3 buckets belongs to who
        setIdentityId(credentials.identityId)
      }
      getCreds()
    })
  }, [])

  const isAdmin = () => {
    const userGroups =
      // @ts-ignore
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
    // @ts-ignore
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
          <WebsiteEmailIdContext.Provider
            value={{ websiteEmailId: getWebsiteId(), identityId: identityId }}
          >
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
