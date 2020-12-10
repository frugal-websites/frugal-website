import Link from "./Link"
import PropTypes from "prop-types"
import React from "react"

const ListLink = (props: { to: string; children: string }) => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Header = ({ siteTitle = "" }) => (
  <header
    style={{
      background: `white`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0, float: `left` }}>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <ul style={{ listStyle: `none`, float: `right` }}>
        <ListLink to="/app/">Sign In</ListLink>
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
