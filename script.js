const totalPriceElement = document.getElementById("totalPrice")
const itemsList = document.getElementById("itemsList")
let totalPrice = 0;
let cart = [];
class Item{
  constructor(name, price){
    this.name = name;
    this.price = price;
  }
}

const storageCart = localStorage.getItem("cart");
if (storageCart !== null){
  let storageTotalPrice=localStorage.getItem("totalPrice");
  totalPrice=parseInt(storageTotalPrice);

  cart=  JSON.parse(storageCart).map((item)=>{
    return new Item(item.name, item.price)
  });
}
refreshUI();
function refreshUI() {
  totalPriceElement.innerText = `Total Price $${totalPrice}  `;
  itemsList.innerHTML=""
  
  const clearButton = document.createElement("button");
  const clearButtonText = document.createTextNode("Clear cart");
  clearButton.appendChild(clearButtonText);
  clearButton.classList.add("btn", "btn-warning","ml-3")
  totalPriceElement.append(clearButton)

  clearButton.addEventListener("click", () => {
    cart=[];
    totalPrice=0;
    localStorage.setItem("totalPrice",0);
    localStorage.setItem("cart",[]);
    refreshUI()
  });
  
  cart.forEach((item, index) => {
    const listElement = document.createElement("li")
    listElement.classList.add("list-group-item", "d-flex", "justify-content-between")
    const textNode = document.createTextNode(`${item.name} - $${item.price}`);
    listElement.appendChild(textNode);
    itemsList.appendChild(listElement);

    const deleteButton = document.createElement("button");
    const deleteButtonText = document.createTextNode("Remove");
    deleteButton.appendChild(deleteButtonText);
    deleteButton.classList.add("btn", "btn-danger")
    listElement.append(deleteButton)

    deleteButton.addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart",JSON.stringify(cart));
      totalPrice -= item.price;
      localStorage.setItem("totalPrice",totalPrice);
      refreshUI()
    });
  })
}
refreshUI();
function addItem(form) {
  const itemName = form.itemName.value;
  const itemPrice = form.itemPrice.value;

  totalPrice += parseInt(itemPrice);
  const item = new Item(itemName, parseInt(itemPrice));
  cart.push(item);

  localStorage.setItem("cart",JSON.stringify(cart))
  localStorage.setItem("totalPrice",totalPrice);
  refreshUI()
  return false
}