import React, { useState } from "react";
import FormComponent from "../../Form/FormComponent";

const ProductForm = ({ setProducts }) => {
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.stock) {
      setError("All fields are required!");
      console.log(formData);
      return;
    }
    setProducts((prev) => [...prev, { ...formData, id: Date.now() }]);
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
      ]}
      onSubmit={handleSubmit}
      buttonText="Add Product"
      error={error}
    />
  );
};

export default ProductForm;
