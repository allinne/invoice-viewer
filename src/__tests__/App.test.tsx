import { act, cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { mockData } from '../utils/tests';
import { json, droppedJSON, droppedWrongJSON } from '../fixtures/tests';

describe('<App />', () => {
  let originalFetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

    beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(json)
      })) as jest.Mock;
    });

    afterEach(() => {
      global.fetch = originalFetch;
      cleanup();
    });

  it('renders a component with Head and Body components', async () => {
    await act(() => {
      render(
        <App/>
      );
    });

    const invoiceBody = await screen.findByTestId('invoice-body');
    const invoiceHeader = await screen.findByTestId('invoice-header');

    expect(invoiceBody).toBeTruthy();
    expect(invoiceHeader).toBeTruthy();
  });

  describe('- editable mode', () => {
    const originalWindowLocation = window.location;

    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        enumerable: true,
        value: new URL(`${window.location.href}?edit`),
      });
    });

    afterEach(() => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        enumerable: true,
        value: originalWindowLocation,
      });
    });

    it('should change description', async () => {
      await act(() => {
        render(
          <App/>
        );
      });

      const editButton = await screen.findByTestId('edit-button');
      fireEvent.click(editButton);

      const items = await screen.findAllByTestId('line-item-description-editable');
      const editedItemIndex = 0;

      expect(items[editedItemIndex]).toHaveAttribute('value', 'Waistcoat schlitz cronut wolf.');

      const editedItemDescription = 'Test data 1 edited';

      fireEvent.input(items[editedItemIndex], { target: { value: editedItemDescription } });

      expect(items[editedItemIndex]).toHaveAttribute('value', editedItemDescription);
    });

    it('should change price', async () => {
      await act(() => {
        render(
          <App/>
        );
      });

      const editButton = await screen.findByTestId('edit-button');
      fireEvent.click(editButton);

      const items = await screen.findAllByTestId('line-item-price-editable');
      const editedItemIndex = 0;

      expect(items[editedItemIndex]).toHaveAttribute('value', '21,23');

      const editedItemDescription = '95';

      fireEvent.input(items[editedItemIndex], { target: { value: editedItemDescription } });

      expect(items[editedItemIndex]).toHaveAttribute('value', editedItemDescription);
    });

    it('should successfuly parse the dropped file content', async () => {
      await act(() => {
        render(
          <App/>
        );
      });

      const dropContainer = await screen.findByTestId('drop-container');
      const file = new File(
        [ JSON.stringify(droppedJSON) ],
        'ping.json',
        { type: 'application/json' }
      );
      const data = mockData([file]);
  
      await act(
        () => fireEvent.drop(
          dropContainer,
          data,
        )
      );

      const items = await screen.findAllByTestId('line-item-price');

      await waitFor(() => {
        expect(items[0]).toHaveTextContent('84,44 EUR');
      });
    });

    it('should show an error if JSON file has wrong format', async () => {
      await act(() => {
        render(
          <App/>
        );
      });

      const dropContainer = await screen.findByTestId('drop-container');
      const file = new File(
        [ JSON.stringify(droppedWrongJSON) ],
        'ping.json',
        { type: 'application/json' }
      );
      const data = mockData([file]);
  
      await act(
        () => fireEvent.drop(
          dropContainer,
          data,
        )
      );

      const invoiceId = await screen.findByTestId('invoice-id');
      const items = await screen.findAllByTestId('line-item-price');
      
      await waitFor(() => {
        expect(invoiceId).toHaveTextContent('Invoice #: 7c5821b6d955');
        expect(items.length).toStrictEqual(2);
      });
    });
  });
});
