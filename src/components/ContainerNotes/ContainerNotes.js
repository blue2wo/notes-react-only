import * as React from 'react';
import classes from './ContainerNotes.module.css';

import FrontdropOverlay from '../frontdropOverlay/frontdropOverlay';

const ContainerNotes = (props) => {
  return (
    <FrontdropOverlay>
      <div className={classes.containerNotes}>
            {props.children}
      </div>
    </FrontdropOverlay>
  )
}

export default ContainerNotes;