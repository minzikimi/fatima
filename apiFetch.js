// let apiURL = "https://fakestoreapi.com/products";
// fetch(apiURL)
//   .then(res => res.json())
//   .then(json => {
//     console.log(json);
//     const productContainer = document.querySelector(".product-grid");
//     json.forEach(product => {

//       console.log(product.rating);
//       const productElement = document.createElement("div");
//       productElement.className = "product-card";
  

//       const imgElement = document.createElement("img");
//       imgElement.src = product.image;
//       imgElement.alt = product.title;
//       productElement.appendChild(imgElement);
  
//       const titleElement = document.createElement("h3");
//       titleElement.textContent = product.title;
//       productElement.appendChild(titleElement);
  
//       // Create and append the price
//       const priceElement = document.createElement("p");
//       priceElement.textContent = `$${product.price.toFixed(2)}`;
//       productElement.appendChild(priceElement);
  

//       const buttonElement = document.createElement("button");

//       buttonElement.textContent = "Add to cart";
//       productElement.appendChild(buttonElement);
  

 //       productContainer.appendChild(productElement);
 //     });
 //   })
  //   .catch(error => console.log("Erro occured:", error));




let apiURL = "https://fakestoreapi.com/products";
let products = [];
let basket = [];

fetch(apiURL)
  .then(res => res.json())
  .then(json => {
    products = json;
    renderProducts(products);
    setupFilters();
  })
  .catch(error => console.log("Error occurred:", error));

function renderProducts(productsToRender) {
  const productContainer = document.querySelector(".product-grid");
  productContainer.innerHTML = '';

  productsToRender.forEach(product => {
    const productElement = document.createElement("div");
    productElement.className = "product-card";

    const imgElement = document.createElement("img");
    imgElement.src = product.image;
    imgElement.alt = product.title;
    productElement.appendChild(imgElement);

    const titleElement = document.createElement("h3");
    titleElement.textContent = product.title;
    productElement.appendChild(titleElement);
    
// Create and append the price
    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price.toFixed(2)}`;
    productElement.appendChild(priceElement);

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Add to cart";
    buttonElement.onclick = () => addToBasket(product);
    productElement.appendChild(buttonElement);

    productContainer.appendChild(productElement);
  });
}
// apply filters from here
function setupFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const priceFilter = document.getElementById('price-filter');

  categoryFilter.addEventListener('change', applyFilters);
  ratingFilter.addEventListener('change', applyFilters);
  priceFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const priceFilter = document.getElementById('price-filter');

  let filteredProducts = products;
  
  if (categoryFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === categoryFilter.value.toLowerCase()
    );
  }

  if (ratingFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.rating.rate >= parseFloat(ratingFilter.value)
    );
  }

  if (priceFilter.value !== 'all') {
    const [min, max] = priceFilter.value.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => 
      product.price >= min && (max ? product.price <= max : true)
    );
  }

  renderProducts(filteredProducts);
}

// function items add to basket

function addToBasket(product) {
  const existingItem = basket.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    basket.push({...product, quantity: 1});
  }
  updateBasketIcon();
  renderBasket();
}

function updateBasketIcon() {
  const basketIcon = document.getElementById('shopping-cart-icon');
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  basketIcon.setAttribute('data-count', totalItems);
}

function renderBasket() {
  const basketContainer = document.getElementById('basket-container');
  basketContainer.innerHTML = ''; 
}
renderBasket();
  
 