import React from 'react'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'

export const API_URL = "https://659cd05d633f9aee7907f7ea.mockapi.io/products"
const App = () => {
  return (
    <div>
      <ProductCard/>
    </div>
  )
}

export default App