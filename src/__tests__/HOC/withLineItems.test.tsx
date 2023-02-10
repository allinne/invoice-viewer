import { cleanup, render } from '@testing-library/react';
import { withLineItems } from '../../HOC/withLineItems';
import { LineItem } from '../../@types/index';

describe('HOC: withLineItems', () => {
  const mockComponent = jest.fn(() => null);
  const changeInputMock = jest.fn();
  const data: LineItem[] = [
    { description: 'Test data 1', price: 55.0 },
    { description: 'Test data 2', price: 45.0 },
  ];
  const LineItemsComponent = withLineItems(mockComponent);

  beforeEach(() => {
    render(
      <LineItemsComponent
        lineItems={data}
        changeInput={changeInputMock}
      />
    );
  });
  afterEach(cleanup);

  it('renders a component with default displayName', async () => {
    expect(mockComponent).toBeCalled();
    expect(LineItemsComponent.displayName).toStrictEqual('withLineItems(mockConstructor)');
  });
});
