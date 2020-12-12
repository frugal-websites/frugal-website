import Layout from "./Layout"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import React, { useState, useEffect } from "react"
import fetch from "node-fetch"
// import { useQuery } from '@apollo/react-hooks';
import { gql, useQuery } from "@apollo/client"

type AdminDashboardProps = {}

// const GET_ALL_PRODUCTS = gql`
//   query($_websiteId: Int!) {
//     mongodbGqlApi {
//       layout_a(query: { websiteId: $_websiteId }) {
//         layout {
//           title
//           description
//           isSecondDescription
//         }
//       }
//     }
//   }
// `

const GET_ALL_PRODUCTS = gql`
  query GetLayout {
    layout_a {
      layout {
        title
        description
        isSecondDescription
      }
    }
  }
`

const AdminDashboard = ({}: AdminDashboardProps) => {
  const [starsCount, setStarsCount] = useState(0)
  // useEffect(() => {
  // get data from ...
  const queryParams = {
    category: 1232132,
  }
  // const { title, description, isSecondDescription }
  // let temp = useQuery(GET_ALL_PRODUCTS, {
  //   variables: queryParams,
  // })

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS)

  console.log(loading)
  console.log(error)
  console.log(data)
  // setStarsCount(resultData.stargazers_count)
  // }, [])

  return (
    <Layout>
      <div>
        <div style={{ maxWidth: `200px`, margin: `1.4rem`, float: `right` }}>
          <AmplifySignOut />
        </div>
        <h2>Congrats you are an Admin.</h2>
      </div>
    </Layout>
  )
}
export default AdminDashboard
