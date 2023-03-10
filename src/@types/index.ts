import { FileRejection, DropEvent } from "react-dropzone";

export interface LineItem {
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

export interface BodyData {
  data: InvoiceJSON;
  updateData(data: InvoiceJSON): void;
  dispatch: React.Dispatch<ReducerAction>;
}

export interface TableData extends LineItemsData {
  isEditable: boolean;
}

export enum ReducerActionType {
  DESCRIPTION_CHANGED,
  PRICE_CHANGED,
  INITIALIZE_CARD,
}

export interface ReducerAction {
  type: ReducerActionType;
  item?: LineItem;
  index?: number;
  data: InvoiceJSON;
}

export type onDropEvent = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void;

export interface DropzoneProps {
  isDropSucceded: boolean;
  isDropFailed: boolean;
  resetDropState(): void;
  onDrop: onDropEvent;
}

export interface LineItemsData {
  lineItems: LineItem[];
  changeInput(type: ReducerActionType.DESCRIPTION_CHANGED | ReducerActionType.PRICE_CHANGED, item: LineItem, index: number): void;
}

export type LineItemPropFunc = (item: LineItem, index: number) => JSX.Element | string;

export interface WithLineItemsData extends LineItemsData {
  createLineItems(description: LineItemPropFunc, priceInput: LineItemPropFunc): JSX.Element;
}
