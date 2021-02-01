/**
 * Roberto Sanchez, sanc735@usc.edu
 *
 * Script listens for updates to cart
 * updates the cart item list and total
 *
 */

/**
 * Cart state - keeps track of total
 * and items in cart
 */
var cartState = {
  subTotal: 0,
  items: [],
};

// store items
var store = [
  {
    id: "fett",
    name: "Boba Fett",
    price: 10,
    src: "./assets/fett.jpg",
  },
  {
    id: "spongebob",
    name: "Songebob",
    price: 8,
    src: "./assets/spongebob.jpg",
  },
  {
    id: "grogu",
    name: "Grogu",
    price: 12,
    src: "./assets/grogu.jpg",
  },
  {
    id: "imposter",
    name: "Imposter",
    price: 9,
    src: "./assets/imposter.jpg",
  },
  {
    id: "spiderman",
    name: "Spiderman",
    price: 6,
    src: "./assets/spiderman.jpg",
  },
  {
    id: "undertaker",
    name: "Undertaker",
    price: 25,
    src: "./assets/undertaker.jpg",
  },
];

/**
 * filters through cartState.items and only returns
 * items that do not match the id param
 * cartState.items is then updated
 * @param {string} item  sock menu item
 */
function removeItem(id) {
  const updatedItems = cartState.items.filter((item) => item.id != id); // return items that do match the id
  cartState.items = updatedItems; // update our cart items - item was removed
  updateCartGui(); // update gui
}

/**
 * Updates the user view with updated
 * cart values
 */
function updateCartGui() {
  cartState.subTotal = 0; // reset sub total counter
  const orderWrapper = document.getElementById("order-wrapper"); // get wrapper element that holds our cart items
  orderWrapper.innerHTML = ""; // clear out all item from wrapper

  /*
   * If cart has item update element and values
   * otherwise just show empty cart placeholder html
   */
  if (cartState.items.length > 0) {
    const orderWrapper = document.getElementById("order-wrapper");
    orderWrapper.innerHTML = "";

    // iterate through cart items to perform html updates
    cartState.items.forEach((item) => {
      cartState.subTotal += item.total; // update subtotal

      const itemWrapper = document.createElement("div"); // create div to hold our item details
      itemWrapper.className = "order-item";

      const itemQuantity = document.createElement("div"); // div to display item quantity
      itemQuantity.className = "item-num";
      itemQuantity.innerHTML = `${item.quantity}`;

      const itemName = document.createElement("div"); // div to display item name
      itemName.className = "item-name";
      itemName.innerHTML = `${item.name}`;

      const itemTotal = document.createElement("div"); // div to display item total
      itemTotal.innerHTML = `$ ${item.total}`;

      const removeBtn = document.createElement("button"); // create button to remove item on click
      removeBtn.innerHTML = "Remove";
      removeBtn.id = item.id;
      removeBtn.className = "remove-btn";

      /**
       * add event listerner to button
       * Will call removeItem function that
       * removes item from list using its id
       */
      removeBtn.addEventListener("click", () => {
        removeItem(item.id); // pass item id in order to remove it from list
      });

      // append all HTML
      itemName.append(removeBtn);
      itemWrapper.append(itemQuantity);
      itemWrapper.append(itemName);
      itemWrapper.append(itemTotal);
      orderWrapper.append(itemWrapper);
    });
  } else {
    const empty = document.createElement("div"); // div to display item quantity
    empty.className = "empty-order";
    empty.innerHTML = `Nothing Here Yet`;
    orderWrapper.append(empty);
  }

  // update order total
  const totalContainer = document.getElementById("total-container"); // gets total container element
  totalContainer.innerHTML = `$${cartState.subTotal}`; // overwrite previous value with new total
}

/**
 * Listens for clicks on store items
 * uses item id parameter to filter through
 * store array to find the matching item
 * and push it into the cartState.items array
 * @param {string} id sock item id
 */
function addToCart(id) {
  // proceed if id is not null
  if (id != null) {
    const selectedItem = store.find((item) => item.id === id); // iterates through store array and returns match
    const alreadyInCart = cartState.items.find((item) => item.id === id); // iterates through cart items array and returns match

    /**
     * If item is already in the cart
     * we want to update the quantity for the item
     * otherwise we just push the item into the cartState
     * with quantity of one
     */
    if (alreadyInCart) {
      cartState.items.forEach((item) => {
        if (item.id === id) {
          item.quantity++;
          item.total = item.price * item.quantity;
        }
      });
      updateCartGui();
    } else {
      selectedItem.quantity = 1; // since its not in cart, starting quantity will always be 1
      selectedItem.total = selectedItem.price * selectedItem.quantity; // get total for item
      cartState.items.push(selectedItem); // push item to cart.items list
      updateCartGui();
    }
  }
}
