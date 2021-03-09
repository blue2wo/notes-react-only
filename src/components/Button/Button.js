import * as React from 'react';
import styled from 'styled-components';


const ButtonStyled = styled.button`
  background-color: ${(props) => props.backgroundColor};
  border: none;
  /* border-radius: 0 0 10px 10px;  */
  border-top-left-radius: ${(props) => props.brTL}px;
  border-top-right-radius: ${(props) => props.brTR}px;
  border-bottom-right-radius: ${(props) => props.brBR}px;
  border-bottom-left-radius: ${(props) => props.brBL}px;
  color: black;
  font-family: var(--font-family-windows);
  font-size: 1rem;
  padding: 0.5rem 1rem;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.backgroundColorHover};
    cursor: pointer;
  }
`

const Button = (props) => {
  return (
    <ButtonStyled 
      brTL={props.brTL}
      brTR={props.brTR}
      brBR={props.brBR}
      brBL={props.brBL}
      backgroundColor={props.backgroundColor}
      backgroundColorHover={props.backgroundColorHover}
      onClick={props.onClick}>
        {props.children}
    </ButtonStyled>
  //  <button className={classes.btn}>{props.children}</button>
  )
}

export default Button;