import { useReducer, useEffect, Reducer, Suspense } from 'react'
import { InvoiceJSON, LineItem, ReducerAction, ReducerActionType } from './@types/index';
import itemsReducer from './reducers/itemsReducer';
import Header from './components/header';
import Body from './components/body';
import { emptyInvoiceData } from './utils/index';
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
    dispatch({ type, item, index, data});
  }

  return (
    <>
      <Suspense fallback={<p>loading...</p>}>
        <Header { ...data }/>

        <Body
          data={data}
          updateData={updateData}
          changeInput={handleChangeInput}
        />
      </Suspense>
    </>
  );
}

export default App;
