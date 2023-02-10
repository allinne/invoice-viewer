import LineItems from './lineItems';
import EditableLineItems from './editableLineItems';
import { withLineItems } from '../HOC/withLineItems';
import { TableData } from '../@types/index';
import { currencyName, vatValue, sum, calcVAT, formatPrice } from '../utils/index';
import '../styles/components/body.scss';

const EditableLineItemsComponent = withLineItems(EditableLineItems);
const LineItemsComponent = withLineItems(LineItems);

function Table(props: TableData) {
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
          <EditableLineItemsComponent
            lineItems={props.lineItems}
            changeInput={props.changeInput}
          /> :
          <LineItemsComponent
            lineItems={props.lineItems}
            changeInput={props.changeInput}
          />
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

export default Table;
