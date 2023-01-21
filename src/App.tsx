import { useReducer, useState, useEffect, useCallback, Reducer, Suspense } from 'react'
import { InvoiceJSON, LineItem, ReducerAction, ReducerActionType, onDropEvent } from './@types/index';
import itemsReducer from './itemsReducer';
import Header from './components/Header';
import Body from './components/Body';
import Dropzone from './components/Dropzone';
import './styles/App.scss';

function App() {
  const [initialData, setInitialData] = useState<InvoiceJSON>();

  useEffect(() => {
    fetch('/invoice.json')
      .then((res) => res.json())
      .then((data) => {
        updateData(data);
      })
  }, []);

  function updateData(data: InvoiceJSON) {
    setInitialData(data);
    dispatch({
      type: ReducerActionType.INITIALIZE_CARD,
      item: data.lineItems[0],
      index: 0,
      payload: data.lineItems,
    });
  }

  const initialLineItems: LineItem[] = initialData ? initialData.lineItems : [];
  const [data, dispatch] = useReducer<Reducer<LineItem[], ReducerAction>>(itemsReducer, initialLineItems);

  function handleChangeDescription(item: LineItem, index: number) {
    dispatch({
      type: ReducerActionType.DESCRIPTION_CHANGED,
      item,
      index,
    });
  }

  function handleChangePrice(item: LineItem, index: number) {
    dispatch({
      type: ReducerActionType.PRICE_CHANGED,
      item,
      index,
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

  const onDrop: onDropEvent = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((item: File) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const jsonString = e.target?.result as string;
        const data = JSON.parse(jsonString);

        updateData(data);
      };
      // TODO: show an error if reader.onerror
      reader.readAsText(item);
      return item;
    });
  }, []);

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
        <div>
          {getButton()}
          <Dropzone onDrop={onDrop} accept={{ 'application/json': ['.json'] }} />
        </div> :
        ''
      }
    </div>
  );
}

export default App;
