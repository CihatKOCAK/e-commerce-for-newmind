import {useState, useEffect} from 'react'
import ProductList from '../../../components/Admin/Product/ProductList';
import CategoryList from '../../../components/Admin/Category/CategoryList';
import "./DashboardPage.css";
import APIService_Product from '../../../services/Api/ProductService';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div>
    <h1>Admin Panel</h1>
    <div>
      <button onClick={() => setActiveTab("products")}>Products</button>
      <button onClick={() => setActiveTab("categories")}>Categories</button>
    </div>
    <div>
      {activeTab === "products" && <ProductList />}
      {activeTab === "categories" && <CategoryList />}
    </div>
  </div>
    )
}

export default DashboardPage