import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { setToggleCart } from '../../redux/cart/cart.actions';

const CartDropdown = ({cartItems, dispatch}) => {
    const navigate = useNavigate();
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                { cartItems.length ?
                    cartItems.map( cartItem => (<CartItem key={cartItem.id} item={cartItem} />))
                    :
                    <span className='empty-message'>Your cart is empty</span>
                }
            </div>
            <CustomButton onClick={ () => {
                navigate('/checkout'); // this is for route
                dispatch(setToggleCart()) // this is for hiding the cart dropdown once checkout page is open
                //setToggleCart() this is used when mapDispatchToProps is used
                } 
            }>GO TO CHECKOUT
            </CustomButton>
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     cartItems: selectCartItems(state)
// })
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

// const mapDispatchToProps = (dispatch) => ({
//     setToggleCart: () => dispatch(setToggleCart())
// })

export default connect(mapStateToProps)(CartDropdown);