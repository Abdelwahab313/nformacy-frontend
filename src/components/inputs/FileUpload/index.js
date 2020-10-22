import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import UploadIcon from './UploadIcon.svg';
import SubmitButton from '../../buttons/SubmitButton';

//
////// this file is cloned from https://github.com/JakeHartnell/react-images-upload
//

const ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE',
};

//TODO make the files accessible
//TODO should we validate the name of the attachment

class FileUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileErrors: [],
    };
    this.inputElement = '';
    this.onDropFile = this.onDropFile.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.files !== this.state.files) {
      this.props.onChange(this.state.files);
    }
  }

  /*
	 Check file extension (onDropFile)
	 */
  hasExtension(fileName) {
    const pattern =
      '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  /*
   Handle file validation
   */
  onDropFile(e) {
    const files = e.target.files;
    const allFilePromises = [];
    const fileErrors = [];

    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let fileError = {
        name: file.name,
      };
      // Check for file size
      if (file.size > this.props.maxFileSize) {
        fileError = Object.assign(fileError, {
          type: ERROR.FILESIZE_TOO_LARGE,
        });
        fileErrors.push(fileError);
        continue;
      }

      allFilePromises.push(this.readFile(file));
    }

    this.setState({
      fileErrors,
    });

    Promise.all(allFilePromises).then((newFilesData) => {
      const files = [];

      newFilesData.forEach((newFileData) => {
        files.push(newFileData.file);
      });
      this.setState({ files: files });
    });
  }

  onUploadClick(e) {
    // Fixes https://github.com/JakeHartnell/react-images-upload/issues/55
    e.target.value = null;
  }

  /*
     Read a file and return a promise that when resolved gives the file itself and the data URL
   */
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function() {
        // Add the file name to the data URL
        resolve({ file });
      };

      reader.readAsDataURL(file);
    });
  }

  /*
   Check if any errors && render
   */
  renderErrors() {
    const { fileErrors } = this.state;
    return fileErrors.map((fileError, index) => {
      return (
        <div
          className={'errorMessage ' + this.props.errorClass}
          key={index}
          style={this.props.errorStyle}>
          * {fileError.name}{' '}
          {fileError.type === ERROR.FILESIZE_TOO_LARGE
            ? this.props.fileSizeError
            : this.props.fileTypeError}
        </div>
      );
    });
  }

  /*
   Render the upload icon
   */
  renderIcon() {
    if (this.props.withIcon) {
      return <img src={UploadIcon} className='uploadIcon' alt='Upload Icon' />;
    }
  }

  /*
   Render label
   */
  renderLabel() {
    if (this.props.withLabel) {
      return (
        <p className={this.props.labelClass} style={this.props.labelStyles}>
          {this.props.label}
        </p>
      );
    }
  }

  /*
   On button click, trigger input file to open
   */
  triggerFileUpload() {
    this.inputElement.click();
  }

  render() {
    return (
      <div className='fileContainer' style={this.props.fileContainerStyle}>
        <div className='errorsContainer'>{this.renderErrors()}</div>
        <SubmitButton
          type={this.props.buttonType}
          buttonText={this.props.buttonText}
          onClick={this.triggerFileUpload}
        />
        <input
          type='file'
          ref={(input) => (this.inputElement = input)}
          name={this.props.name}
          multiple={false}
          onChange={this.onDropFile}
          onClick={this.onUploadClick}
          accept={this.props.accept}
        />
      </div>
    );
  }
}

FileUploadComponent.defaultProps = {
  className: '',
  fileContainerStyle: {},
  buttonClassName: '',
  buttonStyles: {},
  withPreview: false,
  accept: 'image/*',
  name: '',
  withIcon: true,
  buttonText: 'Choose images',
  buttonType: 'button',
  withLabel: true,
  label: 'Max file size: 5mb, accepted: jpg|gif|png',
  labelStyles: {},
  labelClass: '',
  imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not a supported file extension',
  errorClass: '',
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: () => {},
  defaultImages: [],
};

FileUploadComponent.propTypes = {
  style: PropTypes.object,
  fileContainerStyle: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  buttonClassName: PropTypes.string,
  buttonStyles: PropTypes.object,
  buttonType: PropTypes.string,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.array,
  maxFileSize: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  singleImage: PropTypes.bool,
  defaultImages: PropTypes.array,
};

export default FileUploadComponent;
