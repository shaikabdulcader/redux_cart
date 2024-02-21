import { createSlice } from "@reduxjs/toolkit";

const findIndex = (array, id) =>{
  let index
  for(let i = 0; i < array.length; i++){
    if(array[i].id === id){
      index = i
      break
    }
  }
  return index
}
export const TotalSlice = createSlice({
    name: 'total',
    initialState: [],
    reducers : {
      getTotal: (state, action)=>{
        return action.payload
      },
     
    }
  })
  
  export const {getTotal} = TotalSlice.actions
  
  export default TotalSlice.reducer