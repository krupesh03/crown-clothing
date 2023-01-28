import React from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux';
import { setToggleCart } from '../../redux/cart/cart.actions';
import { selectCartItemCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({setToggleCart, itemCount}) => (
    <div className='cart-icon' onClick={setToggleCart}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    setToggleCart : () => dispatch(setToggleCart()) //used reducer over here
})

const mapStateToProps = (state) => ({
    itemCount: selectCartItemCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);