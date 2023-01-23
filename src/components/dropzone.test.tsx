import { act, fireEvent, render, cleanup, screen } from '@testing-library/react'
import Dropzone from "./dropzone";
import { mockData } from '../utils/tests';

describe('<Dropzone />', () => {
  const onDrop = jest.fn();
  const resetDropState = jest.fn();

  const file = new File(
    [ JSON.stringify({ ping: true }) ],
    'ping.json',
    { type: 'application/json' }
  );
  const data = mockData([file]);

  afterEach(cleanup);

  it('renders a component with isDropSucceded=true', async () => {
    render(
      <Dropzone
        isDropSucceded={true}
        isDropFailed={false}
        resetDropState={resetDropState}
        onDrop={onDrop}
      />
    );
  
    const message = await screen.findByTestId('successful-drop');
    const dropAgainButton = await screen.findByTestId('drop-again-button');

    expect(message.innerHTML).toStrictEqual('Invoice data was successfuly parsed');
    expect(resetDropState).not.toHaveBeenCalled();

    fireEvent.click(dropAgainButton);
    expect(resetDropState).toHaveBeenCalled();
  });

  it('renders a component with isDropFailed=true', async () => {
    render(
      <Dropzone
        isDropSucceded={true}
        isDropFailed={true}
        resetDropState={resetDropState}
        onDrop={onDrop}
      />
    );
  
    const message = await screen.findByTestId('error-drop');
    const dropAgainButton = await screen.findByTestId('drop-again-button');

    expect(message.innerHTML).toStrictEqual('Wrong JSON format');
    expect(resetDropState).not.toHaveBeenCalled();

    fireEvent.click(dropAgainButton);
    expect(resetDropState).toHaveBeenCalled();
  });

  it('invokes onDrop when drop event occurs', async () => {
    render(
      <Dropzone
        isDropSucceded={false}
        isDropFailed={false}
        resetDropState={resetDropState}
        onDrop={onDrop}
      />
    );

    const dropContainer = await screen.findByTestId('drop-container');
  
    await act(
      () => fireEvent.drop(
        dropContainer,
        data,
      )
    );

    expect(onDrop).toHaveBeenCalled();
  });

  it('changes a className when dragEnter occurs', async () => {
    render(
      <Dropzone
        isDropSucceded={false}
        isDropFailed={false}
        resetDropState={resetDropState}
        onDrop={onDrop}
      />
    );

    const dropContainer = await screen.findByTestId('drop-container');
  
    await act(
      () => fireEvent.dragEnter(
        dropContainer,
        data,
      )
    );

    expect(dropContainer).toHaveTextContent('Release to drop the files here');
  });
});
