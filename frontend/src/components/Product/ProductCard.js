import './ProductCard.css';
import brokenImg from '../../assets/broken-image.png';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../../context/BasketContext';
import { API_MAIN_URL } from '../../config/apiConfig';

const ProductCard = ({ product }) => {
  const { name, description, price, stock, category, image, rate, viewCount, rateCount } = product;

  const navigate = useNavigate();
  const { addToBasket } = useBasket();

  return (<div className="product-card">
      <div className="product-image">
      <img src={product.image  ? API_MAIN_URL + image : brokenImg } alt={name} />
      </div>
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-category">{category?.name || 'Uncategorized'}</p>
        <p className="product-description">{description}</p>
        <span className="product-rating">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return <FaStar key={index} color={ratingValue <= rate ? '#f8d64e' : '#e4e5e9'} />;
          }
          )}
          <span className="product-rating-count">({rateCount ? rateCount : 0})</span>
          <span className="product-view-count">({viewCount ? viewCount : 0}) views</span>
        </span>
        <p className="product-price">${price.toFixed(2)}</p>
        <p className={`product-stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {stock > 0 ? `${stock} in stock` : 'Out of stock'}
        </p>
      </div>
      <div className="product-actions">
        <button className="product-button" onClick={() => navigate(`/product/${product._id}`)}>View details</button>
        <button className="product-button" onClick={
          () => addToBasket(product)
        }>Add to basket</button>
      </div>
    </div> 
  );
};

export default ProductCard;
