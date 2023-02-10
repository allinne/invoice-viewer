import { useState, useCallback } from 'react';
import { BodyData, onDropEvent } from '../@types/index';
import { validateJSON } from '../utils/index';
import Table from './table';
import Dropzone from './dropzone';

function Body(props: BodyData) {
  const hasEditQueryRegExp = new RegExp(/(edit)+/gm);
  const hasEditQuery = hasEditQueryRegExp.test(window.location.search);
  const [state, setState] = useState(false);
  function getButton() {
    const buttonText = state ? 'save' : 'edit';

    return (
      <div>
        <button
          data-testid="edit-button"
          className="invoice-box__controls-button"
          onClick={() => setState(!state)}
        >
          {buttonText}
        </button>
      </div>
    )
  }

  const [dropState, setDropState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const onDrop: onDropEvent = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((item: File) => {
      const reader = new FileReader();

      reader.onload = function(e) {
        const jsonString = e.target?.result as string;
        const data = JSON.parse(jsonString);

        if (validateJSON(data)) {
          props.updateData(data);
          setDropState(true);
        } else {
          setErrorState(true);
        }
      };

      reader.readAsText(item);
      return item;
    });
  }, [props]);

  function resetDropStates() {
    setDropState(false);
    setErrorState(false);
  }

  return (
    <>
      <Table
        isEditable={state}
        lineItems={props.data.lineItems}
        changeInput={props.changeInput}
      />

      {hasEditQuery ?
        <div className="invoice-box__controls">
          <Dropzone
            isDropSucceded={dropState}
            isDropFailed={errorState}
            resetDropState={resetDropStates}
            onDrop={onDrop}
          />
          {getButton()}
        </div> :
        ''
      }
    </>
  )
}

export default Body;
