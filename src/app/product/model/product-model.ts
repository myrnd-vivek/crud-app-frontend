interface Product {
  _id: string;
  name: string;
  price: string;
  createAT: string;
  company: string;
  imageUrl: string;
}

interface ProductDeleteInfo {
  msg: string
}

export { Product,ProductDeleteInfo };
