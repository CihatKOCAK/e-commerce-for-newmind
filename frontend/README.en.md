# Frontend - Screenshots

[For Turkish](README.md)

This section provides information about the file structure of the frontend service, along with screenshots and usage details.

- [File Structure](#file-structure)
- [Screenshots](#screenshots)

## File Structure

```sh
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── config/
│   ├── components/
│   ├── contexts/ #-AuthContext.js-BasketContext.js
│   ├── utils/
│   ├── routes/ #-AdminRoute.js-PrivateRoute.js-routeConfig.js
│   ├── pages/ # public pages - private pages
│   ├── services/ #-ApiService.js-AuthService.js-SocketService.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .gitignore
├── Dockerfile
├── package.json
└── README.md
```

## Screenshots

### Admin Dashboard

![Admin Dashboard](../ReadMeAssets/Screenshots/admin-dashboard-categories.png)
![Admin Dashboard](../ReadMeAssets/Screenshots/admin-dashboard-add-products.png)
![Admin Dashboard](../ReadMeAssets/Screenshots/admin-dashboard-edit-product.png)

### Login Page
![Login Page](../ReadMeAssets/Screenshots/login-page.png)

### Register Page
![Register Page](../ReadMeAssets/Screenshots/register-page.png)

### User Dashboard

![User Dashboard](../ReadMeAssets/Screenshots/profile-page.png)

### Index Page

#### Index Page with User
![Index Page](../ReadMeAssets/Screenshots/index-page.png)
#### Index Page without User
![Index Page With No User](../ReadMeAssets/Screenshots/index-page-no-user.png)

### Detail Page

![Product Detail Page](../ReadMeAssets/Screenshots/product-detail-page.png)

![Product Detail Similar Items](../ReadMeAssets/Screenshots/product-detail-page-similar-items.png)

### Basket Page

#### Basket Page with User
![Basket Page](../ReadMeAssets/Screenshots/basket-page.png)
#### Basket Page without User
![Basket Page With No User](../ReadMeAssets/Screenshots/basket-page-no-user.png)
![Empty Basket Page](../ReadMeAssets/Screenshots/basket-page-empty.png)


### Checkout Process

![Checkout Process](../ReadMeAssets/Screenshots/checkout-process.png)

![Waiting Socket Response](../ReadMeAssets/Screenshots/waiting-socket-response.png)

![Success Response](../ReadMeAssets/Screenshots/payment-ok-modal.png)

![Error Response](../ReadMeAssets/Screenshots/payment-error-modal.png)

[Back to Main README](../README.en.md)