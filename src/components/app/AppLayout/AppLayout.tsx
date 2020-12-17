/**
 * AppLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { Fragment } from "react"
import PropTypes from "prop-types"
import AppNavBar from "../AppNavBar/AppNavBar"
import { Container, Typography } from "@material-ui/core"

interface AppLayoutProps {
  children: JSX.Element[] | JSX.Element
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <Fragment>
      <AppNavBar />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "200vh" }}
        >
          {props.children}
        </Typography>
      </Container>
    </Fragment>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
