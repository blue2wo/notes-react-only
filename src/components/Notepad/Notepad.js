import * as React from 'react';
import classes from './Notepad.module.css';
import Aux from '../../hoc/Aux';
import Button from '../Button/Button';
import Container from '../Container/Container';


const Notepad = (props) => {
  return (
    <Aux>
      <Container>
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
        {/* <Button 
          backgroundColor={'#ebebeb'} 
          backgroundColorHover={'#0f9d58'} 
          brBL={'10'} 
          brBR={'10'}>
            Edit
        </Button> */}
        <p>{props.note}</p>
      </Container>
  </Aux>
  )
}

export default Notepad;