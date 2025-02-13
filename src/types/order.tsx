export interface Order {
    id: string
    totalPrice: number
    status: string
    orderItems: {
      id: string
      quantity: number
      price: number
      product: {
        id: string
        name: string
      }
    }[]
  }
  

  export interface Order {
    id: string;
    userId: string;
    totalPrice: number;
    status: string;
    createdAt: Date;
    orderItems: OrderItem[];
  }
  
  export interface OrderItem {
    id: string;
    code: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    // product: Product;
  }
  