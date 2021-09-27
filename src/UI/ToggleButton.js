import React from "react";
import classes from './ToggleButton.module.css'

const ToggleButton = (props) => {
  return (
    <div className={classes.toggle} >
        <span className={classes.title}>Sort {props.isAsc?'Descending':'Ascending'}</span>
      <label className={classes.switch} >
        <input type="checkbox" onClick={props.onClick}/>
        <span className={classes.slider}> </span>
      </label> 

      <label className={classes.switch}>
        <input type="checkbox" />
        <span className={classes['slider round']}></span>
      </label>
    </div>
  );
};

export default ToggleButton;
