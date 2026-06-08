function formatPrice(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(value);
}

function getCurrentUser() {
  return getSession();
}

function updateMenuByRole() {
  const user = getCurrentUser();
  const guestItems = document.querySelectorAll("[data-guest-only]");
  const authItems = document.querySelectorAll("[data-auth-only]");
  const adminItems = document.querySelectorAll("[data-role='Admin']");
  const clientItems = document.querySelectorAll("[data-role='Cliente']");
  const userLabel = document.querySelector("[data-user-label]");

  guestItems.forEach((item) => item.classList.toggle("d-none", Boolean(user)));
  authItems.forEach((item) => item.classList.toggle("d-none", !user));
  adminItems.forEach((item) => item.classList.toggle("d-none", !user || user.role !== "Admin"));
  clientItems.forEach((item) => item.classList.toggle("d-none", !user || user.role !== "Cliente"));

  if (userLabel) {
    userLabel.textContent = user ? `${user.name} · ${user.role}` : "Invitado";
  }
}

function renderCatalog() {
  const container = document.querySelector("[data-catalog]");
  if (!container) return;

  const products = getProducts();
  container.innerHTML = products.map((product, index) => `
    <article class="col-sm-6 col-lg-4 reveal reveal-delay-${index % 3}">
      <div class="product-card h-100">
        <img src="${product.image}" alt="${product.name}">
        <div class="d-flex justify-content-between align-items-start gap-3 mb-2">
          <div>
            <span class="eyebrow">${product.category}</span>
            <h3 class="h4 mt-2 mb-1">${product.name}</h3>
          </div>
          <span class="badge-role">${product.players}</span>
        </div>
        <p>${product.description}</p>
        <div class="d-flex justify-content-between align-items-center mt-4">
          <span class="price-tag">${formatPrice(product.price)}</span>
          <button class="btn btn-warm" data-add-cart="${product.id}">Agregar</button>
        </div>
      </div>
    </article>
  `).join("");
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((item) => {
    item.textContent = count;
  });
}

function addToCart(productId) {
  const user = getCurrentUser();

  if (!user || user.role !== "Cliente") {
    window.location.href = "pages/login.html";
    return;
  }

  const cart = getCart();
  const existing = cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

function bindCatalogActions() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-add-cart]");
    if (!trigger) return;

    addToCart(Number(trigger.dataset.addCart));
  });
}

function renderCart() {
  const container = document.querySelector("[data-cart-items]");
  const summary = document.querySelector("[data-cart-summary]");
  if (!container || !summary) return;

  const cart = getCart();
  const products = getProducts();

  if (!cart.length) {
    container.innerHTML = '<div class="empty-state">Tu carrito esta vacio. Explora el catalogo y agrega tu proxima mesa de juego.</div>';
    summary.innerHTML = `<p class="mb-0">Subtotal: <strong>${formatPrice(0)}</strong></p>`;
    return;
  }

  const items = cart.map((entry) => {
    const product = products.find((item) => item.id === entry.productId);
    if (!product) return null;
    return { ...entry, product, total: product.price * entry.quantity };
  }).filter(Boolean);

  if (!items.length) {
    saveCart([]);
    container.innerHTML = '<div class="empty-state">Tu carrito esta vacio.</div>';
    summary.innerHTML = `<p class="mb-0">Subtotal: <strong>${formatPrice(0)}</strong></p>`;
    return;
  }

  container.innerHTML = items.map((item) => `
    <div class="cart-item d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
      <div>
        <h3 class="h5 mb-1">${item.product.name}</h3>
        <p class="mb-1">${item.product.description}</p>
        <span class="badge-role">Cantidad: ${item.quantity}</span>
      </div>
      <div class="text-md-end">
        <p class="price-tag mb-2">${formatPrice(item.total)}</p>
        <button class="btn btn-outline-warm btn-sm" data-remove-cart="${item.productId}">Quitar</button>
      </div>
    </div>
  `).join("");

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  summary.innerHTML = `
    <p class="mb-2">Subtotal: <strong>${formatPrice(subtotal)}</strong></p>
    <p class="mb-3">Despacho: <strong>${formatPrice(0)}</strong></p>
    <a class="btn btn-warm w-100" href="checkout.html">Confirmar compra</a>
  `;
}

function bindCartActions() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-remove-cart]");
    if (!trigger) return;

    const productId = Number(trigger.dataset.removeCart);
    const nextCart = getCart().filter((item) => item.productId !== productId);
    saveCart(nextCart);
    renderCart();
    updateCartCount();
  });
}

function getProductFormData(form) {
  return {
    name: form.name.value.trim(),
    category: form.category.value.trim(),
    players: form.players.value.trim(),
    price: Number(form.price.value),
    image: form.image.value.trim(),
    description: form.description.value.trim()
  };
}

function validateProductForm(form) {
  const notice = document.querySelector("[data-admin-notice]");
  const data = getProductFormData(form);

  if (notice) {
    notice.textContent = "";
    notice.className = "notice d-none";
  }

  if (Object.values(data).some((value) => value === "" || Number.isNaN(value))) {
    if (notice) {
      notice.textContent = "Completa todos los campos del producto.";
      notice.className = "notice mt-3 text-danger";
    }
    return null;
  }

  if (data.price <= 0) {
    if (notice) {
      notice.textContent = "Ingresa un precio valido.";
      notice.className = "notice mt-3 text-danger";
    }
    return null;
  }

  try {
    new URL(data.image);
  } catch (error) {
    if (notice) {
      notice.textContent = "Ingresa una URL de imagen valida.";
      notice.className = "notice mt-3 text-danger";
    }
    return null;
  }

  return data;
}

