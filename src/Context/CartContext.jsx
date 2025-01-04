import axios from 'axios';
import  { createContext } from 'react'

export let CartContext = createContext();

export default function CartContextProvider(props){

    let headers = {
        token: localStorage.getItem("userToken")
    }
    function addToCart(productId){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:productId
        }, {
            headers : headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function getCartItmes(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers : headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function removeCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers : headers
        })
        .then((res) => res)
        .catch((err) => err)
    }
    function updateCartItem(productId, count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count: count
        },{
            headers : headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    return <CartContext.Provider value={{addToCart, getCartItmes, removeCartItem ,updateCartItem}}>
        {props.children}
    </CartContext.Provider>
}