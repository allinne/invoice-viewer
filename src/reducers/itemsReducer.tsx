import { LineItem, ReducerAction, ReducerActionType } from '../@types/index';

function itemsReducer(items: LineItem[], action: ReducerAction): LineItem[] {
  switch (action.type) {
    case ReducerActionType.DESCRIPTION_CHANGED: 
    case ReducerActionType.PRICE_CHANGED: {
      return items.map((item, index) => {
        if (index === action.index) {
          return action.item;
        } else {
          return item;
        }
      });
    }
    case ReducerActionType.INITIALIZE_CARD:
    default: {
      return action.payload || [];
    }
  }
}

export default itemsReducer;
