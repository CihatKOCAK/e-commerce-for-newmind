import React, { useState,useEffect } from "react";
import CategoryForm from "./CategoryForm";
import Modal from "../../Modal";
import { showSuccessToast } from "../../../utils/toastify";
import APIService_Product from "../../../services/Api/ProductService";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategories = async () => {
    const cat = await APIService_Product.getCategories()
    setCategories(cat.data)
  }

  useEffect(() => {
    getCategories()
    return () => {
        setCategories([])
    }
}, [])

  const handleDelete = (id) => {
    APIService_Product.deleteCategory(id);
    showSuccessToast(`${categories.find((cat) => cat._id === id).name} category deleted!`);
    setCategories((prev) => prev.filter((category) => category._id !== id));
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSave = (updatedCategory) => {
    APIService_Product.updateCategory(updatedCategory._id, updatedCategory);
    setCategories((prev) =>
      prev.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
    showSuccessToast("Category updated!");
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Categories</h2>
      <CategoryForm setCategories={setCategories} />
      <ul className="product-list">
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <div>
            <button style={{
                backgroundColor: '#61dafb',
                color: "white",
                marginLeft: "10px",
            }} onClick={() => handleEdit(category)}>Edit</button>
            <button style={{
                backgroundColor: "red",
                color: "white",
                marginLeft: "10px",
            }} onClick={() => handleDelete(category._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Category"
      >
        {selectedCategory && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(selectedCategory);
            }}
          >
            <div>
              <label>Name</label>
              <input
                type="text"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                value={selectedCategory.description}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit">Save</button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default CategoryList;
