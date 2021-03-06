import React from "react"
import Link from "../components/common/Link"

import WebsiteLayout from "../components/website/WebsiteLayout/WebsiteLayout"

import Image from "../components/Image"
import SEO from "../components/Seo"
import RichTextEditor from "../components/app/RichTextEditor/RichTextEditor"

const IndexPage = () => (
  <WebsiteLayout>
    <SEO title="Home" />
    <h1>Welcome to Frugal Websites!</h1>
    <h2>Bla bla bla ...</h2>

    <div style={{ maxWidth: `1000px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <br />
    <Link to="/mainPage/">Go to Main Page</Link>
  </WebsiteLayout>
)

export default IndexPage
