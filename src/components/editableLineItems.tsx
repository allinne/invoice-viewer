import { FormEvent } from 'react';
import { LineItem, EditableLineItemsData } from '../@types/index';
import { currencyName, formatPrice, getItemClassName } from '../utils/index';

function EditableLineItems(props: EditableLineItemsData) {
  function handleChangePrice(ev: FormEvent<HTMLInputElement>, item: LineItem, index: number) {
    const inputNumber = ev.currentTarget.value;
    const formatted = Number(inputNumber.replaceAll(',', '.'));

    props.changePrice(
      {
        ...item,
        price: Number.isNaN(formatted) ? 0 : formatted,
      },
      index
    );
  }

  const editableLineItems = props.lineItems.map((item: LineItem, index: number) =>
    <tr className={getItemClassName(props.lineItems.length, index)} key={index} data-testid="line-item-editable">
      <td>
        <input
          className="invoice-box__body-input invoice-box__body-input--wide"
          data-testid="line-item-description-editable"
          type="text"
          value={item.description}
          onChange={(ev: FormEvent<HTMLInputElement>) => {
            props.changeDescription(
              {
                ...item,
                description: ev.currentTarget.value,
              },
              index
            );
          }}
        />
      </td>
      <td>
        <input
            className="invoice-box__body-input"
            data-testid="line-item-price-editable"
            type="text"
            value={formatPrice(item.price)}
            onChange={(ev: FormEvent<HTMLInputElement>) => {
              handleChangePrice(ev, item, index);
            }}
        />
        &nbsp;{currencyName}
      </td>
    </tr>
  );

  return (
    <>
      {editableLineItems}
    </>
  )
}

export default EditableLineItems;
