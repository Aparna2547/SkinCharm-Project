const formId = document.getElementById("formId");
const nameInput = document.getElementById("product");
const categoryInput = document.getElementById("category")
const brandInput = document.getElementById("brand")
const actualpriceInput = document.getElementById("actualPrice");
const sellingpriceInput = document.getElementById("sellingPrice");
const stockInput = document.getElementById("stock");
const descriptionInput = document.getElementById("description");

const errorMessage = document.getElementById("errorMessage");

formId.addEventListener("submit", (event) => {
  const name = nameInput.value;
  const category = categoryInput.value;
  const brand = brandInput.value
  const actualprice = actualpriceInput.value;
  const sellingPrice = sellingpriceInput.value;
  const stock = stockInput.value;

  const description = descriptionInput.value;
  

  if (name.trim().length < 5) {
    event.preventDefault();
    errorMessage.textContent = "Enter the name of the product";
  }
  else if (category=='selected'){
    event.preventDefault()
    errorMessage.textContent = "Select the category"
  }
  else if (brand == 'selected'){
    event.preventDefault()
    errorMessage.textContent = "Select the brand"
  }
  else if (actualprice <= 10 ) {
    event.preventDefault();
    errorMessage.textContent = "Enter valid price";
  }
  else if (sellingPrice <= 10) {
    event.preventDefault();
    errorMessage.textContent = "Enter selling valid price";
  }
  else if(sellingPrice >= actualprice){
    event.preventDefault();
    errorMessage.textContent = "Selling price cannot be greater than actual price"
  }
  else if (stock <= 0) {
    console.log(stock);
    event.preventDefault();
    errorMessage.textContent = "Stock cannot be zero or negative number";
  }
  else if (description.trim().length < 8) {
    event.preventDefault();
    errorMessage.textContent = "Enter the description";
  }
 
});
