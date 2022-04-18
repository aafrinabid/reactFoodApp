import React, { useContext } from 'react'
import CartContext from '../../assets/store/Cart-Context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
function HeaderCartButton(props) {
    const CartCtx=useContext(CartContext);
    const numberOfCartItems=CartCtx.items.reduce((crntNUM,item)=>{
        return crntNUM+item.amount;
    },0)
  return (
    <button className={classes.button} onClick={props.onClick}>
<span className={classes.icon}>
    <CartIcon />
    </span>
<span>
Your Cart
</span>
<span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton