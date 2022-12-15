import { v4 as uuidv4 } from 'uuid';

  export interface IBasketItem {
      id: number;
      productName: string;
      price: number;
      quantity: number;
      pictureUrl: string;
      brand: string;
      type: string;
  }

  export interface IBasket {
      id: string;
      items: IBasket[];
  }


  export class Basket implements IBasket{
    id: uuidv4
    items: IBasket[];

  }


