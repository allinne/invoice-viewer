import { currencyName, getItemClassName } from '../utils/index';
import { LineItem, LineItemsData, LineItemPropFunc } from '../@types/index';

export function withLineItems<T extends LineItemsData>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name;

  const ComponentWithLineItems = (props: LineItemsData) => {
    const lastItemIndex = props.lineItems.length - 1;

    const createLineItems = (description: LineItemPropFunc, price: LineItemPropFunc) => {
      return props.lineItems.map((item: LineItem, index: number) => {
        return (
          <tr className={getItemClassName(lastItemIndex, index)} key={index} data-testid="line-item">
            <td data-testid="line-item-description">{description(item, index)}</td>
            <td data-testid="line-item-price">{price(item, index)} {currencyName}</td>
          </tr>
        );
      });
    };

    return (
      <WrappedComponent
        {...(props as T)}
        createLineItems={createLineItems}
      />
    );
  };

  ComponentWithLineItems.displayName = `withLineItems(${displayName})`;

  return ComponentWithLineItems;
}
