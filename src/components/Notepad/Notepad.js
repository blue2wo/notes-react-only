import * as React from 'react';
import classes from './Notepad.module.css';
import Auxillery from '../../hoc/Auxillery';
import Button from '../Button/Button';
import Fixed from '../Fixed/Fixed';


const Notepad = (props) => {
  return (
    <Auxillery>
       <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
          <textarea
            className={classes.textarea}
            type="text"
            placeholder="Your note"
            onChange={props.handleOnUserInput}
            value={props.userInput}/>
          <Button 
            backgroundColor={'#ebebeb'} 
            backgroundColorHover={'#0f9d58'} 
            brBL={'10'} 
            brBR={'10'}
            >
              {props.notepadMode.toUpperCase()}
          </Button>
       </div>
  </Auxillery>
  )
}

export default Notepad;