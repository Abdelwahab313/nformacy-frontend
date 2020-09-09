import React, { useState } from 'react';

import FlipMove from 'react-flip-move';
import { Chip, Grid, IconButton, Link } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownload';

import {
  attachButtonStyle,
  attachContainerStyle,
} from '../../styles/questionRoasterStyles';
import {
  removeAttachment,
  uploadAttachment
} from '../../apis/questionsAPI';
import t from '../../locales/en/questionRoaster.json';
import FileUpload from '../inputs/FileUpload';


const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%"
};


const AttachmentUploader = ({
  containerClassName,
  attachments,
  attachmentsGroupsId,
  setAttachmentsGroupsId
}) => {
  const [attachmentFiles, setAttachmentFiles] = useState(attachments);

  console.log('------ attachments', attachments)
  console.log('------ attachments', attachmentFiles)

  const onUploadAttachment = (attachmentFile) => {
    const fileBlob = new Blob(attachmentFile);
    const formData = new FormData();
    formData.append('attachment[]', fileBlob, attachmentFile[0].name);
    formData.append('attachments_groups_id', attachmentsGroupsId);

    uploadAttachment(formData).then((response) => {
      const returnedAttachments = response.data.attachments;
      if (returnedAttachments.length >= 1) {
        setAttachmentsGroupsId(response.data.attachmentsGroupsId)
        setAttachmentFiles(returnedAttachments);
      } else {
        console.log('something error with attachments');
      }
    });
  };

  const onDeleteAttachment = (attachmentId) => {
    removeAttachment(attachmentId)
      .then((response) => {
        console.log('file deleted');
        const attachmentAfterDelete = attachmentFiles.filter((attachment) => (attachment.signedId !== attachmentId));
        setAttachmentFiles(attachmentAfterDelete);
       });
  };


  const renderPreviewFiles = () => {
    return attachmentFiles.map((file, index) => {
      console.log('picture', file)
      return (
        <Grid key={index} item xs={12}>
          <Chip
            key={index}
            icon={<IconButton onClick={() => window.open(file.url)}><DownloadIcon /></IconButton>}
            id={`attachment-${index}`}
            label={file.filename}
            onDelete={() => onDeleteAttachment(file.signedId)}
          />
        </Grid>
      );
    });
  }

  return (
    <div className={containerClassName}>
      <Grid container direction="column" alignItems={'flex-start'}>
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
        />
        <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
          {(!!attachmentFiles && attachmentFiles.length > 0) && renderPreviewFiles()}
        </FlipMove>
      </Grid>
    </div>
  );
};

export default AttachmentUploader;
