import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { GooglesignOut } from '../../firebase/firebase.utils';
//import { auth } from '../../firebase/firebase-old-version.utils';
import { connect } from 'react-redux';

function Header({ currentUser }) {

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
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser //used reducer over here
})

export default connect(mapStateToProps)(Header);