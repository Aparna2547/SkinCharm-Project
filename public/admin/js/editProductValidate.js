
const formId = document.getElementById("editformId");
const nameInput = document.getElementById("productname");
const categoryInput = document.getElementById("categoryname")
const brandInput = document.getElementById("brandname")
const actualpriceInput = document.getElementById("actualprice");
const sellingpriceInput = document.getElementById("sellingprice");
const stockInput = document.getElementById("stocks");
const descriptionInput = document.getElementById("Description");
const errorMessage = document.getElementById("errorMessage");

formId.addEventListener("submit", (event) => {
  const name = nameInput.value;
  const category = categoryInput.value;
  const brand = brandInput.value
  const actualprice = actualpriceInput.value;
  const sellingPrice = sellingpriceInput.value;
  const stock = stockInput.value;

  const description = descriptionInput.value;
  

  if (name.trim().length < 5 ) {
     console.log(name)
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
  else if (actualprice <= 10) {
    event.preventDefault();
    errorMessage.textContent = "Enter  actual price of the product";
  }
  else if (sellingPrice <= 10) {
    event.preventDefault();
    errorMessage.textContent = "Enter selling price of the product";
  }
  else if(sellingPrice>actualprice){
    event.preventDefault();
    errorMessage.textContent = "selling proce must be less than actual price"
  }
  else if (stock <= 0 ) {
    event.preventDefault();
    errorMessage.textContent = "Stock cannot be zero or negative number";
  }
  else if (description.trim().length == 0) {
    event.preventDefault();
    errorMessage.textContent = "Enter the description";
  }

  
});
