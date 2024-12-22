import React, { useState, useEffect } from "react";
import Modal from '../Modal';
import FormComponent from "../Form/FormComponent";
import Formatter from "../../utils/formatter";

const EditProductModal = ({ isOpen, onClose, product, onSave, categories,setSelectedFile }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: {
        _id: "",
        name: "Category",
    }
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category?._id || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.category) {
      alert("All fields are required!");
      return;
    }
    onSave({ ...product, ...formData });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    };

  if (!isOpen) return null;

  return (
    <Modal
    style={{ width: "600px" }}
    isOpen={isOpen}
    onClose={onClose}
    title="Edit Product"
  >
        <FormComponent
        fields={[
            { type: "text", name: "name", placeholder: "Name", value: formData.name, onChange: handleChange, required: true },
            { type: "file", name: "image", onChange: handleFileChange, value: formData.image },
            { type: "text", name: "description", placeholder: "Description", value: formData.description, onChange: handleChange, required: true },
            { type: "text", name: "price", placeholder: "Price", value: formData.price, onChange: handleChange, required: true },
            { type: "text", name: "stock", placeholder: "Stock", value: formData.stock, onChange: handleChange, required: true },
            { type: "select", name: "category", value: formData.category, placeholder: "Category", onChange: handleChange, options: Formatter.dropDownFormatter(
            categories,
            "name",
            "_id"
            ) },
      ]}
        onSubmit={handleSubmit}
        buttonText="Update Product"
        />
    </Modal>
    );
}

export default EditProductModal;