export interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: string;
}
  
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

export interface Greeting {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}
  