let products = [];

export function load() {
  products = JSON.parse(localStorage.getItem('products') || '[]');
  return products;
}

export function save(products) {
  localStorage.setItem('products', JSON.stringify(products));
}