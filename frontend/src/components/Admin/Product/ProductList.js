import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import APIService_Product from "../../../services/Api/ProductService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProducts = async()  => {
    const pro = await APIService_Product.getProducts()
    setProducts(pro.data)
  }

  const getCategories = async () => {
    const cat = await APIService_Product.getCategories()
    setCategories(cat.data)
  }

  useEffect(() => {
    getProducts()
    getCategories()
    return () => {
      setProducts([])
      setCategories([])
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
