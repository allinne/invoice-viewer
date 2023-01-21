import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { LineItem } from '../@types/index';
import Body, { formatPrice } from "./body";

describe('Body: readonly mode', () => {
  const noop = jest.fn();
  const isEditable = false;

  afterEach(cleanup);

  it('renders a component with an empty list', async () => {
    const data: LineItem | [] = [];

    render(
      <Body
        lineItems={data}
        isEditable={isEditable}
        changeDescription={noop}
        changePrice={noop}
      />
    );

    expect(screen.queryAllByTestId('list-item').length).toStrictEqual(0);

    const total = await screen.findByTestId('total');
    const vat = await screen.findByTestId('vat');
    
    expect(total.innerHTML).toStrictEqual('Total: 0 EUR');
    expect(vat.innerHTML).toStrictEqual('VAT (19%): 0 EUR');
  });

  it('renders a component with a list of 2 items', async () => {
    const firstItem: LineItem = { id: 0, description: 'Test data 1', price: 55.0 };
    const data: LineItem[] = [
      firstItem,
      { id: 1, description: 'Test data 2', price: 45.0 },
    ];

    render(
      <Body
        lineItems={data}
        isEditable={isEditable}
        changeDescription={noop}
        changePrice={noop}
      />
    );

    const listItems = await screen.findAllByTestId('list-item');

    expect(screen.queryAllByTestId('list-item').length).toStrictEqual(2);
    expect(screen.queryAllByTestId('list-item-editable').length).toStrictEqual(0);

    const firstItemElement = listItems[0].getElementsByTagName('td');
    expect(firstItemElement[0].innerHTML).toStrictEqual(firstItem.description);
    expect(firstItemElement[1].innerHTML).toStrictEqual(`${formatPrice(firstItem.price)} EUR`);
  });

  it('renders a component with calculated total and VAT', async () => {
    const data: LineItem[] = [
      { id: 0, description: 'Test data 1', price: 55.0 },
      { id: 1, description: 'Test data 2', price: 45.0 },
    ];

    render(
      <Body
        lineItems={data}
        isEditable={isEditable}
        changeDescription={noop}
        changePrice={noop}
      />
    );

    const total = await screen.findByTestId('total');
    const vat = await screen.findByTestId('vat');
    
    expect(total.innerHTML).toStrictEqual('Total: 100 EUR');
    expect(vat.innerHTML).toStrictEqual('VAT (19%): 19 EUR');
  });

  it('should show 2 digits after decimal point in total and VAT', async () => {
    const data: LineItem[] = [
      { id: 0, description: 'Test data 1', price: 55.133 },
      { id: 1, description: 'Test data 2', price: 45.244 },
    ];

    render(
      <Body
        lineItems={data}
        isEditable={isEditable}
        changeDescription={noop}
        changePrice={noop}
      />
    );

    const total = await screen.findByTestId('total');
    const vat = await screen.findByTestId('vat');

    expect(total.innerHTML).toStrictEqual('Total: 100,38 EUR');
    expect(vat.innerHTML).toStrictEqual('VAT (19%): 19,07 EUR');
  });
});

describe('Body: editable mode', () => {
  const changeDescriptionMock = jest.fn();
  const changePriceMock = jest.fn();
  const isEditable = true;
  const data: LineItem[] = [
    { id: 0, description: 'Test data 1', price: 55.0 },
    { id: 1, description: 'Test data 2', price: 45.0 },
  ];

  beforeEach(() => {
    render(
      <Body
        lineItems={data}
        isEditable={isEditable}
        changeDescription={changeDescriptionMock}
        changePrice={changePriceMock}
      />
    );
  });

  afterEach(cleanup);

  it('renders a component with editable description and price', () => {  
    expect(screen.queryAllByTestId('list-item-editable').length).toStrictEqual(2);
  });

  it('should call changeDescription', async () => {  
    expect(changeDescriptionMock.mock.calls.length).toStrictEqual(0);

    const items = await screen.findAllByTestId('list-item-description-editable');

    fireEvent.input(items[0], { target: { value: '23' } });
  
    expect(changeDescriptionMock.mock.calls.length).toStrictEqual(1);
  });

  it('should call changeDescription', async () => {  
    expect(changePriceMock.mock.calls.length).toStrictEqual(0);

    const items = await screen.findAllByTestId('list-item-price-editable');

    fireEvent.input(items[0], { target: { value: '23' } });
  
    expect(changePriceMock.mock.calls.length).toStrictEqual(1);
  });
});
