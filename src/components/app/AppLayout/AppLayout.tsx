/**
 * AppLayout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import NavBar, { INavLinkValue } from "../../common/NavBar/NavBar"
import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const navLinks: INavLinkValue[] = [
  { name: `Dashboard`, path: `/app` },
  { name: `Edit`, path: `/app/edit` },
  { name: `Profile`, path: `/app/profile` },
]

const useStyles = makeStyles({
  root: {
    height: `100%`,
    display: `flex`,
    flexFlow: `column`,
  },
  content: {
    flex: 1, // To fill remaining space (it works because no flex attribute is set on the NavBar)
  },
})

interface AppLayoutProps {
  children: JSX.Element[] | JSX.Element
}

const AppLayout = (props: AppLayoutProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <NavBar navLinks={navLinks} />
      <Box className={classes.content}>{props.children}</Box>
    </Box>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
