import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import styled from 'styled-components';
import { LabelField } from '@components/atoms/Label';
import styles from '@constants/styles';
import { IFSearchTag } from '@models/IFTags';
import { MessageError } from '@components/atoms/MessageError';

const KeyCodes = {
  comma: 188,
  enter: 13,
  tab: 9
};

const delimiters = [ KeyCodes.comma, KeyCodes.enter, KeyCodes.tab ];

const SearchTags = ({
  setTags,
  tags,
  label,
  $height,
  $with,
  suggestions,
  valueTagError
}: {
  setTags: (newState: IFSearchTag[]) => void
  tags: IFSearchTag[]
  suggestions: IFSearchTag[]
  label?: string
  valueTagError?: string
  $height: string
  $with: string
}) => {
  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: IFSearchTag) => {
    setTags([ ...tags, {
      id: tag.id,
      text: tag.text.includes('#') ? tag.text : '# ' + tag.text
    } ]);
  };

  return (
    <Box>
      {label && <LabelField>{label}</LabelField>}
      <SearchBox $height={$height} $with={$with} $isDisabled={tags.length >= 3}>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          allowDragDrop={false}
          // handleDrag={handleDrag}
          // handleTagClick={handleTagClick}
          inputFieldPosition='bottom'
          autofocus={false}
          placeholder={'Add up to 3 tags...'}
          classNames={{
            tags: 'search-tag',
            tagInput: 'search-tag__form-control',
            tagInputField: 'search-tag__input-element',
            selected: 'search-tag__selected-list',
            tag: 'search-tag__selected-item',
            remove: 'search-tag__icon-close',
            suggestions: 'search-tag__suggestions',
            activeSuggestion: 'search-tag__activeSuggestion'
          }}
          inputProps = {{
            disabled: tags.length >= 3
          }}
        />
      </SearchBox>
      {valueTagError && <MessageError>{valueTagError}</MessageError>}
    </Box>
  );
};

export default SearchTags;

const Box = styled.div`
  position: relative;
  margin-bottom: 25px;
`;

const SearchBox = styled.div<{ $height: string; $with: string; $isDisabled: boolean }>`
  .search-tag {
    position: relative;
    display: flex;
    flex-direction: column-reverse;

    &__form-control {
      height: ${({ $height }) => $height ? $height : '40px'};
      width: ${({ $with }) => $with ? $with : 'auto'};
      margin-bottom: 10px;
      position: relative;
    }

    &__input-element {
      height: ${({ $height }) => $height ? $height : '40px'};
      padding: 10px 15px;
      width: ${({ $with }) => $with ? $with : 'auto'};
      color: ${({ theme }) => theme.text1};
      background-color: ${({ theme }) => theme.bg0};
      border: 1px solid ${({ theme, $isDisabled }) => $isDisabled ? theme.gray3 : theme.inputPlaceholder};
      cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'auto'};

      &::placeholder {
        color: ${({ theme }) => theme.inputPlaceholder};
        opacity: 1; /* Firefox */
      }

      &::-ms-input-placeholder { /* Edge 12 -18 */
        color: ${({ theme }) => theme.inputPlaceholder};
      }
    }

    &__selected-list {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }

    &__selected-item {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: ${({ theme }) => theme.fontRobotoLight};
      text-transform: lowercase;
      padding: 7px 5px;
      background-color: ${({ theme }) => theme.gray2};
      border-radius: 3px;
    }

    &__icon-close {
      background-color: ${({ theme }) => theme.transparent};
      border: none;
      font-size: 32px;
      border-radius: 0;
      line-height: 0;
      padding-bottom: 5px;
      cursor: pointer;
    }

    &__suggestions {
      position: absolute;
      z-index: ${styles.zIndex.highest - 1};
      background-color: ${({ theme }) => theme.white};
      width: 100%;
      max-height: 350px;
      overflow-y: auto;
      box-shadow: 0.05em 0.01em 0.5em rgba(0, 0, 0, 0.2);

      ul {
        list-style-type: none;
        padding: 15px 10px;
      }

      li {
        font-family: ${({ theme }) => theme.fontRobotoLight};
        padding: 5px 10px;
      }

      // mark {
      //   text-decoration: underline;
      //   background: none;
      //   font-weight: 600;
      // }
    }

    &__activeSuggestion {
      background: #b7cfe0;
      cursor: pointer;
    }
    svg {
      padding: 0 5px;
    }
  }
`;