import React from "react"
import { Box, CircularProgress, Typography } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    height: `100%`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  },
})

interface IErrorPageProps {}

// TODO add link to contact us.
const ErrorPage: React.FunctionComponent<IErrorPageProps> = ({}: IErrorPageProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h2" gutterBottom>
          Something broke :/
        </Typography>
        <Typography variant="h4" gutterBottom>
          Logout and try again.
        </Typography>
        <Typography variant="h4" gutterBottom>
          If the error persists, contact us.
        </Typography>
      </Box>
    </Box>
  )
}

export default ErrorPage
