export default function Header() {
  const logoStyle = {
    width: '100%',
    maxWidth: '300px',
  };

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
                  style={logoStyle}
                  alt="logo"
                />
              </td>

              <td>
                Invoice #: 39291 <br />
                Created: 17/07/2021 <br />
                Due: 17/08/2021
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
                collectAI GmbH.
                <br />
                20457 Hamburg
                <br />
                Hamburg, Germany
              </td>

              <td>
                Acme, GmbH.
                <br />
                Bob Hans Jens, The Great <br />
                youknowit@star-wars-is-real.pew
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    </>
  );
}
