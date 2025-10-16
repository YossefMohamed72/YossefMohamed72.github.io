

const show_products = function (product) {
    show.innerHTML += `<div class="col-md-3 text-center">
                <div class="card w-100">
                  <a href='product.html?id=${product.id}'><img src="${product.thumbnail}" class="card-img-top" alt="..."></a>
                  <div class="card-body">
                    <span class="text-success" > Rating: ${product.rating}</span>
                    <h5 class="card-title fw-bolder">${product.title}</h5>
                    <span class="text-success"> $${product.discountPercentage}</span>
                    <span class="text-success txt"> $${product.price}</span>
                  </div>
                </div>
              </div>`

}


const filter_products = async function (endPoint) {

    const api = 'https://dummyjson.com/products/category/' + endPoint;

    const api_data = await fetch(api);

    const products_data = await api_data.json();
    console.log(products_data)
    
    const products = products_data.products
    console.log('products', products)
    console.log(products["discountPercentage"])
    
    
    // Clean the show div from current products
    show.innerText = '';

    products.forEach(show_products)

}
var countdownDate = new Date("December 31, 2025 23:59:59").getTime();

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countdownDate - now;

 
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);
