import { cleanup, render, screen } from '@testing-library/react';
import { LineItem } from '../@types/index';
import Body from "./body";

describe('<Body />', () => {
  describe('- readonly mode', () => {
    const noop = jest.fn();
    const isEditable = false;

    afterEach(cleanup);

    it('renders a component with an empty list', async () => {
      const data: LineItem | [] = [];

      render(
        <Body
          lineItems={data}
          isEditable={isEditable}
          changeDescription={noop}
          changePrice={noop}
        />
      );

      expect(screen.queryAllByTestId('line-item').length).toStrictEqual(0);

      const total = await screen.findByTestId('total');
      const vat = await screen.findByTestId('vat');

      expect(total).toHaveTextContent('Total: 0 EUR');
      expect(vat).toHaveTextContent('VAT (19%): 0 EUR');
    });

    it('renders a component with calculated total and VAT', async () => {
      const data: LineItem[] = [
        { description: 'Test data 1', price: 55.0 },
        { description: 'Test data 2', price: 45.0 },
      ];

      render(
        <Body
          lineItems={data}
          isEditable={isEditable}
          changeDescription={noop}
          changePrice={noop}
        />
      );

      const total = await screen.findByTestId('total');
      const vat = await screen.findByTestId('vat');
      
      expect(total).toHaveTextContent('Total: 100 EUR');
      expect(vat).toHaveTextContent('VAT (19%): 19 EUR');
    });

    it('should show 2 digits after decimal point in total and VAT', async () => {
      const data: LineItem[] = [
        { description: 'Test data 1', price: 55.133 },
        { description: 'Test data 2', price: 45.244 },
      ];

      render(
        <Body
          lineItems={data}
          isEditable={isEditable}
          changeDescription={noop}
          changePrice={noop}
        />
      );

      const total = await screen.findByTestId('total');
      const vat = await screen.findByTestId('vat');

      expect(total).toHaveTextContent('Total: 100,38 EUR');
      expect(vat).toHaveTextContent('VAT (19%): 19,07 EUR');
    });
  });
});
