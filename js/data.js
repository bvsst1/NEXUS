const STORAGE_KEYS = {
  products: "nexus_products",
  users: "nexus_users",
  session: "nexus_session",
  cart: "nexus_cart",
  orders: "nexus_orders"
};

const seedProducts = [
  {
    id: 1,
    name: "Catan Aurora",
    category: "Estrategia",
    players: "3-4 jugadores",
    price: 34990,
    image: "https://images.unsplash.com/photo-1606503153255-59d8b8b15287?auto=format&fit=crop&w=900&q=80",
    description: "Coloniza, negocia y construye una tarde memorable alrededor de la mesa."
  },
  {
    id: 2,
    name: "Azul Atelier",
    category: "Familiar",
    players: "2-4 jugadores",
    price: 28990,
    image: "https://images.unsplash.com/photo-1632507127781-1a7d0df50e4c?auto=format&fit=crop&w=900&q=80",
    description: "Patrones elegantes y decisiones simples que esconden mucha profundidad."
  },
  {
    id: 3,
    name: "Ticket to Ride Norte",
    category: "Aventura",
    players: "2-5 jugadores",
    price: 31990,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=900&q=80",
    description: "Conecta ciudades y crea rutas inolvidables con una curva de entrada amable."
  },
  {
    id: 4,
    name: "Wingspan Bosque",
    category: "Engine building",
    players: "1-5 jugadores",
    price: 42990,
    image: "https://images.unsplash.com/photo-1518131678677-a50a0fdaf634?auto=format&fit=crop&w=900&q=80",
    description: "Una experiencia serena, táctica y bellamente ilustrada para jugar sin prisa."
  },
  {
    id: 5,
    name: "Dixit Bruma",
    category: "Creativo",
    players: "3-6 jugadores",
    price: 25990,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    description: "Imaginación, conversación y cartas sugerentes para grupos amplios."
  },
  {
    id: 6,
    name: "Carcassonne Campo",
    category: "Clásico",
    players: "2-5 jugadores",
    price: 27990,
    image: "https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=900&q=80",
    description: "Coloca losetas, levanta ciudades y disfruta un ritmo relajado pero competitivo."
  }
];

const seedUsers = [
  {
    id: 1,
    name: "Admin Nexus",
    email: "admin@nexus.cl",
    password: "Admin@123",
    role: "Admin",
    phone: "+56911112222",
    city: "Santiago"
  },
  {
    id: 2,
    name: "Cliente Demo",
    email: "cliente@nexus.cl",
    password: "Cliente@123",
    role: "Cliente",
    phone: "+56933334444",
    city: "Valparaiso"
  }
];

function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(seedProducts));
  }

  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(seedUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.cart)) {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.orders)) {
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify([]));
  }
}

function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.products) || "[]");
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
}

function addProduct(product) {
  const products = getProducts();
  const newProduct = {
    id: Date.now(),
    ...product
  };

  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

function updateProduct(productId, productData) {
  const products = getProducts();
  const index = products.findIndex((item) => item.id === productId);

  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...productData,
    id: productId
  };

  saveProducts(products);
  return products[index];
}

function deleteProduct(productId) {
  const products = getProducts().filter((item) => item.id !== productId);
  saveProducts(products);

  const cart = getCart().filter((item) => item.productId !== productId);
  saveCart(cart);
}

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getSession() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || "null");
}

function setSession(user) {
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
}

function getOrders() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.orders) || "[]");
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
}
