import React,{useContext} from 'react';
import CartContext from '../../../assets/store/Cart-Context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
function MealItem(props) {
   
   const CartCtx=useContext(CartContext);
    const price=`$${props.price.toFixed(2)}`;
    const addToCartHandler=amount=>{
        CartCtx.addItem({
     id: props.id,
     name:props.name,
     amount:amount,
     price:props.price,
    })

    };
  return (
    <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler} />
        </div>
    </li>
  )
}

export default MealItem