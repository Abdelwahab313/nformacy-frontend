import React from 'react';
import RichTextEditor from '../inputs/RichTextEditor';
import { uploadImage } from '../../apis/questionsAPI';

const RichTextEditorForm = ({ richTextMediaId, initialContent, onContentUpdate }) => {
  const uploadRichTextImage = (imageFormData, callback) => {
    if (richTextMediaId.current) {
      imageFormData.append('rich_text_media_id', richTextMediaId.current);
    }
    uploadImage(imageFormData).then(({ data }) => {
      callback(data['imageUrl']);
      richTextMediaId.current = data['richTextMediaId'];
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
