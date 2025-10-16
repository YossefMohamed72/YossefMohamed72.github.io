const api = 'https://dummyjson.com/products';

const api_data = await fetch(api);

const products_data = await api_data.json();
console.log(products_data)

const products = products_data.products
console.log('products', products)
console.log(products["discountPercentage"])



// filter_products_buttons
const categories_api = 'https://dummyjson.com/products/categories';

const categories_api_res = await fetch(categories_api);

const categories_api_data = await categories_api_res.json();
console.log('categories_api_data', categories_api_data)

categories_api_data.forEach(function (cat) {
  console.log(cat)
  filter_products_buttons.innerHTML += `
  <div class="col-md-2 ">
    <button onclick="filter_products('${cat.slug}')" type="button" class="">${cat.name}</button>
  </div>
  `;
})


console.log('-------------------------------')
const api_two = 'https://dummyjson.com/recipes?select=name,id,difficulty,image,ingredients';

const api_data_two = await fetch(api_two);

const food_data = await api_data_two.json();
console.log(food_data)

const catagre = food_data.recipes

console.log(catagre)
const show_food = function (foods) {
  shw_food.innerHTML += `<div class="col-md-3 text-center p-3 my-2">
              <div class="card w-100 ">
                <img src="${foods.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h4 class="card-title fw-bolder">${foods.name}</h5>
                </div>
              </div>
            </div>`

}
products.forEach(show_products)
catagre.forEach(show_food)

