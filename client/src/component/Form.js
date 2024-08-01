import React from 'react'
import "../App.css";
import { MdClose } from "react-icons/md";

const Form = ({ handleSubmit, handleOnChange, handleClose, rest }) => { 
  return (
        <div className='addContainer'>
      
        <form action="" onSubmit={handleSubmit}>
        <div className='close-btn' onClick={handleClose}><MdClose />
        </div>
          <label htmlFor="">Name</label>
          <input type="text" 
          name="name" id="name" 
          onChange={handleOnChange} 
          value={rest.name}/> 

          <label htmlFor="">E-mail</label>
          <input type="email" 
          name="email" id="email"
           onChange={handleOnChange}
            value={rest.email}/>

          <label htmlFor="">Phone No.</label>
          <input type="number" 
          name="mobile" id="mobile" 
          onChange={handleOnChange} 
          value={rest.mobile}/>

          <button className='btn'>Submit</button>
          </form> 

      </div>
      )
    } 


export default Form