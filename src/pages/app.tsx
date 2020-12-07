import React from "react"
import Amplify from "aws-amplify"
import { navigate, Link } from "gatsby"
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifySignOut,
} from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import awsconfig from "../aws-exports"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AppWithAuth from "../components/AppWithAuth"

Amplify.configure(awsconfig)

// TODO find better place
import { I18n } from "aws-amplify"

const App: React.FunctionComponent = () => {
  // Overwrite error messages
  I18n.putVocabularies({
    en: {
      "Custom auth lambda trigger is not configured for the user pool.":
        "Password cannot be empty",
      "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
        "Password not long enough",
      "Password did not conform with policy: Password not long enough":
        "Password not long enough",
    },
  })

  return <AppWithAuth />
}

export default App
