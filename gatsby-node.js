/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 *
 * TODO move to .ts file (https://www.extensive.one/converting-gatsby-config-and-node-api-to-typescript/)
 */

const path = require(`path`)

// You can delete this file if you're not using it

// exports.onCreateNode = ({ node, getNode, actions }) => {
// }

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions

  createPage({
    path: `mainPage`,
    component: path.resolve(`./src/templates/MainPage.tsx`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      _websiteEmailId: process.env.GATSBY_WEBSITE_ID,
    },
  })
}
