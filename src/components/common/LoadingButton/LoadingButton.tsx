import React from "react"
import { Box, Button, CircularProgress } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import clsx from "clsx"
import { green } from "@material-ui/core/colors"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submitBox: {
      position: `relative`,
      display: `inline-block`,
    },
    submitSuccess: {
      display: `inline-block`,
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
    submitProgress: {
      display: `inline-block`,
      color: green[500],
      position: `absolute`,
      top: `50%`,
      left: `50%`,
      marginTop: -12,
      marginLeft: -12,
    },
  })
)

interface ILoadingButtonProps {
  displayName: string
  isLoading?: boolean
  isError?: boolean
}

const LoadingButton: React.FunctionComponent<ILoadingButtonProps> = (
  props: ILoadingButtonProps
) => {
  const classes = useStyles()

  const submitClassname = clsx({
    [classes.submitSuccess]: !props.isError,
  })

  return (
    <Box className={classes.submitBox}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={submitClassname}
        disabled={props.isLoading}
      >
        {props.displayName}
      </Button>
      {props.isLoading && (
        <CircularProgress size={24} className={classes.submitProgress} />
      )}
    </Box>
  )
}

export default LoadingButton
