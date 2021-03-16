import * as React from 'react';
import classes from './frontdropOverlay.module.css';

const frontdropOverlay = (props) => {
  return (
    <div className={classes.frontdropOverlay}>
      {props.children}
    </div>
  )
}

export default frontdropOverlay;