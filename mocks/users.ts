export interface User {
  id: string;
  email: string;
  name: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
  }
];

export const mockOrders = [
  {
    id: "order1",
    userId: "1",
    date: new Date(2023, 5, 15).toISOString(),
    items: [
      { productId: "3", quantity: 1 },
      { productId: "7", quantity: 2 }
    ],
    total: 847,
    status: "Delivered"
  },
  {
    id: "order2",
    userId: "1",
    date: new Date(2023, 6, 22).toISOString(),
    items: [
      { productId: "5", quantity: 1 }
    ],
    total: 299,
    status: "Processing"
  }
];