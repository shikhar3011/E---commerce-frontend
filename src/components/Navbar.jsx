import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Appcontext from '../context/AppContext'


const navbar = () => {
  const [searchTerm, setsearchTerm] = useState("")
  const navigate = useNavigate()

  const { setFilteredData, products, logout, isAuthenticated, cart } = useContext(Appcontext)

  const filterbyCategory = (cat) => {
    console.log(`Filtering by category: ${cat}`);
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };

  const filterbyPrice = (price) => {
    console.log(`Filtering by price: ${price}`);
    setFilteredData(
      products.filter(
        (data) => data.price >= price
      )
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setsearchTerm("")

  }
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link to={'/'} className="left" style={{ textDecoration: 'none', color: 'white' }}>
            <h3>E-Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>
            <input value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} type="text" placeholder='Search Products' />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link to={'/cart'}
                  type="button" class="btn btn-primary position-relative mx-3">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>
                <Link to={'/profile'} className="btn btn-info mx-3">profile</Link>
                <button className="btn btn-danger mx-3" onClick={() => {
                  logout();
                  navigate('/')
                }}>logout</button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to={'/login'} className="btn btn-secondary mx-3">login</Link>
                <Link to={'/register'} className="btn btn-info mx-3">register</Link>
              </>
            )}
          </div>
        </div>
        <div className="sub_bar">
          <div className="items" onClick={() => setFilteredData(products)}>No Filter</div>
          <div className="items" onClick={() => filterbyCategory("mobile")}>Mobiles</div>
          <div className="items" onClick={() => filterbyCategory("laptop")}>Laptops</div>
          <div className="items" onClick={() => filterbyCategory("camera")}>Cameras</div>
          <div className="items" onClick={() => filterbyCategory("headphone")}>Headphones</div>
          <div className="items" onClick={() => filterbyPrice(15999)}>15999</div>
          <div className="items" onClick={() => filterbyPrice(259999)}>25999</div>
          <div className="items" onClick={() => filterbyPrice(499999)}>49999</div>
          <div className="items" onClick={() => filterbyPrice(699999)}>69999</div>
          <div className="items" onClick={() => filterbyPrice(89999)}>89999</div>
        </div>
      </div>
    </>
  )
}

export default navbar
