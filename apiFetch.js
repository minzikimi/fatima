let apiURL = "https://fakestoreapi.com/products";

fetch(apiURL)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    const productContainer = document.querySelector(".product-grid");
    json.forEach(product => {

      console.log(product.rating);
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
      productElement.appendChild(buttonElement);
  

      productContainer.appendChild(productElement);
    });
  })
  .catch(error => console.log("Erro occured:", error));


  