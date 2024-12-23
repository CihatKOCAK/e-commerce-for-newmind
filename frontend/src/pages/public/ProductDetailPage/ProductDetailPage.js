import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import brokenImg from '../../../assets/broken-image.png';
import './ProductDetailPage.css';
import { FaStar } from 'react-icons/fa';
import ProductCard from '../../../components/Product/ProductCard'; // ProductCard bileşeni
import PRODUCT_SERVICE from '../../../services/Api/ProductService';
import { useBasket } from '../../../context/BasketContext';
import { API_MAIN_URL } from '../../../config/apiConfig';

const ProductDetailPage = () => {
  const { id: productId } = useParams(); // URL'deki :id parametresini alır
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]); // Benzer ürünler
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {addToBasket} = useBasket();

  const fetchProductDetails = async () => {
    try {
      const response = await PRODUCT_SERVICE.getProductById(productId); // API çağrısı
      if (response.status === 200) {
        setProduct(response.data);
        fetchSimilarProducts(response.data.category?._id); // Kategoriye göre ürünleri getir
      } else {
        setError('Product not found.');
      }
    } catch (err) {
      setError('An error occurred while fetching the product.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async (categoryId) => {
    if (!categoryId) setSimilarProducts([]);
    try {
      const response = await PRODUCT_SERVICE.getProductsByCategory(categoryId); // Kategoriye göre ürünleri getir
      if (response.status === 200) {
        setSimilarProducts(response.data);
      }
    } catch (err) {
      console.error('Error fetching similar products:', err);
    }
  };

  useEffect(() => {
    /* eslint-disable */
    fetchProductDetails();
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  const { name, description, price, stock, category, image, rate, rateCount, viewCount } = product;

  return (
  <>
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-image">
          <img src={image ? API_MAIN_URL + image : brokenImg} alt={name} />
        </div>
        <div className="product-info">
          <h1>{name}</h1>
          <p className="product-category">{category?.name || 'Uncategorized'}</p>
          <p className="product-description">{description}</p>
          <div className="product-rating">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  color={ratingValue <= rate ? '#f8d64e' : '#e4e5e9'}
                />
              );
            })}
            <span className="product-rating-count">({rateCount || 0} ratings)</span>
            <span className="product-view-count">({viewCount || 0} views)</span>
          </div>
          <p className="product-price">${price.toFixed(2)}</p>
          <p className={`product-stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </p>
          <button className="add-to-basket-button" onClick={() => addToBasket(product)}>Add to basket</button>
        </div>
      </div>
    </div>
    <div className="similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products-list">
          {similarProducts.length > 0 ? (
            similarProducts.map((similarProduct) => (
              <ProductCard key={similarProduct._id} product={similarProduct} />
            ))
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
  </>
  );
};

export default ProductDetailPage;
