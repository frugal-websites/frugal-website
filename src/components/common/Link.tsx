import React from "react"
import { Link as MuiLink } from "@material-ui/core"
import { Link as GatsbyLink } from "gatsby"

const Link = React.forwardRef(function Link(props, ref) {
  return <MuiLink component={GatsbyLink} ref={ref} {...props} />
})

export default Link
