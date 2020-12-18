/**
 * AppLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { Fragment } from "react"
import PropTypes from "prop-types"
import NavBar, { INavLinkValue } from "../../common/NavBar/NavBar"
import { Container, Typography } from "@material-ui/core"

const navLinks: INavLinkValue[] = [
  { name: `Dashboard`, path: `/app` },
  { name: `Profile`, path: `/app/profile` },
  { name: `Fr`, path: `/app/fr` },
  { name: `En`, path: `/app/en` },
]

interface AppLayoutProps {
  children: JSX.Element[] | JSX.Element
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <Fragment>
      <NavBar navLinks={navLinks} />
      <Container>{props.children}</Container>
    </Fragment>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
