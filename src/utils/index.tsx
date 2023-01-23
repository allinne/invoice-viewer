import { format } from "date-fns";
import parseISO from 'date-fns/fp/parseISO';
import { InvoiceJSON, LineItem } from '../@types/index';

export const currencyName = 'EUR';
export const vatValue = 19;

export function validateJSON(data: InvoiceJSON): boolean {
  const isDataObject = typeof data === 'object' && data !== null;
  const hasBaseProps = 'id' in data &&
    'email' in data &&
    'fullName' in data &&
    'company' in data &&
    'createdAt' in data &&
    'dueAt' in data;

  let hasLineItems = false;
  if (data.lineItems?.length) {
    hasLineItems = data.lineItems.some((item: LineItem) => {
      return 'description' in item &&
        'price' in item;
    });
  }

  return isDataObject && hasBaseProps && hasLineItems;
}

export function getInvoiceNumber(invoiceId: string): string {
  const invoiceIdRegExp = new RegExp(/^(?:\w+-){4}(\w+)+$/gm);
  const match = invoiceIdRegExp.exec(invoiceId);
  return match ? match[1] : '';
}

export function formatDate(inputDate: string): string {
  if (inputDate === '') {
    return '';
  }

  const date = parseISO(inputDate);
  return format(date, "dd/MM/yyyy");
}

export function sum(items: LineItem[]): number {
  const total = items.reduce((acc, currentValue) => acc + currentValue.price, 0);
  return Math.round(total * 100) / 100;
}

export function calcVAT(total: number, vat: number = vatValue): number {
  return Math.round(total * vat) / 100;
}

export function formatPrice(price: number) {
  return String(price).replaceAll('.', ',');
}

export function getItemClassName(
  itemsLength: number,
  index: number,
  initialItemClassName = 'invoice-box__body-item'
): string {
  const lastItemIndex = itemsLength - 1;
  return index === lastItemIndex ? `${initialItemClassName} ${initialItemClassName}--last` : initialItemClassName;
}
