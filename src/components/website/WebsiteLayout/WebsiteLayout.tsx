/**
 * WebsiteLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Container } from "@material-ui/core"

import NavBar, { INavLinkValue } from "../../common/NavBar/NavBar"

const navLinks: INavLinkValue[] = [
  { name: `Home`, path: `/` },
  { name: `MainPage`, path: `/mainPage` },
  { name: `Other`, path: `/` },
]

interface LayoutProps {
  children: JSX.Element[] | JSX.Element
}

const WebsiteLayout = (props: LayoutProps) => {
  return (
    <Fragment>
      <NavBar navLinks={navLinks} />

      <Container>{props.children}</Container>
      {/* TODO add footer */}
    </Fragment>
  )
}

WebsiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default WebsiteLayout
