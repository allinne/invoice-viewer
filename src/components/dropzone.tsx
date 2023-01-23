import { useDropzone } from 'react-dropzone';
import { DropzoneProps } from '../@types/index';
import '../styles/components/dropzone.scss';

function Dropzone(props: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: props.onDrop,
    accept: { 'application/json': ['.json'] },
    multiple: false,
  });

  const getClassName = (className: string, isActive: boolean) => {
    return isActive ? `${className} ${className}--active` : className;
  };

  const dropZone = (
    <div
      className={getClassName('invoice-box__dropzone', isDragActive)} {...getRootProps()}
      data-testid="drop-container"
    >
      <input className="invoice-box__dropzone-input" { ...getInputProps() } />
      {isDragActive ? (
        <div className="invoice-box__dropzone-text">Release to drop the files here</div>
      ) : (
        <div className="invoice-box__dropzone-text">
          Drag &apos;n&apos; drop some files here, or click to select files
        </div>
      )}
    </div>
  );

  const dropAgainButton = (
    <div>
      <button
        className="invoice-box__dropzone-button"
        onClick={props.resetDropState}
        data-testid="drop-again-button"
      >
        Drop again
      </button>
    </div>
  );

  const successMessage = (
    <div className="invoice-box__dropzone">
      <div className="invoice-box__dropzone-text" data-testid="successful-drop">
        Invoice data was successfuly parsed
      </div>
      {dropAgainButton}
    </div>
  );

  const errorMessage = (
    <div className="invoice-box__dropzone">
      <div className="invoice-box__dropzone-text invoice-box__dropzone-text--error" data-testid="error-drop">
        Wrong JSON format
      </div>
      {dropAgainButton}
    </div>
  );

  const dropBlock = props.isDropSucceded ? successMessage : dropZone;

  return props.isDropFailed ? errorMessage : dropBlock;
}

export default Dropzone;
