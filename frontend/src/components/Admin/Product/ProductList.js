import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import APIService_Product from "../../../services/Api/ProductService";

const ProductList = ({categories}) => {
  const [products, setProducts] = useState([]);

  const getProducts = async()  => {
    const pro = await APIService_Product.getProducts()
    console.log(pro.data)
    setProducts(pro.data)
  }

  useEffect(() => {
    getProducts()
    return () => {
      setProducts([])
    }
  }, [])


  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div>
      <h2>Products</h2>
      <ProductForm setProducts={setProducts} categories={categories} />
      <ul className="product-list">
        {products?.map((product) => (
          <li key={product._id}>
            <div>
              <div>
                {product.name} - {product.price}$
              </div>
              <div>{product.description}</div>
              <div>Stock: {product.stock}  - Category: {product.category ? product.category.name : "Uncategorized"}</div>
            </div>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
