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
    } else if (clickAction === 'increase-cart-item-quantity') {
      event.preventDefault();
      updateCartItemQuantity(element);
      break;
    } else if (clickAction === 'decrease-cart-item-quantity') {
      event.preventDefault();
      updateCartItemQuantity(element);
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
      updateCartNote();
      break;
    }
  }
});

// Fonction de log du panier dans la console
async function logCart() {}

// Fonction d'ajout d'un produit au panier
async function addToCart(element) {}

// Fonction de mise à jour de la quantité d'un produit dans le panier
async function updateCartItemQuantity(element) {}

// Fonction de suppression du panier
async function clearCart() {}

// Fonction d'ajout d'un attribut au panier
async function addCartAttribute(element) {}

// Fonction de mise à jour de la note du panier
async function updateCartNote(element) {}
