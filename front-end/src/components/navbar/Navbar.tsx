import React, { useState } from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import Cart from '../cart/Cart';
import { useTypedSelector, useTypedDispatch } from '../../Redux/Hooks'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../Redux/userSlice';


const Navbar : React.FC = () => {

    const [cartOpen, setCartOpen] = useState(false);
    const user = useTypedSelector(state => state.userSlice.user)
    const cart = useTypedSelector(state => state.cartSlice.cart)
    const dispatch = useTypedDispatch()

    const handleLogout = () => {
        dispatch(logoutUser())
    }

return (
<div className='navbar-container'>
    <div className='navbar-wrapper'>

        <div className='navbar-left'>
            <div className='navbar-language'>EN</div>
            <div className='navbar-search'>
                <input 
                className='navbar-search-input'
                placeholder="Search.." 
                />
                <SearchIcon style={{ color: "white", fontSize: 20 }} />
            </div>
        </div>

        <div className='navbar-center'>
            <div className='logo'>e-commerce</div>
        </div>

        <div className='navbar-right-item'>
            {!user 
                ?
                <div  className='navbar-right'>
                    <Link to="/register">
                        <div className='navbar-right-item signup'>Sign Up</div>
                    </Link>
                    <Link to="login">
                        <div className='navbar-right-item signin'>Sign In</div>
                    </Link>
                </div>
                :
                <div  className='navbar-right'>
                    <div className='navbar-right-item signout' onClick={handleLogout}>Sign Out</div>
                    <div className='navbar-right-item'>
                        <Drawer open={cartOpen} onClose={() => setCartOpen(false)}>
                            <Cart/>
                        </Drawer>
                        <Badge badgeContent={cart?.quantity} color="error" onClick={() => setCartOpen(true)}>
                            <ShoppingCartIcon/>
                        </Badge>
                    </div>
                </div>
            }
        </div>
        
    </div>
</div>
)
}

export default Navbar