import { useDropzone, Accept } from 'react-dropzone';
import { onDropEvent } from '../@types/index';

type dropzoneProps = {
  onDrop: onDropEvent;
  accept: Accept;
}

const Dropzone = (props: dropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: props.onDrop,
    accept: props.accept,
    multiple: false,
  });

  const getClassName = (className: string, isActive: boolean) => {
    if (!isActive) return className;
    return `${className} ${className}-active`;
  };

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */
  return (
    <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
