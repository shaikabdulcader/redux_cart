import React, { useState, useEffect, useReducer } from "react";
import Cart from "./Cart";
import { API_URL } from "../App";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import {saveAllCart } from "./redux/CardSlicer";
// import { getTotal } from "./redux/CardSlicer";
import { getTotal } from "./redux/TotalSlicer";

 const ProductCard = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product) //All product lists

  const total = useSelector(state => state.total)
 
  // Finally it shows the total amount
  let Totals = total.reduce((p,e) => p = p + e,0)


let [product, setProduct] = useState([]);
const getData = async () => {
  try {
    let res = await axios.get(API_URL);
    
    if (res.status === 200) {
      dispatch(saveAllCart(res.data))
      dispatch(getTotal(res.data.map(e=>e.price)))
      setProduct(res.data);
    }
  } catch (error) {}
};
useEffect(()=>{
  dispatch(getTotal(products.map(e=>e.price)))
},[])

useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container-fulid pb-5 mt-5  addToCart">
        <div className="container">
          <div className="row row-cols-2 row-cols-sm-1 row-cols-md-2">
            {
              products.map((e,i)=>{
                return <Cart  dispatch={dispatch} title={e.title} description={e.description} thumbnail={e.thumbnail} price={e.price} stock={e.stock} id={e.id} key={e.id} product={products} />
              })
            }
            </div>
        </div>
        <div className="container">
          <div className="total-amount">
            <div className="subTotal">
              <p className="text-light">SUBTOTSL :</p>
              <p>$.{Totals}</p>
            </div>
            <div className="shipping">
              <p className="text-light">SHIPPING :</p>
              <p>FREE</p>
            </div>
            <hr />
            <div className="total">
              <p className="fw-bold">TOTAL : </p>
              <p>$.{Totals}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
