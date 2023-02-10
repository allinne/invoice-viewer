import { FormEvent } from 'react';
import { LineItem, WithLineItemsData, ReducerActionType } from '../@types/index';
import { formatPrice } from '../utils/index';

function EditableLineItems(props: WithLineItemsData) {
  function handleChangePrice(ev: FormEvent<HTMLInputElement>, item: LineItem, index: number) {
    const inputNumber = ev.currentTarget.value;
    const formatted = Number(inputNumber.replaceAll(',', '.'));

    props.changeInput(
      ReducerActionType.PRICE_CHANGED,
      {
        ...item,
        price: Number.isNaN(formatted) ? 0 : formatted,
      },
      index
    );
  }

  const descriptionInput = (item: LineItem, index: number) => {
    return (
      <input
        className="invoice-box__body-input invoice-box__body-input--wide"
        data-testid="line-item-description-editable"
        type="text"
        value={item.description}
        onChange={(ev: FormEvent<HTMLInputElement>) => {
          props.changeInput(
            ReducerActionType.DESCRIPTION_CHANGED,
            {
              ...item,
              description: ev.currentTarget.value,
            },
            index
          );
        }}
      />
    );
  };
  const priceInput = (item: LineItem, index: number) => {
    return (
      <input
        className="invoice-box__body-input"
        data-testid="line-item-price-editable"
        type="text"
        value={formatPrice(item.price)}
        onChange={(ev: FormEvent<HTMLInputElement>) => {
          handleChangePrice(ev, item, index);
        }}
      />
    );
  };

  const editableLineItems = props.createLineItems(descriptionInput, priceInput);

  return editableLineItems;
}

export default EditableLineItems;
