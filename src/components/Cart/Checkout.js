import {useRef,useState} from 'react'
import classes from './Checkout.module.css';

     const isEmpty=value=>value.trim()!=='';
     const isFiveChars=value=>value.trim().length===5

const Checkout=(props)=>{
  const [formInputIsValid,setFormInputIsValid]=useState({
      name:true,
      street:true,
      city:true,
      postalCode:true,
  })
    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalCodeInputRef=useRef();
    const cityInputRef=useRef();
   const confirmHandler=(event)=>{
       event.preventDefault();
       const enteredName=nameInputRef.current.value;
       const enteredStreet=streetInputRef.current.value;
       const enteredPostalCode=postalCodeInputRef.current.value;
       const enteredCity=cityInputRef.current.value;

       const enteredNameIsValid=isEmpty(enteredName)
       const enteredStreetIsValid=isEmpty(enteredStreet)
       const enteredCityIsValid=isEmpty(enteredCity)
       const enteredPosatalCodeIsValid=isFiveChars(enteredPostalCode)



       setFormInputIsValid({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        city:enteredCityIsValid,
        postalCode:enteredPosatalCodeIsValid,
       })

const formIsValid=
enteredNameIsValid&&
enteredStreetIsValid&&
enteredCityIsValid&&
enteredPosatalCodeIsValid;


if(!formIsValid){
    return
}

props.onSubmit({
    name:enteredName,
    street:enteredStreet,
    city:enteredCity,
    postalCode:enteredPostalCode,
})


   };
   const nameControlClasses=`${classes.control} ${formInputIsValid.name?'':classes.invalid}`;
   const streetControlClasses=`${classes.control} ${formInputIsValid.street?'':classes.invalid}`;
   const postalCodeControlClasses=`${classes.control} ${formInputIsValid.postalCode?'':classes.invalid}`;
   const cityControlClasses=`${classes.control} ${formInputIsValid.city?'':classes.invalid}`;

    return(
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef} />
          {!formInputIsValid.name&&<p>please fill the name</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef}/>
          {!formInputIsValid.street&&<p>please fill the street</p>}

        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalCodeInputRef}/>
          {!formInputIsValid.postalCode&&<p>please fill the postal Code</p>}

        </div>
        <div className={cityControlClasses}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef}/>
          {!formInputIsValid.city&&<p>please fill the name of the city</p>}

        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
};

export default Checkout;