import React, {useState, useRef, useEffect } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux'
import { deleteCart } from './redux/CardSlicer';
import { getTotal } from './redux/TotalSlicer';

const Cart = ({title, description, thumbnail, price, stock, id}) => {
  let [count,setcount] = useState(1)
  //List All Items get 
  let products = useSelector(state => state.product)
  let dispatch = useDispatch();

  // all handle findIndex
  let findIndex = (array, id) =>{
    let index
  for(let i = 0; i < array.length; i++){
    if(products[i].id === id){
       index = i
       break
    }
  }
  return index
}


  const total = useSelector(state => state.total) // Shows the sum of the total items
  
  
  let handleCount = ({type},id) =>{
    let newArray = [...total]    

    if(count < stock && type === "INCREMENT"){      
      setcount(count = count + 1)     
       // Total handle in increment
      let index = findIndex(total, id)
      let tempTotal = products[index].price * 2
      newArray.splice(index, 1, price * count)  
      dispatch(getTotal(newArray))   
    }
    if(count > 1 && type === "DECREMENT"){
      setcount(count - 1)
      // Total handle in decrement
      let newArray = [...total]    
      let index = findIndex(total, id)
      let tempTotal =  (count * price)-price
      newArray.splice(index, 1, tempTotal)  
      dispatch(getTotal(newArray))       
    }
  }  
  const handleDelete = (id)=>{
  dispatch(deleteCart(id))
  // Handles sums when deleting items
  let index = findIndex(total, id)
  let newArray = [...total]
  newArray.splice(index, 1)
  dispatch(getTotal(newArray))
}


  // description scroll effects
  const scrollContainerRef = useRef(null);
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  }


  return (
   <>
     <div className="col col-12 cart-container  col-md-8 mb-4">
        <div className="row  cart-content  dataCard">
            <div className="col col-sm-4  col-md-3 mt-3">
                <img src={thumbnail} alt={title} />
            </div>
            <div className="col  text-content" ref={scrollContainerRef} style={{ height: "150px" ,overflowY: "scroll" , }}>
                <div className="arrow Top">
                    <span onClick={scrollToTop}>
                        <FaAngleDown />
                    </span>
                </div>
                <h5 className="">{title}</h5>
                <p>{description}</p>
                <div className="arrow Down">
                    <span onClick={scrollToBottom}>
                        <FaAngleDown />
                    </span>
                </div>
            </div>
        </div>
    </div>

      <div className="col col-12 col-md-4">
        <div className="quantity m-2">
          <div className="quantity-box">
          <div><button onClick={()=> handleCount({type: "DECREMENT"}, id)} className='btn btn-primary'><RiSubtractFill /></button>&nbsp;<span className="quantity-value btn btn-warning">{count}</span>&nbsp;<button onClick={()=> handleCount({type: "INCREMENT"},id)} className='btn btn-primary'><IoMdAdd /></button></div>
          </div>
          
          <p>$ {price}</p>
        </div>
        <div className="totalQuantity">
          <p className="fw-bold">Total Price :</p>
          <p>${price * count}</p>
        </div>
        <div className="removeCart" >
          <p onClick={()=> handleDelete(id)}>Remove</p>
        </div>
      </div>
   </>
  )
}

export default Cart