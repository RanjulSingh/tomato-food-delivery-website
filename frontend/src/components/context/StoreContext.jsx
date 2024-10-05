import { createContext,useEffect,useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

const [cartItems,setCartItems] = useState({});
const url="http://localhost:4000"
const [token,setToken] = useState("")
const [food_list, setFoodList] = useState([]);


const addToCart = async (itemId) =>{
    if(!cartItems[itemId]) {
        setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token)
    {
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }//when we will add the item to the cart it will added to the database cartData also
}

const removeFromCart = async (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token)
    {
        await axios.post(url+"/api/cart/remove",{item},{headers:{token}})
    }
}

// Uses the spread operator (...prev) to create a new object with all the existing properties of prev (the current state).
// - Adds a new property with the key itemId and sets its value to 1, indicating the item is now in the cart with a quantity of 1.
// 3. else clause:
// - If the item is already in the cart (i.e., cartItems[itemId] exists).
// 4. setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })):
// - Updates the cartItems state again.
// - Increments the quantity of the item in the cart by 1, using the existing value of prev[itemId] and adding 1 to it.

const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        } else {
          console.error(`Item not found: ${itemId}`);
        }
      }
    }
    return totalAmount;

}

const fetchFoodList = async () =>{
    const response = await axios.get(url+"/api/food/list");//when we will hit this end point we get all the food items
    setFoodList(response.data.data);
}

const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData);

}//when our page will be reloaded it will the quantity how much we have added 

useEffect(()=>{
   async function loadData()
    {
        await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"))
        }

    }
    loadData()//we have just called the function
},[])//if the local storage have the token then we will set the token in the token state so that when we will reload the web page we will not be logged out

    const contextValue = {
         food_list,
         cartItems,
         setCartItems,
         addToCart,
         removeFromCart,
         getTotalCartAmount,
         url,
         token,
         setToken

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider