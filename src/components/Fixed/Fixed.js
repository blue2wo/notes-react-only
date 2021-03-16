import * as React from 'react';
import classes from './Fixed.module.css';

const Fixed = (props) => {
  return (
    <div className={classes.fixed}>
      {props.children}
    </div>
  )
}

export default Fixed;