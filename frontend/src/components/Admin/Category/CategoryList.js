import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import Modal from "../../Modal";
import { showSuccessToast } from "../../../utils/toastify";

const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Category 1", description: "Description 1" },
    { id: 2, name: "Category 2", description: "Description 2" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSave = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
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
          <li key={category.id}>
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
            }} onClick={() => handleDelete(category.id)}>Delete</button>
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
