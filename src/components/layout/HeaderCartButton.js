import React, { useContext ,useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import CartContext from '../../assets/store/Cart-Context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
function HeaderCartButton(props) {
    const [btnIsHighlighted,setBtnIsHighlighted]=useState(false)
    const CartCtx=useContext(CartContext);
    const items=useSelector(state=>state.cart.items)
    const numberOfCartItems=items.reduce((crntNUM,item)=>{
        return crntNUM+item.amount;
    },0);
    
const btnClasses=`${classes.button} ${btnIsHighlighted? classes.bump:''}`;
useEffect(()=>{
if(items.length===0){
    return;

}
setBtnIsHighlighted(true);
const timer=setTimeout(()=>{
    setBtnIsHighlighted(false);
},300);

return()=>{
    clearTimeout(timer);
}

},[items])


  return (
    <button className={btnClasses} onClick={props.onClick}>
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