import React, { useMemo } from 'react';
import {
  BiLike,
  BiSolidLike,
  BiDislike,
  BiSolidDislike,
  BiHeart,
  BiSolidHeart,
  BiStar,
  BiSolidStar
} from 'react-icons/bi';
import { TbHeartPlus } from 'react-icons/tb';
import { FaBookmark, FaRegBookmark  } from 'react-icons/fa';
import styled from 'styled-components';
import PopupActions from '@components/molecules/Popups/PopupActions';
import IconButton from '@components/atoms/IconButton';

const AsideLeftPost = () => {
  const isLike = false;
  const isDislike = false;
  const isHeart = false;
  const isStart = false;
  const isSave = false;

  const listIcons = useMemo(() => {
    return [
      {
        element: isLike ? BiSolidLike : BiLike,
        title: 'Like',
        link: '#',
        onClick: () => true
      },
      {
        element: isDislike ? BiSolidDislike : BiDislike,
        title: 'Dislike',
        link: '#',
        onClick: () => true
      },
      {
        element: isHeart ? BiSolidHeart : BiHeart,
        title: 'Heart',
        link: '#',
        onClick: () => true
      },
      {
        element: isStart ? BiSolidStar : BiStar,
        title: 'Star',
        link: '#',
        onClick: () => true
      }
    ];
  }, []);

  const handleSavePost = () => true;

  return (
    <AsideLef>
      <PopupActions
        iconButton={{
          Element: TbHeartPlus,
          sizeDots: 25,
          title: 'Add Reaction'
        }}
        boxIcons={{
          icons: listIcons,
          positionLeft: 'calc(100% + 10px)',
          positionTop: '0px'
        }}
      />
      <IconButtonBox>
        <IconButton
          Element={isSave ? FaBookmark : FaRegBookmark}
          size={18}
          handleClick={handleSavePost}
          title={'Save'}
        />
      </IconButtonBox>
      <PopupActions
        threeDot={{
          bgDots: 'transparent',
          sizeDots: 25
        }}
        boxLinks={{
          positionLeft: 'calc(100% + 10px)',
          positionTop: '0px'
        }}
      />
    </AsideLef>
  );
};

export default AsideLeftPost;

const AsideLef = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0;
  
  @media (min-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`;

const IconButtonBox = styled.div``;
