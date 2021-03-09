import * as React from 'react';
import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <div className={classes.root}>{props.children}</div>
  )
}

export default Layout;