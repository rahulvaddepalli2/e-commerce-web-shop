import React from 'react'
import './Navbar.css'
import { MenuItems } from "./MenuItems"
import { useState } from 'react'
import { Button } from "../Button/Button"
import { IconButton, Badge } from "@material-ui/core"
import { ShoppingCart } from "@material-ui/icons"
import { Link, useLocation } from "react-router-dom"

const Navbar = ( { totalItems } ) => {
    const[toggleMenu, setToggleMenu] = useState(false)
    const handleClick = () => setToggleMenu(!toggleMenu)
    const location = useLocation()

 
        return (
            <nav className="NavbarItems">
                <a href="/">
                    <h1 className="navbar-logo">Archetype <i class="fas fa-music"></i></h1>
                </a>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={toggleMenu ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={toggleMenu ? "nav-menu active" : "nav-menu"}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}> {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                {location.pathname === '/' && (
                <div className="navbar-left">
                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div> )}
                    <Button>Sign In</Button>
            </nav>
        )
}

export default Navbar
