import React, { useState } from "react";
import FormComponent from "../../Form/FormComponent";
import APIService_Product from "../../../services/Api/ProductService";
import { showSuccessToast } from "../../../utils/toastify";

const CategoryForm = ({ setCategories }) => {
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      setError("Name is required!");
      return;
    }

    const addedCategory = await APIService_Product.addCategory(formData);
    setCategories((prev) => [...prev, addedCategory.data]);
    setFormData({ name: "", description: "" });
    setError("");
    showSuccessToast("Category added!");
  };

  return (
    <FormComponent
      title="Add Category"
      fields={[
        { type: "text", name: "name", placeholder: "Name", value: formData.name, onChange: handleChange, required: true },
        { type: "text", name: "description", placeholder: "Description", value: formData.description, onChange: handleChange },
      ]}
      onSubmit={handleSubmit}
      buttonText="Add Category"
      error={error}
    />
  );
};

export default CategoryForm;
