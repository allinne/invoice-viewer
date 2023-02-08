import { useReducer, useState, useEffect, useCallback, Reducer, Suspense } from 'react'
import { InvoiceJSON, LineItem, ReducerAction, ReducerActionType, onDropEvent } from './@types/index';
import { validateJSON } from './utils/index';
import itemsReducer from './reducers/itemsReducer';
import Header from './components/header';
import Body from './components/body';
import Dropzone from './components/dropzone';
import './styles/app.scss';

function App() {
  useEffect(() => {
    fetch('/invoice.json')
      .then((res) => res.json())
      .then((data) => {
        updateData(data);
      })
  }, []);

  function updateData(data: InvoiceJSON) {
    dispatch({
      type: ReducerActionType.INITIALIZE_CARD,
      data,
    });
  }

  const [data, dispatch] = useReducer<Reducer<InvoiceJSON, ReducerAction>>(itemsReducer, emptyInvoiceData);

  function handleChangeInput(
    type: ReducerActionType.DESCRIPTION_CHANGED | ReducerActionType.PRICE_CHANGED,
    item: LineItem,
    index: number
  ) {
    dispatch({
      type,
      item,
      index,
      data,
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
  const [errorState, setErrorState] = useState(false);
  const onDrop: onDropEvent = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((item: File) => {
      const reader = new FileReader();

      reader.onload = function(e) {
        const jsonString = e.target?.result as string;
        const data = JSON.parse(jsonString);

        if (validateJSON(data)) {
          updateData(data);
          setDropState(true);
        } else {
          setErrorState(true);
        }
      };

      reader.readAsText(item);
      return item;
    });
  }, []);

  function resetDropStates() {
    setDropState(false);
    setErrorState(false);
  }

  return (
    <>
      <Suspense fallback={<p>loading...</p>}>
        <Header { ...data }/>

        <Body
          isEditable={state}
          lineItems={data.lineItems}
          changeDescription={(item, index) => handleChangeInput(ReducerActionType.DESCRIPTION_CHANGED, item, index)}
          changePrice={(item, index) => handleChangeInput(ReducerActionType.PRICE_CHANGED, item, index)}
        />
      </Suspense>

      {hasEditQuery ?
        <div className="invoice-box__controls">
          <Dropzone
            isDropSucceded={dropState}
            isDropFailed={errorState}
            resetDropState={resetDropStates}
            onDrop={onDrop}
          />
          {getButton()}
        </div> :
        ''
      }
    </>
  );
}

const emptyInvoiceData = {
  id: '',
  email: '',
  fullName: '',
  company: '',
  createdAt: '',
  dueAt: '',
  lineItems: [],
};

export default App;
