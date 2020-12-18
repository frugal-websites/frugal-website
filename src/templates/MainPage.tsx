import React from "react"
import Link from "../components/common/Link"
import WebsiteLayout from "../components/website/WebsiteLayout/WebsiteLayout"
import { graphql } from "gatsby"

// const post = data.markdownRemark { data }

function SecondDescription(props: any) {
  const isDisplayed = props.isSecondDescription
  if (isDisplayed) {
    return <div>Here is a second paragraph</div>
  }
  return <div></div>
}

export default function MainPageTemplate({ data }) {
  return (
    <WebsiteLayout>
      <div>
        <h1>MainPage</h1>
        <div>{data.mongodbGqlApi.layout.title}</div>
        <div>{data.mongodbGqlApi.layout.description}</div>
        <SecondDescription
          isSecondDescription={data.mongodbGqlApi.layout.isSecondDescription}
        />
        <br />
        <Link to="/">Go to Home Page</Link>
      </div>
    </WebsiteLayout>
  )
}

export const query = graphql`
  query($_websiteId: String!) {
    mongodbGqlApi {
      layout(query: { websiteId: $_websiteId }) {
        title
        description
        isSecondDescription
      }
    }
  }
`
