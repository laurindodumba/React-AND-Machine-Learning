import React from "react";
import { Link } from 'react-router-dom'


const Button = () => {
    return (
        <>
        
        {/* <a className='btn btn-outline-info' href="#">Login</a> */}
        <Link text='Login' className='btn btn-info' to="/login">Login</Link>
        
        </>
    )
}

export default Button