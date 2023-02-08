import { InvoiceJSON, LineItem, ReducerAction, ReducerActionType } from '../@types/index';

// narrowing
const isLineItem = (item: LineItem | undefined): item is LineItem => {
  return !!item;
}

function itemsReducer(data: InvoiceJSON, action: ReducerAction): InvoiceJSON {
  switch (action.type) {
    case ReducerActionType.DESCRIPTION_CHANGED: 
    case ReducerActionType.PRICE_CHANGED: {
      const items = data.lineItems.map((item, index) => {
        if (index === action.index) {
          return action.item;
        }
        return item;
      })
      .filter(isLineItem);

      return {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        company: data.company,
        createdAt: data. createdAt,
        dueAt: data.dueAt,
        lineItems: items,
      };
    }
    case ReducerActionType.INITIALIZE_CARD:
    default: {
      return action.data;
    }
  }
}

export default itemsReducer;
