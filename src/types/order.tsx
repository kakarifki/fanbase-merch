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
  