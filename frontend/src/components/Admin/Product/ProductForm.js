import React, { useState } from "react";
import FormComponent from "../../Form/FormComponent";
import Formatter from "../../../utils/formatter";
import APIService_Product from "../../../services/Api/ProductService";
import APIService_UploadFile from "../../../services/Api/UploadFileService";
import { showSuccessToast } from "../../../utils/toastify";

const ProductForm = ({ setProducts, categories }) => {
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    };

  const handleSubmit = async() => {
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.category._id === "") {
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

    let uploadedImageUrl = "";
    if (selectedFile) {
        const response = await APIService_UploadFile(selectedFile, "product");
        uploadedImageUrl = response.data.filePath;
    }
    const updatedFormData = {
        ...formData,
        image: uploadedImageUrl
    };
    let addedProduct = await APIService_Product.addProduct(updatedFormData);
    //find category name by id from categories
    addedProduct.data.product.category = categories.find((cat) => cat._id === addedProduct.data.product.category);
    showSuccessToast(`${addedProduct.data.product.name} product added!`);
    setProducts((prev) => [...prev, addedProduct.data.product]);
    setFormData({ name: "", description: "", price: "", stock: "", image: "", category: { _id: "", name: "Category" } });
    setError("");
  };

  return (
    <FormComponent
      title="Add Product"
      fields={[
        { type: "text", name: "name", placeholder: "Name", value: formData.name, onChange: handleChange, required: true },
        { type: "file", name: "image", onChange: handleFileChange },
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
