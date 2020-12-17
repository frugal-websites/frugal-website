import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@material-ui/core"
import { makeStyles, fade } from "@material-ui/core/styles"
import { Menu, Close, Home } from "@material-ui/icons"
import React, { useState, Fragment } from "react"
import { INavLinkValue } from "../AppNavBar/AppNavBar"

// https://www.color-hex.com/color-palette/17154

const goldYellow: string = "#ffc900"
const gold: string = "#d5ad18"
const lightGray: string = "#eaeaea"
const gray: string = "#cccccc"
const darkGray: string = "#acacac"

const fadeValue: number = 1

const useStyles = makeStyles({
  root: {
    // backgroundColor: `black`,
    backgroundColor: fade(darkGray, fadeValue),
    minHeight: `100vh`,
    display: `flex`,
    flexDirection: `column`,
    overflow: `auto`,
  },
  drawerPaper: {
    // backgroundColor: `blue`,
    width: `100%`,
  },
  navBar: {
    // backgroundColor: `turquoise`,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    margin: `0.5em`,
  },
  navBarEmail: {
    color: goldYellow,
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    whiteSpace: `nowrap`,
  },
  listBox: {
    // backgroundColor: `red`,
    backgroundColor: fade(lightGray, fadeValue),
    flex: 2,
  },
  list: {
    // backgroundColor: `green`,
    height: `100%`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-evenly`,
  },
  listItemBox: {
    // backgroundColor: `purple`,
    width: `100%`,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `center`,
  },
  listItemLink: {
    // backgroundColor: `yellow`,
    color: `black`,
    width: `50%`,
  },
  listItemText: {
    color: `black`,
    display: `flex`,
    justifyContent: `center`,
    overflow: `hidden`,
  },
})

interface ISideDrawerProps {
  navLinks: INavLinkValue[]
  websiteId: string
}

const SideDrawer: React.FunctionComponent<ISideDrawerProps> = ({
  navLinks,
  websiteId,
}) => {
  const classes = useStyles()
  const [state, setState] = useState({ isOpen: false })

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }

    setState({ isOpen: open })
  }

  const navBar = (websiteId: string) => (
    <Box className={classes.navBar}>
      {/* TODO review aria-label */}
      <IconButton color="inherit" aria-label="home">
        <Home fontSize="large" style={{ color: goldYellow }} />
      </IconButton>
      <Typography variant="subtitle1" className={classes.navBarEmail}>
        {websiteId}
      </Typography>
      <IconButton aria-label="menu" onClick={toggleDrawer(false)}>
        <Close fontSize="large" style={{ color: goldYellow }} />
      </IconButton>
    </Box>
  )

  const list = () => (
    <Box
      className={classes.listBox}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List component="nav" className={classes.list}>
        {navLinks.map(({ name, path }) => (
          <Box className={classes.listItemBox}>
            <a href={path} key={name} className={classes.listItemLink}>
              <ListItem button>
                <ListItemText primary={name} className={classes.listItemText} />
              </ListItem>
            </a>
          </Box>
        ))}
      </List>
    </Box>
  )

  return (
    <Fragment>
      <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
        <Menu fontSize="large" style={{ color: `white` }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={state.isOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
      >
        <Box className={classes.root}>
          {navBar(websiteId)}
          {list()}
        </Box>
      </Drawer>
    </Fragment>
  )
}

export default SideDrawer
