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

export interface BodyData extends EditableLineItemsData {
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
}

export interface EditableLineItemsData extends LineItemsData {
  changeDescription(item: LineItem, index: number): void;
  changePrice(item: LineItem, index: number): void;
}
