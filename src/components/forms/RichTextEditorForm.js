import React from 'react';
import RichTextEditor from '../inputs/RichTextEditor';
import { uploadImage } from '../../apis/questionsAPI';

const RichTextEditorForm = ({ richTextMediaId, updateRichTextMedia, initialContent, onContentUpdate, disabled, richTextRef }) => {
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
      disabled={disabled}
      richTextRef={richTextRef}
    />
  );
};

export default RichTextEditorForm;
