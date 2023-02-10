import { cleanup, render, screen } from '@testing-library/react';
import Header from '../../components/header';

describe('<Header />', () => {
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
    
    expect(invoiceId).toHaveTextContent('Invoice #: e5e5e5');
    expect(invoiceCreatedAt).toHaveTextContent('Created: 19/01/2023');
    expect(invoiceDue).toHaveTextContent('Due: 30/01/2023');

    const company = await screen.findByTestId('company');
    const fullName = await screen.findByTestId('fullName');
    const email = await screen.findByTestId('email');

    expect(company).toHaveTextContent(data.company);
    expect(fullName).toHaveTextContent(data.fullName);
    expect(email).toHaveTextContent(data.email);
  });

  it('renders a component with empty data', async () => {
    const data = {
      id: '',
      email: '',
      fullName: '',
      company: '',
      createdAt: '',
      dueAt: '',

      lineItems: [],
    };

    render(
      <Header {...data}/>
    );

    const invoiceId = await screen.findByTestId('invoice-id');
    const invoiceCreatedAt = await screen.findByTestId('invoice-created-at');
    const invoiceDue = await screen.findByTestId('invoice-due');
    
    expect(invoiceId).toHaveTextContent('Invoice #:');
    expect(invoiceCreatedAt).toHaveTextContent('Created:');
    expect(invoiceDue).toHaveTextContent('Due:');

    const company = await screen.findByTestId('company');
    const fullName = await screen.findByTestId('fullName');
    const email = await screen.findByTestId('email');

    expect(company).toHaveTextContent('');
    expect(fullName).toHaveTextContent('');
    expect(email).toHaveTextContent('');
  });
});
