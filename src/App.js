import { Fragment ,useState} from 'react';
import './App.css';
import CartProvider from './assets/store/Cart-Provider';
import Cart from './components/Cart/Cart';
import Header from './components/layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [seen,setSeen]=useState(false)
  let Closehandler=()=>{
    setSeen(!seen)
    console.log('clossssss')
  }
  return (
  <CartProvider>
    {seen && <Cart onClick={Closehandler} />}
      <Header onClick={Closehandler}/>

      <main>
        <Meals />
      </main>
      </CartProvider>
   
  );
}

export default App;
