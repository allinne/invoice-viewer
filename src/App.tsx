import { useReducer, useState, useEffect, Reducer, Suspense } from 'react'
import Header from './components/header';
import Body from './components/body';
import { InvoiceJSON, LineItem, ReducerAction, ReducerActionType } from './@types/index';
import './styles/App.scss';

function itemsReducer(items: LineItem[], action: ReducerAction): LineItem[] {
  switch (action.type) {
    case ReducerActionType.DESCRIPTION_CHANGED: 
    case ReducerActionType.PRICE_CHANGED: {
      return items.map((t) => {
        if (t.id === action.item.id) {
          return action.item;
        } else {
          return t;
        }
      });
    }
    case ReducerActionType.INITIALIZE_CARD: {
      return action.payload || [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function App() {
  const [initialData, setInitialData] = useState<InvoiceJSON>();

  useEffect(() => {
    fetch('/invoice.json')
      .then((res) => res.json())
      .then((data) => {
        setInitialData(data);
        dispatch({
          type: ReducerActionType.INITIALIZE_CARD,
          item: data.lineItems[0],
          payload: data.lineItems,
        })
      })
  }, []);

  const initialLineItems: LineItem[] = initialData ? initialData.lineItems : [];
  const [data, dispatch] = useReducer<Reducer<LineItem[], ReducerAction>>(itemsReducer, initialLineItems);

  function handleChangeDescription(item: LineItem) {
    dispatch({
      type: ReducerActionType.DESCRIPTION_CHANGED,
      item,
    });
  }

  function handleChangePrice(item: LineItem) {
    dispatch({
      type: ReducerActionType.PRICE_CHANGED,
      item,
    });
  }

  const hasEditQueryRegExp = new RegExp(/(edit)+/gm);
  const hasEditQuery = hasEditQueryRegExp.test(window.location.search);
  const [state, setState] = useState(false);
  function getButton() {
    if (state) {
      return <button onClick={() => setState(false)}>save</button>;
    }
    return <button onClick={() => setState(true)}>edit</button>;
  }

  if (!initialData) return <p>No data</p>

  return (
    <div>
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <Header { ...initialData }/>

          <tr className="heading">
            <td>Item</td>
            <td>Price</td>
          </tr>

          <Suspense fallback={<p>loading...</p>}>
            <Body
              isEditable={state}
              lineItems={data}
              changeDescription={handleChangeDescription}
              changePrice={handleChangePrice}
            />
          </Suspense>
        </tbody>
      </table>

      {hasEditQuery ?
        <div>{getButton()}</div> :
        ''
      }
    </div>
  );
}

export default App;
