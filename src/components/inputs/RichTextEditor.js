import { Editor } from '@tinymce/tinymce-react';
import React from 'react';


const RichTextEditor = ({ initialContent, onContentChange, onImageUpload }) => {
  const handleEditorChange = (content, _) => {
    !!onContentChange && onContentChange(content);
  };
  //TODO Handle remove image
  return (<Editor
    id='richContent'
    onEditorChange={handleEditorChange}
    initialValue={initialContent}
    init={{
      height: 500,
      file_picker_types: 'image',
      plugins: [
        'advlist autolink lists link image imagetools charmap print preview anchor',
        'searchreplace visualblocks fullscreen',
        'insertdatetime media table paste wordcount',
      ],
      toolbar:
        'undo redo link image | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat',
      file_picker_callback: function(cb, value, meta) {
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
            onImageUpload(formData, cb)
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
  />);
};


export default RichTextEditor;