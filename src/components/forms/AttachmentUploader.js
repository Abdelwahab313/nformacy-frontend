import {
  attachButtonStyle,
  attachContainerStyle,
} from '../../styles/questionRoasterStyles';
import t from '../../locales/en/questionRoaster.json';
import FileUpload  from '../inputs/FileUpload';
import { Grid } from '@material-ui/core';
import React from 'react';
import Chip from '@material-ui/core/Chip';

const AttachmentUploader = ({
  containerClassName,
  attachmentFiles,
  onUploadAttachment,
  onDeleteAttachment,
}) => {

  const removeFile = (file) => {

  }
  return (
    <div className={containerClassName}>
      <FileUpload
        label={''}
        fileContainerStyle={attachContainerStyle()}
        withIcon={false}
        withPreview={false}
        onChange={onUploadAttachment}
        withPreview
        accept='application/pdf'
        buttonStyles={attachButtonStyle()}
        buttonText={t['attach']}
        imgExtension={['.pdf']}
      />
      {/* {attachmentFiles?.length > 0 && (
        <Grid container alignItems={'center'} justify={'center'}>
          {attachmentFiles.map((attachment, index) => (
            <Grid item xs={12}>
              <Chip
                key={index}
                id={`attachment-${index}`}
                label={attachment.name}
                onDelete={() => onDeleteAttachment(index)}
                color='secondary'
              />
            </Grid>
          ))}
        </Grid>
      )} */}
    </div>
  );
};

export default AttachmentUploader;
