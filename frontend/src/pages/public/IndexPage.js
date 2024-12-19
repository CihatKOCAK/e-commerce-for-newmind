import React from 'react';
import ProductCard from '../../components/Product/ProductCard';
import PRODUCT_SERVICE from '../../services/Api/ProductService';

const IndexPage = () => {
  const [products, setProducts] = React.useState([]);

  const handleProducts = async () => {
    try {
      const response = await PRODUCT_SERVICE.getProducts();
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  React.useEffect(() => {
    handleProducts();
  }, []);

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    padding: '16px',
  };

  return (
    <div>
      <div style={containerStyle}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
