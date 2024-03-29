import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Field } from 'react-final-form';
// interface AdapterProp {
//   input: {
//     onChange: (event: any) => void;
//     value: string;
//   };
// }

export const Adapter  = ({ ...rest }) => {
  const { onChange, value } = rest.input;

  const toolbar =
    'fullscreen | undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help';
  const plugins = [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
  ];

  const [screenWidth] = React.useState(window.innerWidth);

  const init = screenWidth < 600
    ? {
        height: '95vw',
        width: '100vw',
        menubar: true,
        plugins,
        toolbar,
      }
    : {
        height: '50vw',
        width: '100%',
        menubar: true,
        plugins,
        toolbar,
      }; 

  return (
    <Editor
      data-test-id="text-area-adapter"
      test-dataid="textAreaAdapter"
      value={value}
      init={init}
      onEditorChange={onChange}
      {...rest}
    />
  );
};

const TextAreaAdapter = () => {
  const comp = navigator.onLine ? (
    <Field name="description" id="description" >
      {({ ...rest }) => <Adapter {...rest} />}
    </Field>
  ) : (
    <Field name="description" id="description" >
      {({ ...rest }) => {
        const { onChange, value } = rest.input;
        return <textarea name="description" id="description"   onChange={onChange} value={value} {...rest} />;
      }}
    </Field>
  );

  return comp;
};

export default TextAreaAdapter;
