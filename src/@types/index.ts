export interface LineItem {
  id: number;
  description: string;
  price: number;
}

export interface InvoiceJSON {
  id: string;
  email: string;
  fullName: string;
  company: string;
  createdAt: string;
  dueAt: string;

  lineItems: LineItem[];
}

type isEditable = {
  isEditable: boolean;
}

export type bodyData = isEditable & {
  lineItems: LineItem[] | [];
  changeDescription(item: LineItem): void;
  changePrice(item: LineItem): void;
};

export enum ReducerActionType {
  DESCRIPTION_CHANGED,
  PRICE_CHANGED,
  INITIALIZE_CARD,
}

export interface ReducerAction {
  type: ReducerActionType;
  item: LineItem;
  payload?: LineItem[];
}
