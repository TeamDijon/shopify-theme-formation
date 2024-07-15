// Ajout des écouteurs d'événement
document.addEventListener('click', (event) => {
  const eventPath = event.composedPath ? event.composedPath().slice(0, -2) : [];

  for (const element of eventPath) {
    const clickAction = element.getAttribute('data-click-action');
    if (!clickAction) continue;

    if (clickAction === 'log-cart') {
      event.preventDefault();
      logCart();
      break;
    } else if (clickAction === 'add-to-cart') {
      event.preventDefault();
      addToCart(element);
      break;
    } else if (clickAction === 'increase-cart-item-quantity' || clickAction === 'decrease-cart-item-quantity') {
      event.preventDefault();
      const quantityInput = element.parentElement.querySelector('input');
      const newQuantity =
        element.getAttribute('data-click-action') === 'increase-cart-item-quantity'
          ? parseInt(quantityInput.value) + 1
          : Math.max(1, parseInt(quantityInput.value) - 1);
      quantityInput.value = newQuantity;

      quantityInput.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      break;
    } else if (clickAction === 'clear-cart') {
      event.preventDefault();
      clearCart();
      break;
    } else if (clickAction === 'add-cart-attribute') {
      event.preventDefault();
      addCartAttribute(element);
      break;
    } else if (clickAction === 'update-cart-note') {
      event.preventDefault();
      updateCartNote(element);
      break;
    }
  }
});

document.addEventListener('change', (event) => {
  const eventPath = event.composedPath ? event.composedPath().slice(0, -2) : [];

  for (const element of eventPath) {
    const changeAction = element.getAttribute('data-change-action');
    if (!changeAction) continue;

    if (changeAction === 'update-cart-item-quantity') {
      event.preventDefault();
      updateCartItemQuantity(element);
      break;
    }
  }
});

// Fonction de log du panier dans la console
async function logCart() {
  const cartJson = await fetch('/cart.js').then((response) => response.json());

  console.log(cartJson);
}

// Fonction d'ajout d'un produit au panier
async function addToCart(element) {
  const variantId = element?.getAttribute('data-variant-id');
  const quantity = 1;

  const addToCartBody = {
    items: [
      {
        id: variantId,
        quantity: quantity,
      },
    ],
  };

  const addToCartJson = await fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addToCartBody),
  }).then((response) => response.json());

  console.log(addToCartJson);
}

// Fonction de mise à jour de la quantité d'un produit dans le panier
async function updateCartItemQuantity(element) {
  const variantId = element.getAttribute('data-variant-id');
  const quantity = parseInt(element.value);

  const updateCartItemQuantityBody = {
    updates: {
      [variantId]: quantity,
    },
  };

  const updateCartItemQuantityJson = await fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateCartItemQuantityBody),
  }).then((response) => response.json());

  console.log(updateCartItemQuantityJson);
}

// Fonction de suppression du panier
async function clearCart() {
  const clearCartJson = await fetch('/cart/clear.js', {
    method: 'POST',
  }).then((response) => response.json());

  console.log(clearCartJson);
}

// Fonction d'ajout d'un attribut au panier
async function addCartAttribute(element) {
  const attributeNameInput = element.parentElement.querySelector('input[data-name]');
  const attributeValueInput = element.parentElement.querySelector('input[data-value]');
  const attributeName = attributeNameInput.value;
  const attributeValue = attributeValueInput.value;
  if (!attributeName || !attributeValue) return;

  const attributeBody = {
    attributes: {
      [attributeName]: attributeValue,
    },
  };

  const attributeJson = await fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attributeBody),
  }).then((response) => response.json());

  console.log(attributeJson);
}

// Fonction de mise à jour de la note du panier
async function updateCartNote(element) {
  const noteInput = element.parentElement.querySelector('input');
  const noteValue = noteInput.value;

  const noteBody = {
    note: noteValue,
  };

  const noteJson = await fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteBody),
  }).then((response) => response.json());

  console.log(noteJson);
}
