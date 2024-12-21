import React, { useState } from "react";
import FormComponent from "../../Form/FormComponent";
import Formatter from "../../../utils/formatter";
import APIService_Product from "../../../services/Api/ProductService";

const ProductForm = ({ setProducts, categories }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: {
        _id: "",
        name: "Category",
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async() => {
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.category) {
      setError("All fields are required!");
      return;
    }
    if(isNaN(formData.price) || isNaN(formData.stock)){
        setError("Price and Stock must be a number!");
        return;
    }
    if(formData.price <= 0 || formData.stock <= 0){
        setError("Price and Stock must be greater than 0!");
        return;
    }

    let addedProduct = await APIService_Product.addProduct(formData);
    //find category name by id from categories
    addedProduct.data.product.category = categories.find((cat) => cat._id === addedProduct.data.product.category);
    setProducts((prev) => [...prev, addedProduct.data.product]);
    setFormData({ name: "", description: "", price: "", stock: "" });
    setError("");
  };

  return (
    <FormComponent
      title="Add Product"
      fields={[
        { type: "text", name: "name", placeholder: "Name", value: formData.name, onChange: handleChange, required: true },
        { type: "text", name: "description", placeholder: "Description", value: formData.description, onChange: handleChange, required: true },
        { type: "number", name: "price", placeholder: "Price", value: formData.price, onChange: handleChange, required: true },
        { type: "number", name: "stock", placeholder: "Stock", value: formData.stock, onChange: handleChange, required: true },
        { type: "select", name: "category", placeholder: "Category", value: formData.category, onChange: handleChange, options: Formatter.dropDownFormatter(
            categories,
            "name",
            "_id"
            ) },
      ]}
      onSubmit={handleSubmit}
      buttonText="Add Product"
      error={error}
    />
  );
};

export default ProductForm;
