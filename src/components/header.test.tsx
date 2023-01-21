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
    <Header {...data}/>
  );

  const invoiceId = await screen.findByTestId('invoice-id');
  const invoiceCreatedAt = await screen.findByTestId('invoice-created-at');
  const invoiceDue = await screen.findByTestId('invoice-due');
  
  expect(invoiceId.innerHTML).toStrictEqual('Invoice #: e5e5e5');
  expect(invoiceCreatedAt.innerHTML).toStrictEqual('Created: 19/01/2023');
  expect(invoiceDue.innerHTML).toStrictEqual('Due: 30/01/2023');

  const company = await screen.findByTestId('company');
  const fullName = await screen.findByTestId('fullName');
  const email = await screen.findByTestId('email');

  expect(company.innerHTML).toStrictEqual(data.company);
  expect(fullName.innerHTML).toStrictEqual(data.fullName);
  expect(email.innerHTML).toStrictEqual(data.email);
});
