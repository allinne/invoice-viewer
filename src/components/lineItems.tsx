import { LineItem, WithLineItemsData } from '../@types/index';
import { formatPrice } from '../utils/index';

function LineItems(props: WithLineItemsData) {
  const descriptionInput = (item: LineItem) => {
    return item.description;
  };
  const priceInput = (item: LineItem) => {
    return formatPrice(item.price);
  };

  const lineItems = props.createLineItems(descriptionInput, priceInput);

  return (
    <>
      {lineItems}
    </>
  );
}

export default LineItems;
