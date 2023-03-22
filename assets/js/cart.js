var shoppingCart = (function() {

  cart = [];

  function Item(name, price,poster, count) {
    this.name = name;
    this.price = price;
    this.count = count;
    this.poster = poster;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }

  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  


  
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price,poster, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price,poster, count);
    cart.push(item);
    saveCart();
  }

  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };

  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }else{
        console.log('elsed');
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
  console.log('something');
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  var poster = $(this).data('poster')
  shoppingCart.addItemToCart(name, price,poster, 1);
  alert("Item added to cart successfully.")
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  
  var output = "";
  for(var i in cartArray) {

    output += `<div class="cartItem row align-items-center p-2 mb-3">
    <div class="col-3 p-0 d-none d-md-block">
      <img class="w-100 rounded" src="${cartArray[i].poster}" alt="art image">
    </div>
    <div class="col-5 col-md-5">
      <p class="pl-1 m-0 font-weight-bold text-center cart-item-title">${cartArray[i].name}</p>
    </div>
    <div class="col-4 col-md-2 d-flex align-items-center gap-2">
      <button class='minus-item input-group-addon' data-name="${cartArray[i].name}">-</button>
      <p class="cartItemQuantity p-1 text-center">${cartArray[i].count}</p>
      <button class='plus-item input-group-addon' data-name="${cartArray[i].name}">+</button>
      <button class='delete-item input-group-addon' data-name="${cartArray[i].name}">X</button></td>
    </div>
    <div class="col-3 col-md-2">
      <p id="cartItem1Price" class="text-end">₹ ${cartArray[i].price * cartArray[i].count}</p>
    </div>
  </div>`
   
    // output += "<tr>"
    //   + "<td>" + cartArray[i].name + "</td>" 
    //   + "<td>(" + cartArray[i].price + ")</td>"
    //   + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
    //   + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
    //   + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
    //   + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
    //   + " = " 
    //   + "<td>" + cartArray[i].total + "</td>" 
    //   +  "</tr>";
  }
  console.log(output);
  $('.show-cart').html(output);
  $('.subtotal-cart').html('₹ '+shoppingCart.totalCart());
  $('.tax-cart').html('₹ '+(shoppingCart.totalCart()*.18).toFixed(2));
  $('.total-cart').html('₹ '+(shoppingCart.totalCart()*.18 + shoppingCart.totalCart()));
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  event.preventDefault();
  var name = $(this).data('name')
  console.log(name);
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

// displayCart();