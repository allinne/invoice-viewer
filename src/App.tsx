import './App.css';
import Header from './components/header';
import Body from './components/body';

function App() {
  return (
    <table cellPadding="0" cellSpacing="0">
      <tbody>
        <Header/>

        <tr className="heading">
          <td>Item</td>
          <td>Price</td>
        </tr>

        <Body/>
      </tbody>
    </table>
  );
}

export default App;
