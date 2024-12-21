import {useState, useEffect} from 'react'
import ProductList from '../../../components/Admin/Product/ProductList';
import CategoryList from '../../../components/Admin/Category/CategoryList';
import "./DashboardPage.css";
import APIService_Product from '../../../services/Api/ProductService';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const cat = await APIService_Product.getCategories()
    console.log(cat)
    setCategories(cat.data)
  }

  useEffect(() => {
    getCategories() // iki alanda da kullanıldığından dolayı direkt burada çağırıldı
    return () => {
      setCategories([])
    }
  }, [])
  

  return (
    <div>
    <h1>Admin Panel</h1>
    <div>
      <button onClick={() => setActiveTab("products")}>Products</button>
      <button onClick={() => setActiveTab("categories")}>Categories</button>
    </div>
    <div>
      {activeTab === "products" && <ProductList categories={categories} />}
      {activeTab === "categories" && <CategoryList categories={categories}  />}
    </div>
  </div>
    )
}

export default DashboardPage