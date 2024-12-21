import React, { useState } from "react";
import FormComponent from "../../Form/FormComponent";

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

  const handleSubmit = () => {
    if (!formData.name) {
      setError("Name is required!");
      return;
    }
    setCategories((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({ name: "", description: "" });
    setError("");
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
