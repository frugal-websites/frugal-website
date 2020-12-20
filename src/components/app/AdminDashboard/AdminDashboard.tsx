import React, { useState, useEffect } from "react"
// import { useQuery } from '@apollo/react-hooks';
import { gql, useQuery } from "@apollo/client"
import { RouteComponentProps } from "@reach/router"
import AppLayout from "../AppLayout/AppLayout"

interface IAdminDashboardProps extends RouteComponentProps {}

// const GET_ALL_PRODUCTS = gql`
//   query($_websiteEmailId: Int!) {
//     mongodbGqlApi {
//       layout(query: { websiteEmailId: $_websiteEmailId }) {
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
    layout {
      title
      description
      isSecondDescription
    }
  }
`

const AdminDashboard: React.FunctionComponent<IAdminDashboardProps> = ({}: IAdminDashboardProps) => {
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
    <AppLayout>
      <h2>Congrats you are an Admin.</h2>
    </AppLayout>
  )
}
export default AdminDashboard
