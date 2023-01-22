import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { LineItem } from '../@types/index';
import Body, { formatPrice } from "./body";

describe('<Body />', () => {
  describe('- readonly mode', () => {
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

      expect(screen.queryAllByTestId('line-item').length).toStrictEqual(0);

      const total = await screen.findByTestId('total');
      const vat = await screen.findByTestId('vat');

      expect(total).toHaveTextContent('Total: 0 EUR');
      expect(vat).toHaveTextContent('VAT (19%): 0 EUR');
    });

    it('renders a component with a list of 2 items', async () => {
      const firstItem: LineItem = { description: 'Test data 1', price: 55.0 };
      const data: LineItem[] = [
        firstItem,
        { description: 'Test data 2', price: 45.0 },
      ];

      render(
        <Body
          lineItems={data}
          isEditable={isEditable}
          changeDescription={noop}
          changePrice={noop}
        />
      );

      const listItems = await screen.findAllByTestId('line-item');

      expect(screen.queryAllByTestId('line-item').length).toStrictEqual(2);
      expect(screen.queryAllByTestId('line-item-editable').length).toStrictEqual(0);

      const firstItemElement = listItems[0].getElementsByTagName('td');
      expect(firstItemElement[0]).toHaveTextContent(firstItem.description);
      expect(firstItemElement[1]).toHaveTextContent(`${formatPrice(firstItem.price)} EUR`);
    });

    it('renders a component with calculated total and VAT', async () => {
      const data: LineItem[] = [
        { description: 'Test data 1', price: 55.0 },
        { description: 'Test data 2', price: 45.0 },
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
      
      expect(total).toHaveTextContent('Total: 100 EUR');
      expect(vat).toHaveTextContent('VAT (19%): 19 EUR');
    });

    it('should show 2 digits after decimal point in total and VAT', async () => {
      const data: LineItem[] = [
        { description: 'Test data 1', price: 55.133 },
        { description: 'Test data 2', price: 45.244 },
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

      expect(total).toHaveTextContent('Total: 100,38 EUR');
      expect(vat).toHaveTextContent('VAT (19%): 19,07 EUR');
    });
  });

  describe('- editable mode', () => {
    const changeDescriptionMock = jest.fn();
    const changePriceMock = jest.fn();
    const isEditable = true;
    const data: LineItem[] = [
      { description: 'Test data 1', price: 55.0 },
      { description: 'Test data 2', price: 45.0 },
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
      expect(screen.queryAllByTestId('line-item-editable').length).toStrictEqual(2);
    });

    it('should call changeDescription', async () => {  
      expect(changeDescriptionMock).not.toHaveBeenCalled();

      const items = await screen.findAllByTestId('line-item-description-editable');

      const editedItemDescription = 'Test data 1 edited';
      const editedItemIndex = 0;
      const editedItem = data[editedItemIndex];
      editedItem.description = editedItemDescription;

      fireEvent.input(items[editedItemIndex], { target: { value: editedItemDescription } });
    
      expect(changeDescriptionMock).toHaveBeenCalled();
      expect(changeDescriptionMock.mock.calls[0][0]).toStrictEqual(editedItem);
      expect(changeDescriptionMock.mock.calls[0][1]).toStrictEqual(editedItemIndex);
    });

    it('should call changePrice', async () => {  
      expect(changeDescriptionMock).not.toHaveBeenCalled();

      const items = await screen.findAllByTestId('line-item-price-editable');

      const editedItemPrice = 23;
      const editedItemIndex = 0;
      const editedItem = data[editedItemIndex];
      editedItem.price = editedItemPrice;

      fireEvent.input(items[0], { target: { value: editedItemPrice } });
    
      expect(changePriceMock).toHaveBeenCalled();
      expect(changePriceMock.mock.calls[0][0]).toStrictEqual(editedItem);
      expect(changePriceMock.mock.calls[0][1]).toStrictEqual(editedItemIndex);
    });

    it('should convert a wrong value into zero', async () => {  
      const items = await screen.findAllByTestId('line-item-price-editable');

      const editedItemPrice = 0;
      const editedItemIndex = 0;
      const editedItem = data[editedItemIndex];
      editedItem.price = editedItemPrice;

      fireEvent.input(items[0], { target: { value: 'wrong format' } });
    
      expect(changePriceMock).toHaveBeenCalled();
      expect(changePriceMock.mock.calls[0][0]).toStrictEqual(editedItem);
      expect(changePriceMock.mock.calls[0][1]).toStrictEqual(editedItemIndex);
    });
  });
});
