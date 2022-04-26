import React, { useContext,useState } from 'react';
import CartContext from '../../assets/store/Cart-Context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) => {
  const [isOrdered,setIsOrdered]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [didSubmit,setDidSubmit]=useState(false);
   const CartCtx=useContext(CartContext);
   const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
  const hasItems=CartCtx.items.length>0
  

  const cartItemRemoveHandler=id=>{
   CartCtx.removeItem(id)   
  }
  const cartItemHandler=item=>{
      CartCtx.addItem({...item,amount:1});
  };

  const submitOrderHandler=async(userData)=>{
    setIsSubmitting(true);
    await fetch('https://react-http-b5dbb-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        oredredItems:CartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true)

  }
    const cartItems = (
    <ul className={classes['cart-items']}>
      {CartCtx.items.map((item) => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemHandler.bind(null,item)}/>
      ))}
    </ul>
  );
  const orderhandler=()=>{
    setIsOrdered(true)
  }

  const modalActions=      <div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClick}>Close</button>
 {hasItems&& <button className={classes.button} onClick={orderhandler}>Order</button>}
</div>

const cartModalContent=(
<React.Fragment>
{cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
     
     {isOrdered && <Checkout onCancel={props.onClick} onSubmit={submitOrderHandler}/>} 
     {!isOrdered && modalActions}

</React.Fragment>
);

const isSubmittingModalContent=<p>sending</p>
const didSubmitting=<p>submitted the order</p>

  return (
    <Modal onClick={props.onClick}>
      {!isSubmitting && !didSubmit &&cartModalContent}
      {isSubmitting&&isSubmittingModalContent}
      {!isSubmitting&&didSubmit&&didSubmitting}
    </Modal>
  );
};

export default Cart;