import React from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux';
import { setToggleCart } from '../../redux/cart/cart.actions';

const CartIcon = ({setToggleCart}) => (
    <div className='cart-icon' onClick={setToggleCart}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>0</span>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    setToggleCart : () => dispatch(setToggleCart()) //used reducer over here
})

export default connect(null, mapDispatchToProps)(CartIcon);