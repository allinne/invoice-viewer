import { useReducer, useState, useEffect, useCallback, Reducer, Suspense } from 'react'
import { InvoiceJSON, LineItem, ReducerAction, ReducerActionType, onDropEvent } from './@types/index';
import itemsReducer from './itemsReducer';
import Header from './components/header';
import Body from './components/body';
import Dropzone from './components/dropzone';
import './styles/app.scss';

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
    const buttonText = state ? 'save' : 'edit';

    return (
      <div>
        <button
          data-testid="edit-button"
          className="invoice-box__controls-button"
          onClick={() => setState(!state)}
        >
          {buttonText}
        </button>
      </div>
    )
  }

  const [dropState, setDropState] = useState(false);
  const onDrop: onDropEvent = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((item: File) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const jsonString = e.target?.result as string;
        const data = JSON.parse(jsonString);

        updateData(data);
        setDropState(true);
      };

      reader.readAsText(item);
      return item;
    });
  }, []);

  function resetDropState() {
    setDropState(false);
  }

  if (!initialData) {
    return <p>No data</p>;
  }

  return (
    <>
      <Header { ...initialData }/>

      <Suspense fallback={<p>loading...</p>}>
        <Body
          isEditable={state}
          lineItems={data}
          changeDescription={handleChangeDescription}
          changePrice={handleChangePrice}
        />
      </Suspense>

      {hasEditQuery ?
        <div className="invoice-box__controls">
          <Dropzone
            isDropSucceded={dropState}
            resetDropState={resetDropState}
            onDrop={onDrop}
          />
          {getButton()}
        </div> :
        ''
      }
    </>
  );
}

export default App;
