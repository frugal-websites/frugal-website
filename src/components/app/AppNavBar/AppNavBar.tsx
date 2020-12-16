import React, { useState, useEffect } from "react"
import { WebsiteIdContext } from "../WebsiteIdProvider/WebsiteIdProvider"
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
import Link from "../../common/Link"

import { Home } from "@material-ui/icons"
import SideDrawer from "../SideDrawer/SideDrawer"

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    color: `white`,
  },
})

export interface INavLinkValue {
  name: string
  path: string
}

const navLinks: INavLinkValue[] = [
  { name: `Profile`, path: `/app/profile` },
  { name: `Fr`, path: `/app/fr` },
  { name: `En`, path: `/app/en` },
]

interface IAppNavBarProps {}

const AppNavBar: React.FunctionComponent<IAppNavBarProps> = ({}: IAppNavBarProps) => {
  const classes = useStyles()

  return (
    <WebsiteIdContext.Consumer>
      {websiteId => (
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth="md" className={classes.navbarDisplayFlex}>
              <IconButton edge="start" color="inherit" aria-label="home">
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
              </Hidden>
              <Hidden mdUp>
                <SideDrawer navLinks={navLinks} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      )}
    </WebsiteIdContext.Consumer>
  )
}

export default AppNavBar
