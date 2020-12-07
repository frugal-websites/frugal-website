/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "./src/styles/global.css"

import Amplify from "aws-amplify"
import config from "./src/aws-exports"
Amplify.configure(config)
