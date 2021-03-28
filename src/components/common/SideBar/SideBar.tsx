import React, { useState, useEffect } from "react"
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
  CssBaseline,
  Divider,
  SvgIcon,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import { Home } from "@material-ui/icons"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { navigate } from "gatsby"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: `flex`,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      top: `auto`,
    },
    drawerContainer: {
      overflow: `auto`,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
)

export interface ISectionValue {
  name: string
  icon: JSX.Element
}

interface ISideBarProps {
  children: JSX.Element[] | JSX.Element
  sections: ISectionValue[]
  activeSection: string
  onSectionClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    sectionName: string
  ) => void
}

const SideBar: React.FunctionComponent<ISideBarProps> = (
  props: ISideBarProps
) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <CssBaseline />
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box className={classes.drawerContainer}>
          <List>
            {props.sections.map(({ name, icon }) => (
              <ListItem
                button
                key={name}
                selected={props.activeSection == name}
                onClick={event => props.onSectionClick(event, name)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box className={classes.content}>{props.children}</Box>
    </Box>
  )
}

export default SideBar
