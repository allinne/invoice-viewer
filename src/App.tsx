import { useState, useEffect } from 'react'
import Header from './components/header';
import Body from './components/body';
import { invoiceJSON } from '../@types/index';
import './styles/App.css';

function App() {
  const [data, setData] = useState<invoiceJSON>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('/invoice.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
  }, []);

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <div>
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <Header { ...data }/>

          <tr className="heading">
            <td>Item</td>
            <td>Price</td>
          </tr>

          <Body { ...data }/>
        </tbody>
      </table>
    </div>
  );
}

export default App;
