import { LineItem, LineItemsData } from '../@types/index';
import { currencyName, formatPrice, getItemClassName } from '../utils/index';

function LineItems(props: LineItemsData) {
  const lastItemIndex = props.lineItems.length - 1;

  const lineItems = props.lineItems.map((item: LineItem, index: number) => {
    return (
      <tr className={getItemClassName(lastItemIndex, index)} key={index} data-testid="line-item">
        <td data-testid="line-item-description">{item.description}</td>
        <td data-testid="line-item-price">{formatPrice(item.price)} {currencyName}</td>
      </tr>
    );
  });

  return (
    <>
      {lineItems}
    </>
  );
}

export default LineItems;
