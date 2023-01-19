import { invoiceJSON, lineitem } from '../../@types/index';

export function formatPrice(price: number) {
  return String(price).replaceAll('.', ',');
}

export default function Body(props: invoiceJSON) {
  const currencyName = 'EUR';
  const vatValue = 19;

  function sum(items: lineitem[]): number {
    return items.reduce((acc, currentValue) => acc + currentValue.price, 0);
  }

  function calcVAT(total: number, vat: number = vatValue): number {
    return Math.round(total * vat) / 100;
  }

  const listItems = props.lineItems.map((item: lineitem, index: number) =>
    <tr className="item last" key={index} data-testid="list-item">
      <td>{item.description}</td>
      <td>{formatPrice(item.price)} {currencyName}</td>
    </tr>
  );

  const total = sum(props.lineItems);

  return (
    <>
    {listItems}

    <tr className="total">
      <td></td>

      <td data-testid="total">Total: {formatPrice(total)} {currencyName}</td>
    </tr>
    <tr className="vat">
      <td></td>
      <td data-testid="vat">VAT ({vatValue}%): {formatPrice(calcVAT(total))} {currencyName}</td>
    </tr>
    </>
  );
}
