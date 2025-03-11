import React from "react";
import Button from "./Button";
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <nav className='navbar container  pt-3 pb-3'>
                < Link className='navbar-brand text-light' to="/">MERCADO FINANCEIRO</ Link>

                <div>
                
                    <Link text='login' className='btn btn-info' to="/login">Login</Link>
                    &nbsp;
                    <Link text='register' className='btn btn-info' to="/register">Cadastro</Link>
                    
                </div>
            </nav>     
        </>
    )
}

export default Header