import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import CardAvatar from '@components/molecules/Avatars/CardAvatar';
import { Link } from 'react-router-dom';
import { BtnOutLine } from '@components/atoms/Buttons/BtnOutLine';
import { FaRegCommentAlt, FaRegBookmark  } from 'react-icons/fa';
import ThreeDots from '@components/atoms/ThreeDots';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';
import BoxIcons from '@components/molecules/BoxIcons';
import { IFPost } from '@models/IFPosts';
import moment from 'moment';
import { useOnClickOutside } from '@hooks/useOnClickOutside';

const CardFeatured = ({
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

  const createdAt = useMemo(() => {
    return moment(item?.user?.createdAt).format('MMM YY');
  }, [ item?.user?.createdAt ]);

  const savePost = () => false;

  const showBoxIcons = () => setIsShownBoxIcons(!isShownBoxIcons);

  useOnClickOutside(userBoxNode, isShownBoxIcons ? showBoxIcons : undefined);

  return (
    <CardBox>
      <CardAvatar
        link={`profile/${item?.user?.id}`}
        imageUrl={item?.user?.profilePhoto}
        userName={item?.user?.fullName}
        createAt={createdAt}
      />
      <CardBoxContent>
        <CardHeading>
          <Link to={'#'}>Title</Link>
        </CardHeading>
        {item?.tags && item.tags.length > 0 && (
          <CardTags>
            <ButtonTag>
              <Link to={'#'}>#Title</Link>
            </ButtonTag>
            <ButtonTag>
              <Link to={'#'}>#Title</Link>
            </ButtonTag>
          </CardTags>
        )}
        <CardBottom>
          <CardBottomColumn>
            <FaRegCommentAlt size={16} />
          </CardBottomColumn>
          <CardBottomColumn>
            <CardBottomRead>{item.daysAgo}</CardBottomRead>
            <CardBottomSave>
              <FaRegBookmark size={16} onClick={savePost}/>
            </CardBottomSave>
          </CardBottomColumn>
        </CardBottom>
      </CardBoxContent>

      <CardThreeDots ref={userBoxNode}>
        <ThreeDots size={22} handleClick={showBoxIcons}/>

        {isShownBoxIcons && <BoxIcon icons={items} />}
      </CardThreeDots>
    </CardBox>
  );
};

export default CardFeatured;

const CardBox = styled.div`
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.text1};
  position: relative;
`;

const CardBoxContent = styled.div`
  margin-top: 12px;
  padding-left: 55px;
`;

const CardHeading = styled.h2`
  margin-bottom: 12px;

  a {
    color: ${({ theme }) => theme.primary1};
    font-size: 26px;

    @media (min-width: 768px) and (max-width: 991px) {
      font-size: calc(21px + (26 - 21) * (100vw - 768px) / (991 - 768));
    }

    @media (max-width: 767px) {
      font-size: 19px;
    }
  }
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const ButtonTag = styled(BtnOutLine)`
  padding: 7px 20px 5px;
  font-size: 13px;
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
