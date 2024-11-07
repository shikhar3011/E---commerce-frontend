import React, { useEffect, useState } from 'react'
import Appcontext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {
  // const url = "http://localhost:1000/api"
  const url = "https://e-commerce-api-m246.onrender.com/api"
  const [products, setProducts] = useState([])
  const [token, setToken] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [user, setUser] = useState()
  const [cart, setCart] = useState([])
  const [reload, setReload] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [userOrder, setUserOrder] = useState([])


  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      })
      console.log(api.data.products)
      setProducts(api.data.products)
      setFilteredData(api.data.products)
      userProfile()
    };
    fetchProducts();
    userCart()
    getAddress()
    user_order()
  }, [token,reload])

  useEffect(() => {
    let lstoken=localStorage.getItem('token')
    // setToken(localStorage.getItem('token'))
    if(lstoken){
      setToken(lstoken)
      setIsAuthenticated(true); 
    }
  }, [])
  

  // register user 
  const register = async (name, email, password) => {
    const api = await axios.post(`${url}/user/register`, { name, email, password }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    });
    // alert(api.data.message)
    // console.log("User register",api)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    return api.data
  };

  // login user 
  const login = async (email, password) => {
    const api = await axios.post(`${url}/user/login`, { email, password }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    });
    // alert(api.data.message)
    // console.log("User login",api.data)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    setToken(api.data.token)
    setIsAuthenticated(true)
    localStorage.setItem('token',api.data.token)
    return api.data
  };

  // logout user 
  const logout = () =>{
    setIsAuthenticated(false)
    setToken(" ")
    localStorage.removeItem('token')

    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  // user profile 
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token
      },
      withCredentials: true
    })
    console.log(api.data)
    setUser(api.data.user)

  };

  // add to cart 
  const addToCart = async (productId,title,price,qty,imgSrc) => {
    const api = await axios.post(`${url}/cart/add`,{productId,title,price,qty,imgSrc}, {
      headers: {
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true
    })
    setReload(!reload)
    // console.log("my cart ",api)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  // get user cart 
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token
      },
      withCredentials: true
    })
    // console.log("user cart ",api.data.cart)
    // setUser("user cart",api)
    setCart(api.data.cart)
  }

  // qty --
  const decreaseQty = async (productId,qty) => {
    const api = await axios.post(`${url}/cart/--qty`,{productId,qty}, {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token
      },
      withCredentials: true
    })
    setReload(!reload)
    // console.log("user cart ",api.data.cart)
    // setUser("user cart",api)
    // setCart(api.data.cart)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  // remove from cart 
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token
      },
      withCredentials: true
    })
    setReload(!reload)
    // console.log("user cart ",api.data.cart)
    // setUser("user cart",api)
    // setCart(api.data.cart)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }
   
  // clear cart 
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token
      },
      withCredentials: true
    })
    setReload(!reload)
    // console.log("user cart ",api.data.cart)
    // setUser("user cart",api)
    // setCart(api.data.cart)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  // Add Shipping Address 
  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    const api = await axios.post(`${url}/address/add`,{fullName, address, city, state, country, pincode, phoneNumber}, {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token
      },
      withCredentials: true
    })
    setReload(!reload)
    // console.log("user cart ",api.data.cart)
    // setUser("user cart",api)
    // setCart(api.data.cart)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    return api.data
  }

  // get user latest address 
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth:token,
      },
      withCredentials: true
    })
    // console.log("user address",api.data.userAddress)
    setUserAddress(api.data.userAddress)
  };

  // get user order 
  const user_order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth:token,
      },
      withCredentials: true
    })
    // console.log("user order",api)
    setUserOrder(api.data)
  };

  

  return (
    <Appcontext.Provider value={{ products, register, login, url, token, setIsAuthenticated, isAuthenticated,filteredData, setFilteredData,logout,user,addToCart,cart,decreaseQty, removeFromCart,clearCart,shippingAddress, userAddress,userOrder}}>
      {props.children}
    </Appcontext.Provider>

  );
};

export default AppState;
