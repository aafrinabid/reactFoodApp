import React, { useState,useEffect } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

function AvailableMeals() {
  const [meals,setMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState(null)

  useEffect(()=>{
  const fetchmeals=async()=>{
    setIsLoading(true)
    const response=await fetch('https://react-http-b5dbb-default-rtdb.firebaseio.com/meals.json')
    const data=await response.json();
    const loadedMeals=[];

    for(const key in data){
      loadedMeals.push({
         id:key,
         name:data[key].name,
         description:[key].description,
         price:data[key].price,  

      });
    }
setMeals(loadedMeals)
setIsLoading(false); 

  };

    fetchmeals().catch((error)=>{
      setIsLoading(false);
      setHttpError(error.message)
    });

},[]);
   
   if(httpError){
     return(
     <section className={classes.MealsError}>
       <p>{httpError}</p>
     </section>

     )
   }

    const mealsList=meals.map(meal=>(
<MealItem 
key={meal.id}
id={meal.id}
name={meal.name}
description={meal.description}
price={meal.price}
/>
     ));
  return (
    <section className={classes.meals}>
        <Card>
        <ul>
          
          {isLoading &&<section className="isloading">loading...</section>}
      {!isLoading && mealsList}
        </ul>
        </Card>
    </section>
  )
}

export default AvailableMeals