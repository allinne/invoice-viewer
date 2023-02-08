import reducer from './itemsReducer';
import { LineItem, ReducerAction, ReducerActionType } from '../@types/index';

describe('itemsReducer', () => {

  const items = [
    {
      description: 'Initial description 1',
      price: 777,
    },
    {
      description: 'Initial description 2',
      price: 222,
    },
  ];

  const data = {
    id: '',
    email: '',
    fullName: '',
    company: '',
    createdAt: '',
    dueAt: '',
    lineItems: items,
  };

  describe('- description or price are changed', () => {
    const changedItem: LineItem = { description: 'Changed description', price: 555 };
    let action: ReducerAction;
    const updatedItems: LineItem[] = Object.assign([], items, {0: changedItem});
    const updatedData = { ...data };
    updatedData.lineItems = updatedItems;

    it('DESCRIPTION_CHANGED: should return the list with modified item', () => {
      action = {
        type: ReducerActionType.DESCRIPTION_CHANGED,
        item: changedItem,
        index: 0,
        data,
      };

      expect(reducer(data, action)).toEqual(updatedData);
    });

    it('PRICE_CHANGED: should return the list with modified item', () => {
      action = {
        type: ReducerActionType.PRICE_CHANGED,
        item: changedItem,
        index: 0,
        data,
      };

      expect(reducer(data, action)).toEqual(updatedData);
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

      const updatedData = { ...data };
      updatedData.lineItems = changedItems;
      const action: ReducerAction = {
        type: ReducerActionType.INITIALIZE_CARD,
        item: items[0],
        index: 0,
        data: updatedData,
      };

      expect(reducer(data, action)).toEqual(updatedData);
    });

    it('should return an empty list', () => {
      const changedItems: LineItem[] = [];

      const updatedData = { ...data };
      updatedData.lineItems = changedItems;
      const action: ReducerAction = {
        type: ReducerActionType.INITIALIZE_CARD,
        item: items[0],
        index: 0,
        data: updatedData,
      };

      expect(reducer(data, action)).toEqual(updatedData);
    });
  });
});
