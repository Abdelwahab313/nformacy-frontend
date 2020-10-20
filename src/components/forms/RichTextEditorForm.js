import React from 'react';
import RichTextEditor from '../inputs/RichTextEditor';
import { uploadImage } from '../../apis/questionsAPI';

const RichTextEditorForm = ({ richTextMediaId, updateRichTextMedia, initialContent, onContentUpdate }) => {
  const uploadRichTextImage = (imageFormData, callback) => {
    if (!!richTextMediaId) {
      imageFormData.append('rich_text_media_id', richTextMediaId);
    }
    uploadImage(imageFormData).then(({ data }) => {
      callback(data['imageUrl']);
      updateRichTextMedia(data['richTextMediaId']);
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
