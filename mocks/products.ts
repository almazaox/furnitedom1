export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  type: string;
  rating: number;
  imageURL: string;
  purchaseCount: number;
  description: string;
  inStock: boolean;
}

export const productTypes = [
  "Sofas",
  "Chairs",
  "Tables",
  "Beds",
  "Cabinets",
  "Desks",
  "Bookshelves",
  "Wardrobes",
  "Lighting",
  "Decor"
];

export const products: Product[] = [
  {
    id: "1",
    name: "Modern Leather Sofa",
    price: 1299,
    type: "Sofas",
    rating: 4.8,
    imageURL: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    purchaseCount: 124,
    description: "This modern leather sofa combines comfort and style with premium materials. Perfect for contemporary living rooms and offices.",
    inStock: true
  },
  {
    id: "2",
    name: "Scandinavian Dining Table",
    price: 849,
    oldPrice: 999,
    type: "Tables",
    rating: 4.6,
    imageURL: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    purchaseCount: 87,
    description: "Minimalist Scandinavian design dining table made from solid oak. Seats up to 6 people comfortably.",
    inStock: true
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    price: 349,
    oldPrice: 429,
    type: "Chairs",
    rating: 4.7,
    imageURL: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    purchaseCount: 215,
    description: "Ergonomic office chair with adjustable height, lumbar support, and breathable mesh back. Designed for long hours of comfortable sitting.",
    inStock: true
  },
  {
    id: "4",
    name: "King Size Platform Bed",
    price: 899,
    type: "Beds",
    rating: 4.5,
    imageURL: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    purchaseCount: 63,
    description: "Modern king size platform bed with wooden frame and upholstered headboard. No box spring needed.",
    inStock: true
  },
  {
    id: "5",
    name: "Minimalist Bookshelf",
    price: 299,
    oldPrice: 349,
    type: "Bookshelves",
    rating: 4.3,
    imageURL: "https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    purchaseCount: 92,
    description: "Minimalist 5-tier bookshelf with metal frame and wooden shelves. Perfect for displaying books and decorative items.",
    inStock: true
  },
  {
    id: "6",
    name: "Velvet Accent Chair",
    price: 449,
    type: "Chairs",
    rating: 4.4,
    imageURL: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    purchaseCount: 78,
    description: "Luxurious velvet accent chair with gold-finished metal legs. Adds a touch of elegance to any living space.",
    inStock: true
  },
  {
    id: "7",
    name: "Glass Coffee Table",
    price: 249,
    oldPrice: 299,
    type: "Tables",
    rating: 4.2,
    imageURL: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    purchaseCount: 105,
    description: "Modern coffee table with tempered glass top and metal frame. Features a lower shelf for additional storage.",
    inStock: true
  },
  {
    id: "8",
    name: "Wooden Wardrobe",
    price: 799,
    type: "Wardrobes",
    rating: 4.6,
    imageURL: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    purchaseCount: 42,
    description: "Spacious wooden wardrobe with hanging space, shelves, and drawers. Made from sustainable oak with a natural finish.",
    inStock: true
  },
  {
    id: "9",
    name: "Pendant Ceiling Light",
    price: 129,
    oldPrice: 159,
    type: "Lighting",
    rating: 4.5,
    imageURL: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    purchaseCount: 137,
    description: "Modern pendant ceiling light with adjustable height. Perfect for dining areas and kitchen islands.",
    inStock: true
  },
  {
    id: "10",
    name: "Standing Desk",
    price: 549,
    type: "Desks",
    rating: 4.7,
    imageURL: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    purchaseCount: 89,
    description: "Electric standing desk with height adjustment. Smooth and quiet motor with memory settings for different heights.",
    inStock: true
  },
  {
    id: "11",
    name: "Storage Cabinet",
    price: 399,
    oldPrice: 459,
    type: "Cabinets",
    rating: 4.3,
    imageURL: "https://images.unsplash.com/photo-1601760561441-16420502c7e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    purchaseCount: 67,
    description: "Versatile storage cabinet with adjustable shelves and doors. Perfect for living rooms, offices, or bedrooms.",
    inStock: true
  },
  {
    id: "12",
    name: "Wall Mirror",
    price: 179,
    type: "Decor",
    rating: 4.4,
    imageURL: "https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    purchaseCount: 112,
    description: "Round wall mirror with thin metal frame. Adds light and space to any room.",
    inStock: true
  }
];

export const promotions = products.filter(product => product.oldPrice !== undefined);