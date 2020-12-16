import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Menu } from "@material-ui/icons"
import React, { useState, Fragment } from "react"
import { INavLinkValue } from "../AppNavBar/AppNavBar"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  linkText: {
    textDecoration: `none`,
    color: `black`,
  },
})

interface ISideDrawerProps {
  navLinks: INavLinkValue[]
}

const SideDrawer: React.FunctionComponent<ISideDrawerProps> = ({
  navLinks,
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

  const sideDrawerList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List component="nav">
        {navLinks.map(({ name, path }) => (
          <a href={path} key={name} className={classes.linkText}>
            <ListItem button>
              <ListItemText primary={name} />
            </ListItem>
          </a>
        ))}
      </List>
    </div>
  )

  return (
    <Fragment>
      <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
        <Menu fontSize="large" style={{ color: `white` }} />
      </IconButton>

      <Drawer anchor="right" open={state.isOpen} onClose={toggleDrawer(false)}>
        {sideDrawerList()}
      </Drawer>
    </Fragment>
  )
}

export default SideDrawer
