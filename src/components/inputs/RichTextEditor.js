import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TINY_MCE_API_KEY } from 'settings';
import { useTranslation } from 'react-i18next';

// TODO needs to handle loading for fetching user data
const RichTextEditor = ({
  initialContent,
  onContentChange,
  onImageUpload,
  disabled,
  richTextRef = null,
}) => {
  const handleEditorChange = (content) => {
    !!onContentChange && onContentChange(content);
  };
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  //TODO Handle remove image
  return (
    <Editor
      apiKey={TINY_MCE_API_KEY}
      id='richContent'
      ref={richTextRef}
      onEditorChange={handleEditorChange}
      initialValue={initialContent}
      disabled={disabled}
      init={{
        selector: 'textarea',  
        language : isArlang ? 'ar' : 'en',
        height: 500,
        file_picker_types: 'image',
        plugins: [
          'advlist autolink lists link image imagetools charmap print preview anchor',
          'searchreplace visualblocks fullscreen',
          'insertdatetime media table paste wordcount',
        ],
   
        toolbar:
          'undo redo link image | formatselect | bold italic backcolor forecolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | wordcount',
        elementpath: false,
        file_picker_callback: function(cb) {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          /*
          Note: In modern browsers input[type="file"] is functional without
          even adding it to the DOM, but that might not be the case in some older
          or quirky browsers like IE, so you might want to add it to the DOM
          just in case, and visually hide it. And do not forget do remove it
          once you do not need it anymore.
        */

          input.onchange = function() {
            const file = this.files[0];
            const formData = new FormData();
            formData.append('image', file, this.files[0].name);

            const reader = new FileReader();
            reader.onload = function() {
              onImageUpload(formData, cb);
              /*
              Note: Now we need to register the blob in TinyMCEs image blob
              registry. In the next release this part hopefully won't be
              necessary, as we are looking to handle it internally.
            */
              // const id = 'blobid' + new Date().getTime();
              // const blobCache = this.editorUpload.blobCache;
              // const base64 = reader.result.split(',')[1];
              // const blobInfo = blobCache.create(id, file, base64);
              // blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
   
      }}
    />
  );
};

export default RichTextEditor;
