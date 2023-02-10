import { act, cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import Body from "./body";
import { mockData } from '../utils/tests';
import { droppedJSON, droppedWrongJSON } from '../fixtures/tests';

describe('<Body />', () => {
  const JSONdata = {
    id: 'a1a1a1-2b2b2b-c3c3c3-4d4d4d-e5e5e5',
    email: 'user@email.com',
    fullName: 'Delaney Howell',
    company: 'Kassulke Group',
    createdAt: '2023-01-19',
    dueAt: '2023-01-30',

    lineItems: [
      {
        "description": "Waistcoat schlitz cronut wolf.",
        "price": 21.23
      },
      {
        "description": "Generating the bus won't do anything, we need to compress the cross-platform JSON card!",
        "price": 10.71
      }
    ],
  };
  const updateDataMock = jest.fn();
  const changeInputMock = jest.fn();

  afterEach(() => {
    cleanup();
  });

  it('renders a component with Body and without Dropzone components', async () => {
    render(
      <Body
        data={JSONdata}
        updateData={updateDataMock}
        changeInput={changeInputMock}
      />
    );

    const invoiceBody = await screen.findByTestId('invoice-body');
    const dropContainer = screen.queryByTestId('drop-container');

    expect(invoiceBody).toBeTruthy();
    expect(dropContainer).toBeFalsy();
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

    it('should call changeInput action changing a description', async () => {
      render(
        <Body
          data={JSONdata}
          updateData={updateDataMock}
          changeInput={changeInputMock}
        />
      );

      const editButton = await screen.findByTestId('edit-button');
      fireEvent.click(editButton);

      const items = await screen.findAllByTestId('line-item-description-editable');
      const editedItemIndex = 0;

      expect(items[editedItemIndex]).toHaveAttribute('value', 'Waistcoat schlitz cronut wolf.');

      const editedItemDescription = 'Test data 1 edited';

      fireEvent.input(items[editedItemIndex], { target: { value: editedItemDescription } });

      expect(changeInputMock).toBeTruthy();
    });

    it('should call changeInput action changing a price', async () => {
      render(
        <Body
          data={JSONdata}
          updateData={updateDataMock}
          changeInput={changeInputMock}
        />
      );

      const editButton = await screen.findByTestId('edit-button');
      fireEvent.click(editButton);

      const items = await screen.findAllByTestId('line-item-price-editable');
      const editedItemIndex = 0;

      const editedItemDescription = '95';

      fireEvent.input(items[editedItemIndex], { target: { value: editedItemDescription } });

      expect(changeInputMock).toBeTruthy();
    });

    it('should successfuly parse the dropped file content', async () => {
      render(
        <Body
          data={JSONdata}
          updateData={updateDataMock}
          changeInput={changeInputMock}
        />
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

      await waitFor(() => {
        expect(updateDataMock).toBeTruthy();
      });

      const dropAgainButton = await screen.findByTestId('drop-again-button');
      fireEvent.click(dropAgainButton);

      expect(dropContainer).toBeTruthy();
    });

    it('should show an error if JSON file has wrong format', async () => {
      render(
        <Body
          data={JSONdata}
          updateData={updateDataMock}
          changeInput={changeInputMock}
        />
      );

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

      const errorMessage = await screen.findAllByTestId('error-drop');
      
      await waitFor(() => {
        expect(errorMessage).toBeTruthy();
        expect(updateDataMock).toBeTruthy();
      });
    });
  });
});
