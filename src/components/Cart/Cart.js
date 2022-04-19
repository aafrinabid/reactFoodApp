import { useContext } from 'react';
import CartContext from '../../assets/store/Cart-Context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
   const CartCtx=useContext(CartContext);
   const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
  const hasItems=CartCtx.items.length>0
  

  const cartItemRemoveHandler=id=>{
   CartCtx.removeItem(id)   
  }
  const cartItemHandler=item=>{
      CartCtx.addItem({...item,amount:1});
  };
    const cartItems = (
    <ul className={classes['cart-items']}>
      {CartCtx.items.map((item) => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemHandler.bind(null,item)}/>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClick}>Close</button>
       {hasItems&& <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;