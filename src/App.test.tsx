import { act, cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from "./App";
import { mockData } from './components/dropzone.test';

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
    render(
      <App/>
    );

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
      render(
        <App/>
      );

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
      render(
        <App/>
      );

      const editButton = await screen.findByTestId('edit-button');
      fireEvent.click(editButton);

      const items = await screen.findAllByTestId('line-item-price-editable');
      const editedItemIndex = 0;

      expect(items[editedItemIndex]).toHaveAttribute('value', '21,23');

      const editedItemDescription = '95';

      fireEvent.input(items[editedItemIndex], { target: { value: editedItemDescription } });

      expect(items[editedItemIndex]).toHaveAttribute('value', editedItemDescription);
    });

    it('should parse the dropped file content', async () => {
      render(
        <App/>
      );

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

      const dropAgainButton = await screen.findByTestId('drop-again-button');
      fireEvent.click(dropAgainButton);

      expect(dropContainer).toBeTruthy();
    });
  });
});

const json = {
  "id": "d471c483-f15f-490b-adb3-7c5821b6d955",
  "lineItems": [
    {
      "description": "Waistcoat schlitz cronut wolf.",
      "price": 21.23
    },
    {
      "description": "Generating the bus won't do anything, we need to compress the cross-platform JSON card!",
      "price": 10.71
    }
  ],
  "email": "austinhackett@durgan.org",
  "fullName": "Delaney Howell",
  "company": "Kassulke Group",
  "createdAt": "2021-10-11",
  "dueAt": "2021-11-01"
};

const droppedJSON = {
  "id": "d471c483-f15f-490b-adb3-7c5821b6d955",
  "lineItems": [
    {
      "description": "Test drop file 1",
      "price": 84.44
    },
    {
      "description": "Test drop file 2",
      "price": 97.55
    }
  ],
  "email": "user@email.com",
  "fullName": "Elon Mask",
  "company": "Kaufland",
  "createdAt": "2023-10-11",
  "dueAt": "2023-11-01"
};
