import React, { useState, useEffect } from "react"
import { WebsiteEmailIdContext } from "../../app/WebsiteEmailIdProvider/WebsiteEmailIdProvider"
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
  withStyles,
  isWidthUp,
  withWidth,
  MenuItem,
  Button,
  Container,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Link from "../Link"

import { Home } from "@material-ui/icons"
import SideDrawer from "../SideDrawer/SideDrawer"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { navigate } from "gatsby"

export interface INavLinkValue {
  name: string
  path: string
}

const useStyles = makeStyles({
  root: {
    display: `flex`,
    justifyContent: `space-between`,
    width: `100%`,
    alignItems: `center`,
    // margin: `0 0.5em`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    color: `white`,
  },
  signOutBox: {
    margin: `0.5em 1em`,
  },
  signUpBox: {
    margin: `0.5em 1em`,
  },
})

interface INavBarProps {
  navLinks: INavLinkValue[]
}

const NavBar: React.FunctionComponent<INavBarProps> = ({ navLinks }) => {
  const classes = useStyles()

  const getLogStatusButton = (websiteEmailId: string) => {
    return websiteEmailId === "" ? (
      <Box className={classes.signUpBox}>
        <Button
          variant="outlined"
          onClick={() => {
            console.log("websiteEmailId", websiteEmailId)
            navigate("/app")
          }}
          color="secondary"
        >
          Sign In
        </Button>
      </Box>
    ) : (
      <Box className={classes.signOutBox}>
        <AmplifySignOut />
      </Box>
    )
  }

  return (
    <WebsiteEmailIdContext.Consumer>
      {websiteEmailId => (
        <AppBar position="static" style={{ background: "#2E3B55" }}>
          {/* maxWidth="md"  */}
          <Box className={classes.root}>
            <IconButton
              color="inherit"
              aria-label="home"
              onClick={() => {
                console.log(websiteEmailId)
              }}
            >
              <Home fontSize="large" />
            </IconButton>
            <Hidden smDown>
              <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex}
              >
                {navLinks.map(({ name, path }) => (
                  <a href={path} key={name} className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary={name} />
                    </ListItem>
                  </a>
                ))}
              </List>
              {getLogStatusButton(websiteEmailId)}
            </Hidden>
            <Hidden mdUp>
              <SideDrawer navLinks={navLinks} websiteEmailId={websiteEmailId} />
            </Hidden>
          </Box>
        </AppBar>
      )}
    </WebsiteEmailIdContext.Consumer>
  )
}

export default NavBar
