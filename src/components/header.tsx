import { InvoiceJSON } from '../@types/index';
import { getInvoiceNumber, formatDate } from '../utils/index';
import '../styles/components/header.scss';

function Header(props: InvoiceJSON) {
  return (
    <div className="invoice-box__header" data-testid="invoice-header">

      <div className="invoice-box__header-item">
        <div className="invoice-box__header-cell">
          <img
            alt="logo"
            className="invoice-box__header-logo"
            src="cai_logo.svg"
          />
        </div>
        <div className="invoice-box__header-cell invoice-box__header-cell--right">
          <div data-testid="invoice-id">Invoice #: {getInvoiceNumber(props.id)}</div>
          <div data-testid="invoice-created-at">Created: {formatDate(props.createdAt)}</div>
          <div data-testid="invoice-due">Due: {formatDate(props.dueAt)}</div>
        </div>
      </div>

      <div className="invoice-box__header-item">
        <div className="invoice-box__header-cell invoice-box__header-cell--company">
          <div>collectAI GmbH</div>
          <div>20457 Hamburg</div>
          <div>Hamburg, Germany</div>
        </div>
        <div className="invoice-box__header-cell invoice-box__header-cell--right invoice-box__header-cell--company">
          <div data-testid="company">{props.company}</div>
          <div data-testid="fullName">{props.fullName}</div>
          <div data-testid="email">{props.email}</div>
        </div>
      </div>

    </div>
  );
}

export default Header;
