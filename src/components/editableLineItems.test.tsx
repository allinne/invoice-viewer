import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { LineItem } from '../@types/index';
import EditableLineItems from './editableLineItems';

describe('<EditableLineItems />', () => {
  const changeDescriptionMock = jest.fn();
  const changePriceMock = jest.fn();
  const data: LineItem[] = [
    { description: 'Test data 1', price: 55.0 },
    { description: 'Test data 2', price: 45.0 },
  ];

  beforeEach(() => {
    render(
      <table>
        <tbody>
          <EditableLineItems
            lineItems={data}
            changeDescription={changeDescriptionMock}
            changePrice={changePriceMock}
          />
        </tbody>
      </table>
    );
  });

  afterEach(cleanup);

  it('renders a component with editable description and price', async () => {  
    const items = await screen.findAllByTestId('line-item-editable');

    expect(items.length).toStrictEqual(2);
    expect(items[0].getAttribute('class')).toStrictEqual('invoice-box__body-item');
    expect(items[1].getAttribute('class')).toStrictEqual('invoice-box__body-item invoice-box__body-item--last');
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
