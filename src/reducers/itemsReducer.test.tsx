import reducer from './itemsReducer';
import { LineItem, ReducerAction, ReducerActionType } from '../@types/index';

describe('itemsReducer', () => {

  const items: LineItem[] = [
    {
      description: 'Initial description 1',
      price: 777,
    },
    {
      description: 'Initial description 2',
      price: 222,
    },
  ];

  describe('- description or price are changed', () => {
    const changedItem: LineItem = { description: 'Changed description', price: 555 };
    let action: ReducerAction;
    const result: LineItem[] = Object.assign([], items, {0: changedItem});

    it('DESCRIPTION_CHANGED: should return the list with modified item', () => {
      action = {
        type: ReducerActionType.DESCRIPTION_CHANGED,
        item: changedItem,
        index: 0,
      };
      expect(reducer(items, action)).toEqual(result);
    });

    it('PRICE_CHANGED: should return the list with modified item', () => {
      action = {
        type: ReducerActionType.PRICE_CHANGED,
        item: changedItem,
        index: 0,
      };
      expect(reducer(items, action)).toEqual(result);
    });
  });

  describe('- INITIALIZE_CARD', () => {
    it('should return the completely modified list', () => {
      const changedItems: LineItem[] = [
        {
          description: 'Changed description 1',
          price: 111,
        },
        {
          description: 'Changed description 2',
          price: 555,
        },
      ];
      const action: ReducerAction = {
        type: ReducerActionType.INITIALIZE_CARD,
        item: items[0],
        index: 0,
        payload: changedItems,
      };
      expect(reducer(items, action)).toEqual(changedItems);
    });

    it('should return an empty list', () => {
      const action: ReducerAction = {
        type: ReducerActionType.INITIALIZE_CARD,
        item: items[0],
        index: 0,
      };
      expect(reducer(items, action)).toEqual([]);
    });
  });
});