function resetAdminForm() {
  const form = document.querySelector("[data-admin-form]");
  const title = document.querySelector("[data-admin-form-title]");
  const submit = document.querySelector("[data-admin-submit]");
  const cancel = document.querySelector("[data-admin-cancel]");
  const notice = document.querySelector("[data-admin-notice]");
  if (!form) return;

  form.reset();
  form.dataset.editingId = "";

  if (title) title.textContent = "Agregar producto";
  if (submit) submit.textContent = "Guardar producto";
  if (cancel) cancel.classList.add("d-none");
  if (notice) {
    notice.textContent = "";
    notice.className = "notice d-none";
  }
}

function fillAdminForm(productId) {
  const form = document.querySelector("[data-admin-form]");
  const product = getProducts().find((item) => item.id === productId);
  const title = document.querySelector("[data-admin-form-title]");
  const submit = document.querySelector("[data-admin-submit]");
  const cancel = document.querySelector("[data-admin-cancel]");
  if (!form || !product) return;

  form.dataset.editingId = String(product.id);
  form.name.value = product.name;
  form.category.value = product.category;
  form.players.value = product.players;
  form.price.value = product.price;
  form.image.value = product.image;
  form.description.value = product.description;

  if (title) title.textContent = "Editar producto";
  if (submit) submit.textContent = "Actualizar producto";
  if (cancel) cancel.classList.remove("d-none");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function requireRole(role) {
  const currentPage = document.body.dataset.page;
  const session = getCurrentUser();

  if (!currentPage) return;

  const protectedPages = {
    profile: ["Cliente", "Admin"],
    cart: ["Cliente"],
    checkout: ["Cliente"],
    admin: ["Admin"]
  };

  if (!protectedPages[currentPage]) return;

  if (!session || !protectedPages[currentPage].includes(session.role)) {
    window.location.href = currentPage === "admin" ? "login.html" : "../index.html";
  }
}

function fillProfileForm() {
  const form = document.querySelector("[data-auth-form='profile']");
  const session = getCurrentUser();
  if (!form || !session) return;

  form.name.value = session.name || "";
  form.email.value = session.email || "";
  form.phone.value = session.phone || "";
  form.city.value = session.city || "";
}

function renderAdmin() {
  const productsTarget = document.querySelector("[data-admin-products]");
  const usersTarget = document.querySelector("[data-admin-users]");
  if (!productsTarget || !usersTarget) return;

  productsTarget.innerHTML = getProducts().map((product) => `
    <tr>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.players}</td>
      <td>${formatPrice(product.price)}</td>
      <td class="text-end">
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-outline-warm btn-sm" data-edit-product="${product.id}">Editar</button>
          <button class="btn btn-soft btn-sm" data-delete-product="${product.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join("");

  usersTarget.innerHTML = getUsers().map((user) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone || "-"}</td>
      <td><span class="badge-role">${user.role}</span></td>
    </tr>
  `).join("");
}

function bindAdminActions() {
  const form = document.querySelector("[data-admin-form]");
  const cancel = document.querySelector("[data-admin-cancel]");
  const notice = document.querySelector("[data-admin-notice]");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = validateProductForm(form);
      if (!data) return;

      const editingId = Number(form.dataset.editingId);

      if (editingId) {
        updateProduct(editingId, data);
        if (notice) {
          notice.textContent = "Producto actualizado.";
          notice.className = "notice mt-3 text-success";
        }
      } else {
        addProduct(data);
        if (notice) {
          notice.textContent = "Producto agregado.";
          notice.className = "notice mt-3 text-success";
        }
      }

      renderAdmin();
      renderCatalog();
      form.reset();
      form.dataset.editingId = "";
      const title = document.querySelector("[data-admin-form-title]");
      const submit = document.querySelector("[data-admin-submit]");
      if (title) title.textContent = "Agregar producto";
      if (submit) submit.textContent = "Guardar producto";
      if (cancel) cancel.classList.add("d-none");
    });
  }

  if (cancel) {
    cancel.addEventListener("click", () => {
      resetAdminForm();
    });
  }

  document.addEventListener("click", (event) => {
    const editTrigger = event.target.closest("[data-edit-product]");
    const deleteTrigger = event.target.closest("[data-delete-product]");

    if (editTrigger) {
      fillAdminForm(Number(editTrigger.dataset.editProduct));
    }

    if (deleteTrigger) {
      deleteProduct(Number(deleteTrigger.dataset.deleteProduct));
      renderAdmin();
      renderCatalog();
      resetAdminForm();
    }
  });
}

function handleCheckout() {
  const button = document.querySelector("[data-complete-order]");
  const message = document.querySelector("[data-checkout-message]");
  if (!button || !message) return;

  button.addEventListener("click", () => {
    const cart = getCart();
    if (!cart.length) {
      message.textContent = "Tu carrito esta vacio. Agrega productos antes de pagar.";
      message.className = "notice mt-3 text-danger";
      return;
    }

    const orders = getOrders();
    orders.push({
      id: Date.now(),
      userId: getCurrentUser().id,
      createdAt: new Date().toISOString(),
      items: cart
    });
    saveOrders(orders);
    saveCart([]);
    updateCartCount();
    message.textContent = "Pago simulado con exito. Tu pedido ya quedo registrado.";
    message.className = "notice mt-3 text-success";
  });
}

function bindLogout() {
  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      clearSession();
      window.location.href = button.dataset.logout;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  requireRole();
  updateMenuByRole();
  renderCatalog();
  updateCartCount();
  bindCatalogActions();
  renderCart();
  bindCartActions();
  fillProfileForm();
  renderAdmin();
  bindAdminActions();
  handleCheckout();
  bindLogout();
});
