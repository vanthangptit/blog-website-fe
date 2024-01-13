import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ThreeDots from '@components/atoms/ThreeDots';
import BoxIcons from '@components/molecules/BoxIcons';
import { IFPost } from '@models/IFPosts';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { Row, Column } from '@components/atoms/Layout';
import EscapeHTML from '@components/atoms/EscapeHTML';

import { FaRegCommentAlt, FaCommentAlt, FaRegBookmark, FaBookmark  } from 'react-icons/fa';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import { BsEye, BsTrash3 } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { TbView360, TbView360Off } from 'react-icons/tb';

const CardPost = ({
  item,
  handleDelete
}: {
  item: IFPost,
  handleDelete: (postId: string) => void
}) => {
  const [ isShownBoxIcons, setIsShownBoxIcons ] = useState<boolean>(false);
  const userBoxNode = React.useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => {
    return [
      {
        element: AiOutlineEdit,
        title: 'Edit',
        link: `/edit-post/${item.shortUrl ?? item.id}`
      },
      {
        element: BsTrash3,
        title: 'Delete',
        link: '#',
        onClick: () => handleDelete(item.id)
      }
    ];
  }, [ item ]);

  const savePost = () => false;


  const showBoxIcons = () => setIsShownBoxIcons(!isShownBoxIcons);
  useOnClickOutside(userBoxNode, isShownBoxIcons ? showBoxIcons : undefined);

  return (
    <CardBox>
      <Row>
        <Column $lgWidth={'17%'} $smWidth={'25%'}>
          <BoxImage>
            <img src={item?.imageUrl} alt={item?.title} />
          </BoxImage>
        </Column>
        <Column $lgWidth={'83%'} $smWidth={'75%'}>
          <CardTitle>
            <Link to={`/post/${item.shortUrl}`}>{item.title}</Link>
          </CardTitle>
          <CardDescription>
            <EscapeHTML htmlString={item.description} />
          </CardDescription>

          {/*@todo: Add tags*/}

          <CardBottom>
            <CardBottomColumn>
              <BoxCounts>
                <span>{item.commentsCount}</span>
                {item.commentsCount > 0
                  ? <FaCommentAlt size={15} title={'Comments'}/>
                  : <FaRegCommentAlt size={15} title={'Comments'}/>}
              </BoxCounts>
              <BoxCounts>
                <span>{item.likesCount}</span>
                {item.likesCount > 0
                  ? <BiSolidLike size={16} title={'Like'}/>
                  : <BiLike size={16} title={'Like'}/>}
              </BoxCounts>
              <BoxCounts>
                <span>{item.disLikesCount}</span>
                {item.disLikesCount > 0
                  ? <BiSolidDislike size={16} title={'Dislike'}/>
                  : <BiDislike size={16} title={'Dislike'}/>}
              </BoxCounts>
              <BoxCounts>
                <span>{item.viewsCount}</span>
                {item.viewsCount > 0
                  ? <BsEye size={16} title={'Views'}/>
                  : <BsEye size={16} title={'Views'}/>}
              </BoxCounts>
              <BoxCounts>
                {item.isPublished
                  ? <TbView360 size={16} title={'Publish'}/>
                  : <TbView360Off size={16} title={'Private'}/>
                }
              </BoxCounts>

            </CardBottomColumn>
            <CardBottomColumn>
              <CardBottomRead>{item.daysAgo}</CardBottomRead>
              <CardBottomSave>
                <FaRegBookmark size={16} onClick={savePost}/>
              </CardBottomSave>
            </CardBottomColumn>
          </CardBottom>
        </Column>
      </Row>

      <CardThreeDots ref={userBoxNode}>
        <ThreeDots size={22} handleClick={showBoxIcons}/>

        {isShownBoxIcons && <BoxIcon icons={items} />}
      </CardThreeDots>
    </CardBox>
  );
};

export default CardPost;

const CardBox = styled.div`
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.text1};
  position: relative;

  @media (min-width: 768px) {
    padding: 25px;
  }
`;

const BoxImage = styled.figure`
  position: relative;
  padding-bottom: 100%;
  margin: 0;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardTitle = styled.div`
  margin-bottom: 3px;
  font-family: ${({ theme }) => theme.fontRobotoBold};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    color: ${({ theme }) => theme.primary1};
    font-size: 26px;
  }
  
  @media (min-width: 768px) and (max-width: 991px) {
    a {
      font-size: calc(21px + (26 - 21) * (100vw - 768px) / (991 - 768));
    }
  }

  @media (max-width: 767px) {
    -webkit-line-clamp: 2;
    a {
      font-size: 19px;
    }
  }
`;

const CardDescription = styled.div`
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
   @media (max-width: 767px) {
    -webkit-line-clamp: 3;
  }
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 12px;
  flex: 1;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const CardBottomColumn = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  color: ${({ theme }) => theme.primary1};
`;

const CardBottomSave = styled.span`
  cursor: pointer;
  display: inline-flex;
`;

const CardBottomRead = styled.small`
  color: ${({ theme }) => theme.gray6};
`;

const CardThreeDots = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const BoxIcon = styled(BoxIcons)`
  gap: 5px;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 5px;
  padding: 10px;
`;

const BoxCounts = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  span {
    padding-top: 2px;
  }
`;
