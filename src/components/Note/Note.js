import * as React from 'react';
import classes from './Note.module.css';

import Auxillery from '../../hoc/Auxillery';
import Button from '../Button/Button';


const Note = (props) => {
  return (
    <Auxillery>
      <div className={classes.note}>{props.children}</div>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
        <Button 
          backgroundColor={'#ebebeb'} 
          backgroundColorHover={'#0f9d58'} 
          brBL={'10'}
          onClick={(event) => props.editNote(event, props.dataValue)}
          data-value={props.dataValue}>
            Edit
        </Button>
        <Button
          backgroundColor={'#ebebeb'} 
          backgroundColorHover={'#ed2815'} 
          brBR={'10'} 
          onClick={(event) => props.deleteNote(event, props.dataValue)}
          data-value={props.dataValue}> 
            Delete
        </Button>
      </div>
    </Auxillery>
    
  )
}

export default Note;