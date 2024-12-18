import './ProductCard.css';
import brokenImg from '../../assets/brokenImg.png'; // Dummy resim

const ProductCard = ({ product }) => {
  const { name, description, price, stock, category, image } = product;

  return (<div className="product-card">
      <div className="product-image">
        <img src={image || brokenImg} alt={name} />
      </div>
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-category">{category?.name || 'Uncategorized'}</p>
        <p className="product-description">{description}</p>
        <p className="product-price">${price.toFixed(2)}</p>
        <p className={`product-stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {stock > 0 ? `${stock} in stock` : 'Out of stock'}
        </p>
      </div>
      <div className="product-actions">
        <button className="product-button">View</button>
        <button className="product-button">Add to cart</button>
      </div>
    </div> 
  );
};

export default ProductCard;
