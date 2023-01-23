import LineItems from './lineItems';
import EditableLineItems from './editableLineItems';
import { BodyData } from '../@types/index';
import { currencyName, vatValue, sum, calcVAT, formatPrice } from '../utils/index';
import '../styles/components/body.scss';

function Body(props: BodyData) {
  let total = 0;
  if (props.lineItems.length) {
    total = sum(props.lineItems);
  }

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      className="invoice-box__body"
      data-testid="invoice-body"
    >
      <tbody>
        <tr className="invoice-box__body-heading">
          <td>Item</td>
          <td>Price</td>
        </tr>

        {props.isEditable ?
          <EditableLineItems
            lineItems={props.lineItems}
            changeDescription={props.changeDescription}
            changePrice={props.changePrice}
          /> :
          <LineItems lineItems={props.lineItems}/>
        }

        <tr className="invoice-box__body-total">
          <td></td>
          <td data-testid="total">Total: {formatPrice(total)} {currencyName}</td>
        </tr>
        <tr className="invoice-box__body-vat">
          <td></td>
          <td data-testid="vat">VAT ({vatValue}%): {formatPrice(calcVAT(total))} {currencyName}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Body;
