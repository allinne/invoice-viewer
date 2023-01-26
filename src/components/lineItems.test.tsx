import { cleanup, render, screen } from '@testing-library/react';
import { LineItem } from '../@types/index';
import { formatPrice } from '../utils/index';
import LineItems from "./lineItems";

describe('<LineItems />', () => {
  afterEach(cleanup);

  it('renders a component with an empty list', async () => {
    const data: LineItem | [] = [];

    render(
      <table>
        <tbody>
          <LineItems
            lineItems={data}
          />
        </tbody>
      </table>
    );

    expect(screen.queryAllByTestId('line-item').length).toStrictEqual(0);
  });

  it('renders a component with a list of 2 items', async () => {
    const firstItem: LineItem = { description: 'Test data 1', price: 55.0 };
    const data: LineItem[] = [
      firstItem,
      { description: 'Test data 2', price: 45.0 },
    ];

    render(
      <table>
        <tbody>
          <LineItems
            lineItems={data}
          />
        </tbody>
      </table>
    );

    const listItems = await screen.findAllByTestId('line-item');

    expect(screen.queryAllByTestId('line-item').length).toStrictEqual(2);
    expect(screen.queryAllByTestId('line-item-editable').length).toStrictEqual(0);
    expect(listItems[0].getAttribute('class')).toStrictEqual('invoice-box__body-item');
    expect(listItems[1].getAttribute('class')).toStrictEqual('invoice-box__body-item invoice-box__body-item--last');

    const firstItemElement = listItems[0].getElementsByTagName('td');
    expect(firstItemElement[0]).toHaveTextContent(firstItem.description);
    expect(firstItemElement[1]).toHaveTextContent(`${formatPrice(firstItem.price)} EUR`);
  });
});
