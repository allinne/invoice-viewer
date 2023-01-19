import { cleanup, render, screen } from '@testing-library/react';
import Header from "./header";

afterEach(cleanup);

it('renders a component with invoice data', async () => {
  const data = {
    id: 'a1a1a1-2b2b2b-c3c3c3-4d4d4d-e5e5e5',
    email: 'user@email.com',
    fullName: 'Delaney Howell',
    company: 'Kassulke Group',
    createdAt: '2023-01-19',
    dueAt: '2023-01-30',

    lineItems: [],
  };

  render(
    <table>
      <tbody>
        <Header {...data}/>
      </tbody>
    </table>
  );

  const invoiceData = await screen.findByTestId('invoice-id-dates');
  const company = await screen.findByTestId('company');
  
  expect(invoiceData.innerHTML).toStrictEqual('Invoice #: e5e5e5 <br>Created: 19/01/2023 <br>Due: 30/01/2023');
  expect(company.innerHTML).toStrictEqual(`${data.company}<br>${data.fullName}<br>${data.email}`);
});
