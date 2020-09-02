import React from 'react';
import RichTextEditor from '../inputs/RichTextEditor';
import { uploadImage } from '../../apis/questionsAPI';

const RichTextEditorForm = ({ mediaId, initialContent, onContentUpdate }) => {
  const uploadRichTextImage = (imageFormData, callback) => {
    if (mediaId.current) {
      imageFormData.append('media_id', mediaId.current);
    }
    uploadImage(mediaId.current, imageFormData).then(({ data }) => {
      callback(data['imageUrl']);
      mediaId.current = data['mediaId'];
    });
  };

  return (
    <RichTextEditor
      initialContent={initialContent}
      onContentChange={(content) => onContentUpdate(content)}
      onImageUpload={uploadRichTextImage}
    />
  );
};

export default RichTextEditorForm;
