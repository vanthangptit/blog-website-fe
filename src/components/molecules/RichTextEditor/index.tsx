import 'react-quill/dist/quill.snow.css';

import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import {
  formats,
  fontSizeArr,
  headerArr,
  alignmentArr,
  otherOption,
  IOptions
} from '@constants/richtextEditor';
import { uploadFile } from '@utils/uploadFile';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import styled from 'styled-components';
import { IRichTextProps } from '@models/IFRichtext';

const Size = Quill.import('formats/size');

Size.whitelist = fontSizeArr;
Quill.register(Size, true);

const CustomToolbar = ({ toolbarId }: { toolbarId: string }) => {
  return (
    <ToolbarRichText id={'editor-' + toolbarId}>
      <QLAvailable>
        <span className="ql-formats">
          <select className="ql-header" defaultValue={''} onChange={(e: any) => e.persist()}>
            {headerArr?.map((item, index) => (
              <option value={item} key={index}/>
            ))}
          </select>
          <select title="Size" className="ql-size" defaultValue={'12'}>
            {fontSizeArr?.map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))}
          </select>
          <select className="ql-align" defaultValue={''}>
            {alignmentArr?.map((item, index) => (
              <option value={item} key={index} />
            ))}
          </select>
        </span>
        {otherOption?.map((item, index) => (
          <span className={item.classNameGroup} key={index}>
            {item.options?.map((option: IOptions, indx) => option?.value ? (
              <button className={option.className} key={indx} value={option.value} />
            ) : option?.valueArray ? (
              <select className={option.className} defaultValue={option.valueArray[0]} key={indx}>
                {option.valueArray?.map((item, index) => (
                  <option value={item} key={index} />
                ))}
              </select>
            ) : (
              <button className={option.className} key={indx} />
            ))}
          </span>
        ))}
      </QLAvailable>
    </ToolbarRichText>
  );
};

const RichTextEditor = (props: IRichTextProps) => {
  const {
    $heightEditor,
    toolbarId,
    value,
    setValueRichText,
    label,
    placeholder,
    customClass,
    setFileUpload,
    valueDescError
  } = props;
  const [ errorMessage, setErrorMessage ] = useState<string>();
  const quillRef = useRef<any>();

  const imageHandler = async () => {
    const quillObj = quillRef.current.getEditor();
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    const callback = (rs: ManagedUpload.SendData) => {
      setFileUpload(rs);
      const range = quillObj.getSelection();
      quillObj.editor.insertEmbed(range.index, 'image', rs.Location);
      quillObj.setSelection(range.index + 1);
      setErrorMessage(undefined);
    };

    input.onchange = async () => {
      const file: any = input && input.files ? input.files[0] : null;
      await uploadFile({ file, callback, setErrorMessage });
    };
  };

  const handleChange = (html: string) => {
    setValueRichText(html);
  };

  const modules = React.useMemo(() => (
    {
      toolbar: {
        container: '#editor-' + toolbarId,
        'handlers': {
          'image': imageHandler
        }
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false
      }
    }
  ), [ toolbarId ]);

  useEffect(() => {
    quillRef.current?.editor.root.setAttribute('spellcheck', 'false');
  }, []);

  useEffect(() => {
    setErrorMessage(valueDescError);
  }, [ valueDescError ]);

  return (
    <>
      <TextEditor className={'text-editor ' + (customClass ?? '')} $heightEditor={$heightEditor}>
        {label ? <TextEditorLabel>{label}</TextEditorLabel> : ''}
        <CustomToolbar toolbarId={toolbarId} />
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          formats={formats}
          modules={modules}
          theme='snow'
        />
        {errorMessage && errorMessage?.length && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </TextEditor>
    </>
  );
};

export default RichTextEditor;

const TextEditor = styled.div<{ $heightEditor?: string}>`
  & .ql-editor {
    height: ${({ $heightEditor }) => $heightEditor ? $heightEditor : '460px'};

    &::-webkit-scrollbar {
      width: 6px;
    };

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.gray6};
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background:${({ theme }) => theme.gray6};
    }

    & img {
      max-width: 100%;
      width: auto;
    }
  }
`;

const TextEditorLabel = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontRobotoBold};
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: space-between;
  row-gap: 10px;
`;

const ToolbarRichText = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.white};

  & .ql-header:hover {
    background-color: #545454;
  }
`;

const QLAvailable = styled.div`
  display: flex;
  justify-content: start;
  flex: 1 1 auto;
  margin-right: 5px;

  & .ql-header:hover {
    background-color: transparent;
  }
`;

const ErrorMessage = styled.div`
  color: #E30000;
  font-size: 15px;
  margin: 10px 0 24px;
`;
