import React from "react"
import Link from "../components/common/Link"

import Layout from "../components/website/Layout/Layout"
import Image from "../components/Image"
import SEO from "../components/Seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome to Frugal Websites!</h1>
    <h2>Bla bla bla ...</h2>

    <div style={{ maxWidth: `1000px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <br />
    <Link to="/mainPage/">Go to Main Page</Link>
  </Layout>
)

export default IndexPage
