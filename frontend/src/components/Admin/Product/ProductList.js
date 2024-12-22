import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import EditProductModal from "../../Modals/EditProductModal";
import APIService_Product from "../../../services/Api/ProductService";
import BrokenImage from "../../../assets/broken-image.png";
import { API_MAIN_URL } from "../../../config/apiConfig";
import { showErrorToast, showSuccessToast } from "../../../utils/toastify";
import APIService_UploadFile from "../../../services/Api/UploadFileService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProducts = async () => {
    const pro = await APIService_Product.getProducts();
    setProducts(pro.data);
  };

  const getCategories = async () => {
    const cat = await APIService_Product.getCategories();
    setCategories(cat.data);
  };

  useEffect(() => {
    getProducts();
    getCategories();
    return () => {
      setProducts([]);
      setCategories([]);
    };
  }, []);

  const handleDelete = (id) => {
    APIService_Product.deleteProduct(id);
    showSuccessToast(
      `${products.find((pro) => pro._id === id).name} product deleted!`
    );
    setProducts((prev) => prev.filter((product) => product._id !== id));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedProduct) => {

    if (!updatedProduct.name || !updatedProduct.description || !updatedProduct.price || !updatedProduct.stock || !updatedProduct.category) {
        showErrorToast("All fields are required!");
      return;
    }

    if (isNaN(updatedProduct.price) || isNaN(updatedProduct.stock)) {
        showErrorToast("Price and Stock must be a number!");
        return;
    }

    if (updatedProduct.price <= 0 || updatedProduct.stock <= 0) {
        showErrorToast("Price and Stock must be greater than 0!");
        return;
    }

    let uploadedImageUrl = "";
    if (selectedFile) {
        const response = await APIService_UploadFile(
            selectedFile,
            "product"
        );
        uploadedImageUrl = response.data.filePath;
        updatedProduct.image = uploadedImageUrl;
    }


    const response = await APIService_Product.updateProduct(updatedProduct._id, updatedProduct);
    updatedProduct = response.data.updatedProduct;
    updatedProduct.category = categories.find(
        (cat) => cat._id === updatedProduct.category
    );
    console.log(updatedProduct);
    showSuccessToast(`${updatedProduct.name} updated successfully!`);
    setProducts((prev) =>
      prev.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <h2>Products</h2>
      <ProductForm setProducts={setProducts} categories={categories} />
      <ul className="product-list">
        {products?.map((product) => (
          <li key={product._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                src={
                  product.image ? API_MAIN_URL + product.image : BrokenImage
                }
                alt={product.name}
                style={{ width: "100px", marginRight: 10 }}
              />
              <div>
                <div>
                  {product.name} - {product.price}$
                </div>
                <div>{product.description}</div>
                <div>
                  Stock: {product.stock} - Category:{" "}
                  {product.category ? product.category.name : "Uncategorized"}
                </div>
              </div>
            </div>
            <div>
                <button style={{
                    backgroundColor: '#61dafb',
                    color: "white",
                    marginLeft: "10px",
                }} onClick={() => handleEdit(product)}>Edit</button>
                <button style={{
                    backgroundColor: "red",
                    color: "white",
                    marginLeft: "10px",
                }} onClick={() => handleDelete(product._id)}>Delete</button>
             </div>
          </li>
        ))}
      </ul>
      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSave={handleSave}
        categories={categories}
        setSelectedFile={setSelectedFile}
      />
    </div>
  );
};

export default ProductList;
