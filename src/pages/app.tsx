import React from "react"
// import AppWithAuth from "../components/AppWithAuth"

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

  // <AppWithAuth />
  return <div>test</div>
}

export default App
