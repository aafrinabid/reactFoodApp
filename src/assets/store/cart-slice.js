import { createSlice } from "@reduxjs/toolkit";
const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalAmount:0,
    },
    reducers:{
       addToCart(state,action){
          const updatedTotalAmount=state.totalAmount+action.payload.price*action.payload.amount
        const existingItemIndex=state.items.findIndex((item)=>item.id===action.payload.id);
        const existingItem=state.items[existingItemIndex];
        let updatedItems;
        if(existingItem){
            const {price}={...existingItem};
            const myItems={...existingItem}
            const updatedItem={
                ...existingItem,
                amount:existingItem.amount+action.payload.amount
            }
             updatedItems=[...state.items]
             updatedItems[existingItemIndex]=updatedItem
        }else{



             updatedItems=state.items.concat(action.payload);

        }
        state.items=updatedItems;
        state.totalAmount=updatedTotalAmount;
        
            // items:updatedItems,
            // totalAmount:updatedTotalAmount
  
       
    },
    removeCart(state,action){
        console.log(state.items)
        const existingItemIndex=state.items.findIndex((item)=>item.id===action.payload);
        // if(existingItemIndex<=0){
            const existingItem=state.items[existingItemIndex];
            // console.log(existingItem);
                // const {price,amount}={...existingItem};
                const updatedTotalAmount=state.totalAmount-existingItem.price;
                let updatedItems
                if(existingItem.amount===1){
        updatedItems=state.items.filter(item=>item.id!==action.payload)
                }else{
                    const updatedItem={
                        ...existingItem,
                        amount:existingItem.amount-1
                    }
                    updatedItems=[...state.items];
                    updatedItems[existingItemIndex]=updatedItem
                }
            
            
            
            state.items=updatedItems;
            state.totalAmount=updatedTotalAmount;
                // items:updatedItems,
                // totalAmount:updatedTotalAmount
            // }
            

        },
        onSubmit(state,action){
            console.log('submitting');
            state.items=[];
            state.totalAmount=0;
        }
        
    }

}
)

export const CartAction=cartSlice.actions;
export default cartSlice.reducer;