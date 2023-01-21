import { FormEvent } from 'react';
import { bodyData, LineItem } from '../@types/index';

export function formatPrice(price: number) {
  return String(price).replaceAll('.', ',');
}

function Body(props: bodyData) {
  const currencyName = 'EUR';
  const vatValue = 19;

  function sum(items: LineItem[]): number {
    const total = items.reduce((acc, currentValue) => acc + currentValue.price, 0);
    return Math.round(total * 100) / 100;
  }

  function calcVAT(total: number, vat: number = vatValue): number {
    return Math.round(total * vat) / 100;
  }

  function handleInputPrice(ev: FormEvent<HTMLInputElement>) {
    const numberRegExp = new RegExp(/^(\d+,+){2,}$/gm);
    const match = numberRegExp.test(ev.currentTarget.value);

    if (match) {
      ev.preventDefault();
    }
  }

  function handleChangePrice(ev: FormEvent<HTMLInputElement>, item: LineItem, index: number) {
    const inputNumber = ev.currentTarget.value;
    const formatted = Number(inputNumber.replaceAll(',', '.'));

    props.changePrice(
      {
        ...item,
        price: Number.isNaN(formatted) ? 0 : formatted,
      },
      index
    );
  }

  const listItemIndex = props.lineItems.length - 1;
  function getItemClassName(index: number): string {
    const initialItemClassName = 'invoice-box__table-item';
    return index === listItemIndex ? `${initialItemClassName} ${initialItemClassName}--last` : initialItemClassName;
  }

  const listItems = (props.lineItems || []).map((item: LineItem, index: number) => {
    return (
      <tr className={getItemClassName(index)} key={index} data-testid="list-item">
        <td>{item.description}</td>
        <td>{formatPrice(item.price)} {currencyName}</td>
      </tr>
    );
  });

  const editableListItems = (props.lineItems || []).map((item: LineItem, index: number) =>
    <tr className={getItemClassName(index)} key={index} data-testid="list-item-editable">
      <td>
        <input
          className="invoice-box__table-input"
          data-testid="list-item-description-editable"
          type="text"
          value={item.description}
          onChange={(ev: FormEvent<HTMLInputElement>) => {
            props.changeDescription(
              {
                ...item,
                description: ev.currentTarget.value,
              },
              index
            );
          }}
        />
      </td>
      <td>
      <input
          data-testid="list-item-price-editable"
          type="text"
          value={formatPrice(item.price)}
          onBeforeInput={(ev: FormEvent<HTMLInputElement>) => { handleInputPrice(ev) }}
          onChange={(ev: FormEvent<HTMLInputElement>) => {
            handleChangePrice(ev, item, index);
          }}
        />
        {currencyName}
      </td>
    </tr>
  );

  let total = 0;
  if (props.lineItems) {
    total = sum(props.lineItems);
  }

  return (
    <table cellPadding="0" cellSpacing="0" className="invoice-box__table">
      <tbody>
        <tr className="invoice-box__table-heading">
          <td>Item</td>
          <td>Price</td>
        </tr>

        {props.isEditable ? editableListItems : listItems}

        <tr className="invoice-box__table-total">
          <td></td>
          <td data-testid="total">Total: {formatPrice(total)} {currencyName}</td>
        </tr>
        <tr className="invoice-box__table-vat">
          <td></td>
          <td data-testid="vat">VAT ({vatValue}%): {formatPrice(calcVAT(total))} {currencyName}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Body;
