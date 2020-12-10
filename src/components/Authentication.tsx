import React from "react"
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react"

const Authentication: React.FunctionComponent = () => {
  return (
    <div>
      {/* TODO ajouter back to home page <div>allo</div> */}
      <div>
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
      </div>
    </div>
  )
}

export default Authentication
