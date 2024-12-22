import React from 'react'
import Modal from '../Modal';

function CategoryUpdateModal({
    isModalOpen,
    setIsModalOpen,
    selectedCategory,
    setSelectedCategory,
    handleSave
}) {
  return (
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
  )
}

export default CategoryUpdateModal