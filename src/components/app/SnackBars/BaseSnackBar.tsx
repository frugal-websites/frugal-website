import React, { Fragment, ReactElement, useState } from "react"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import { Alert, AlertTitle, AlertProps } from "@material-ui/lab"
import { makeStyles, Theme } from "@material-ui/core/styles"
import _ from "lodash"
import { Box } from "@material-ui/core"

// *** In parent file ***
export interface ISnackBarState {
  isOpen: boolean
  alertProps: AlertProps | null
  message: React.ReactNode
}

export const initialSnackBarState: ISnackBarState = {
  isOpen: false,
  alertProps: null,
  message: () => <div />,
}

export const newErrorSnackBarState: ISnackBarState = {
  isOpen: true,
  alertProps: {
    severity: "error",
  },
  message: () => <div />,
}
// import BaseSnackBar, {
//     ISnackBarState,
//     initialSnackBarState,
//   } from "../SnackBars/BaseSnackBar"

// const [snackBarState, setSnackBarState] = useState<ISnackBarState>(
//     initialSnackBarState
//   )

// const handleSnackBarOpen = (newSnackBarState: ISnackBarState) => {
//     setSnackBarState(newSnackBarState)
//   }

//   const handleSnackBarClose = (
//     event?: React.SyntheticEvent,
//     reason?: string
//   ) => {
//     if (reason === "clickaway") {
//       return
//     }

//     setSnackBarState({ ...snackBarState, isOpen: false })
//   }

interface IBaseSnackBar {
  snackBarState: ISnackBarState
  handleSnackBarClose: (event?: React.SyntheticEvent, reason?: string) => void
}

interface IProps {
  message: React.ReactNode
  // any other props that come into the component
}

const BaseSnackBar: React.FC<IBaseSnackBar> = (props: IBaseSnackBar) => {
  const classes = useStyles()
  console.log(props.snackBarState.message)
  return (
    <Snackbar
      open={props.snackBarState.isOpen}
      autoHideDuration={6000}
      onClose={props.handleSnackBarClose}
    >
      <Alert
        onClose={props.handleSnackBarClose}
        {...props.snackBarState?.alertProps}
      >
        <AlertTitle>
          <Box fontWeight="fontWeightBold">
            {_.startCase(_.toLower(props.snackBarState.alertProps?.severity))}
          </Box>
        </AlertTitle>
        <div>{props.snackBarState.message}</div>
      </Alert>
    </Snackbar>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  //
}))

export default BaseSnackBar
