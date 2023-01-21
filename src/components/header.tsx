import { format } from "date-fns";
import parseISO from 'date-fns/fp/parseISO';
import { InvoiceJSON } from '../@types/index';

function Header(props: InvoiceJSON) {
  function getInvoiceNumber(invoiceId: string): string {
    const invoiceIdRegExp = new RegExp(/^(?:\w+-){4}(\w+)+$/gm);
    const match = invoiceIdRegExp.exec(invoiceId);
    return match ? match[1] : '';
  }

  function formatDate(inputDate: string): string {
    const date = parseISO(inputDate);
    return format(date, "dd/MM/yyyy");
  }

  return (
    <>
    <tr className="top">
      <td colSpan={2}>
        <table>
          <tbody>
            <tr>
              <td className="title">
                <img
                  src="cai_logo.svg"
                  className="logo"
                  alt="logo"
                />
              </td>

              <td data-testid="invoice-id-dates">
                Invoice #: {getInvoiceNumber(props.id)} <br />
                Created: {formatDate(props.createdAt)} <br />
                Due: {formatDate(props.dueAt)}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>

    <tr className="information">
      <td colSpan={2}>
        <table>
          <tbody>
            <tr>
              <td>
                collectAI GmbH
                <br />
                20457 Hamburg
                <br />
                Hamburg, Germany
              </td>

              <td data-testid="company">
                {props.company}
                <br />
                {props.fullName}<br />
                {props.email}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    </>
  );
}

export default Header;
