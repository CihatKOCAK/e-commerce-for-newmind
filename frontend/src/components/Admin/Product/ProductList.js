import React, { useState } from "react";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", description: "Description 1", price: 100, stock: 10 },
    { id: 2, name: "Product 2", description: "Description 2", price: 200, stock: 5 },
  ]);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div>
      <h2>Products</h2>
      <ProductForm setProducts={setProducts} />
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}$
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
