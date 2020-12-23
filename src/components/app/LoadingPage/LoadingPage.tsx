import React from "react"
import { Box, CircularProgress } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    height: `100%`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  },
})

interface ILoadingPageProps {}

const LoadingPage: React.FunctionComponent<ILoadingPageProps> = ({}: ILoadingPageProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <CircularProgress />
    </Box>
  )
}

export default LoadingPage
