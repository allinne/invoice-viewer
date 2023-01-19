import { cleanup, render, screen } from '@testing-library/react';
import Body, { formatPrice } from "./body";

afterEach(cleanup);

it('renders a component with an empty list', () => {
  const data = {
    id: '',
    email: '',
    fullName: '',
    company: '',
    createdAt: '',
    dueAt: '',

    lineItems: [],
  };

  render(
    <table>
      <tbody>
        <Body { ...data }/>
      </tbody>
    </table>
  );

  expect(screen.queryAllByTestId('list-item').length).toStrictEqual(0);
});

it('renders a component with a list of 2 items', async () => {
  const firstItem = { description: 'Test data 1', price: 55.0 };
  const data = {
    id: '',
    email: '',
    fullName: '',
    company: '',
    createdAt: '',
    dueAt: '',

    lineItems: [
      firstItem,
      { description: 'Test data 2', price: 45.0 },
    ],
  };

  render(
    <table>
      <tbody>
        <Body {...data}/>
      </tbody>
    </table>
  );

  const listItems = await screen.findAllByTestId('list-item');
  
  expect(screen.queryAllByTestId('list-item').length).toStrictEqual(2);

  const firstItemElement = listItems[0].getElementsByTagName('td');
  expect(firstItemElement[0].innerHTML).toStrictEqual(firstItem.description);
  expect(firstItemElement[1].innerHTML).toStrictEqual(`${formatPrice(firstItem.price)} EUR`);
});

it('renders a component with calculated total and VAT', async () => {
  const data = {
    id: '',
    email: '',
    fullName: '',
    company: '',
    createdAt: '',
    dueAt: '',

    lineItems: [
      { description: 'Test data 1', price: 55.0 },
      { description: 'Test data 2', price: 45.0 },
    ],
  };

  render(
    <table>
      <tbody>
        <Body {...data}/>
      </tbody>
    </table>
  );

  const total = await screen.findByTestId('total');
  const vat = await screen.findByTestId('vat');
  
  expect(total.innerHTML).toStrictEqual('Total: 100 EUR');
  expect(vat.innerHTML).toStrictEqual('VAT (19%): 19 EUR');
});
