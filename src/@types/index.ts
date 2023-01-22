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

type isEditable = {
  isEditable: boolean;
}

export type bodyData = isEditable & {
  lineItems: LineItem[] | [];
  changeDescription(item: LineItem, index: number): void;
  changePrice(item: LineItem, index: number): void;
};

export enum ReducerActionType {
  DESCRIPTION_CHANGED,
  PRICE_CHANGED,
  INITIALIZE_CARD,
}

export interface ReducerAction {
  type: ReducerActionType;
  item: LineItem;
  index: number;
  payload?: LineItem[];
}

export type onDropEvent = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void;

export interface dropzoneProps {
  isDropSucceded: boolean;
  resetDropState(): void;
  onDrop: onDropEvent;
}
