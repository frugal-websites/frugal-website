import React from "react"

interface IWebsiteEmailIdProvider {
  websiteEmailId: string
  identityId: string
}

export const WebsiteEmailIdContext = React.createContext<
  IWebsiteEmailIdProvider
>({ websiteEmailId: "", identityId: "" })
