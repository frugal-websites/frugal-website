import React from "react"
import Link from "../components/common/Link"

import WebsiteLayout from "../components/website/WebsiteLayout/WebsiteLayout"

import Image from "../components/Image"
import SEO from "../components/Seo"
import RichTextEditor from "../components/app/RichTextEditor/RichTextEditor"

import {
  AmplifyS3TextPicker,
  AmplifyS3ImagePicker,
} from "@aws-amplify/ui-react"

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

    <RichTextEditor />
    <AmplifyS3TextPicker />

    <AmplifyS3ImagePicker />
  </WebsiteLayout>
)

export default IndexPage
