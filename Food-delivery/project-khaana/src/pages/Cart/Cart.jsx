import React, { useContext } from 'react'
import './Cart.css'

import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';    

const Cart = () => {
  const{cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);
  const navigate=useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>items</p>
          <p>title</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
          <p>remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0)
          {
            return(
              <div>
              <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt=""/>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price*cartItems[item._id]}</p>
                <button className='cross' onClick={()=>removeFromCart(item._id)}>X</button>
              </div>
          <hr/>
          </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
              </div>
          <button onClick={()=>navigate('/order')}>Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code then enter it here</p>
            <div className="cart-promocode-input">
            <input type='text' placeholder='promo code'/>
            <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
