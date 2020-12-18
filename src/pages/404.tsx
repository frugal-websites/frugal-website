import React from "react"

import WebsiteLayout from "../components/website/WebsiteLayout/WebsiteLayout"
import SEO from "../components/Seo"

const NotFoundPage = () => (
  <WebsiteLayout>
    <SEO title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </WebsiteLayout>
)

export default NotFoundPage
