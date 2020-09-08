import {
  attachButtonStyle,
  attachContainerStyle,
} from '../../styles/questionRoasterStyles';
import t from '../../locales/en/questionRoaster.json';
import FileUpload from '../inputs/FileUpload';
import React from 'react';

const AttachmentUploader = ({
  containerClassName,
  attachmentFiles,
  onUploadAttachment,
  onDeleteAttachment,
}) => {

  return (
    <div className={containerClassName}>
      <FileUpload
        label={''}
        fileContainerStyle={attachContainerStyle()}
        withIcon={false}
        withPreview={false}
        onChange={onUploadAttachment}
        withPreview
        accept=".doc,.docx,.xml,image/*,video/*,.pdf,.csv"
        buttonStyles={attachButtonStyle()}
        buttonText={t['attach']}
        imgExtension={['.pdf']}
      />
    </div>
  );
};

export default AttachmentUploader;
