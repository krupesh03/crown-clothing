import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { GooglesignOut } from '../../firebase/firebase.utils';
//import { auth } from '../../firebase/firebase-old-version.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

function Header({ currentUser, hidden }) {

    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/">
                    CONTACT
                </Link>
                {
                    currentUser ? 
                        ( <div className="option" onClick={ GooglesignOut }> SIGN OUT</div> )
                        // ( <div className="option" onClick={ auth.signOut() }> SIGN OUT</div> )
                    : ( <Link className="option" to="/signin"> SIGN IN</Link> )
                }
                <CartIcon />
            </div>
            { 
                hidden ? null : 
                <CartDropdown />
            }
        </div>
    );
}

// const mapStateToProps = ({ user : {currentUser}, cart: {hidden} }) => ({
//     //currentUser: state.user.currentUser //used reducer over here
//     currentUser, //used reducer over here
//     hidden
// })

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);