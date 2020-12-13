import React from "react"
import Link from "../components/Link"
import Layout from "../components/Layout"

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
    <Layout>
      <div>
        <h1>MainPage</h1>
        <div>{data.mongodbGqlApi.layout.layout.title}</div>
        <div>{data.mongodbGqlApi.layout.layout.description}</div>
        <SecondDescription
          isSecondDescription={
            data.mongodbGqlApi.layout.layout.isSecondDescription
          }
        />
        <br />
        <Link to="/">Go to Home Page</Link>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($_websiteId: Int!) {
    mongodbGqlApi {
      layout(query: { websiteId: $_websiteId }) {
        layout {
          title
          description
          isSecondDescription
        }
      }
    }
  }
`
