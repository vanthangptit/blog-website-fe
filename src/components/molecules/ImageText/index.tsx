import React, { MouseEvent, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AVATAR_DEFAULT } from '@src/constants';
import { IFCategory } from '@models/IFCategory';
import BoxIcons from '@components/molecules/BoxIcons';
import { AiOutlineEdit, AiOutlineForm } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';

const ImageText = ({
  item,
  url,
  handleClick,
  handleDelete
}: {
  item: IFCategory,
  url: string
  handleDelete?: (category: IFCategory) => void
  handleClick?: (e: MouseEvent<HTMLAnchorElement | MouseEvent>) => void
}) => {
  const click = (e: MouseEvent<HTMLAnchorElement | MouseEvent>) => {
    if (handleClick || !url) {
      e.stopPropagation();
      e.preventDefault();
    }

    handleClick && handleClick(e);
  };

  const items = useMemo(() => {
    return [
      {
        element: AiOutlineForm,
        title: 'Create Post',
        link: '/create-post',
        state: { _id: item?._id }
      },
      {
        element: AiOutlineEdit,
        title: 'Edit',
        link: `/category/${item._id}`,
        state: { _id: item?._id }
      },
      {
        element: BsTrash3,
        title: 'Delete',
        link: '#',
        state: { _id: item?._id },
        onClick: () => handleDelete && handleDelete(item)
      }
    ];
  }, [ item ]);

  return (
    <Box>
      <BoxLink
        to={url}
        state={{ _id: item?._id }}
        onClick={(e) => click(e)}
      >
        <BoxBorder>
          <BoxImage>
            <img src={item?.image ?? AVATAR_DEFAULT} alt={item?.title} />
          </BoxImage>
        </BoxBorder>
        <BoxBody>
          <h5>{item?.title}</h5>
        </BoxBody>
      </BoxLink>

      <BoxIcons
        className={'box-icons'}
        icons={items}
      />
    </Box>
  );
};

export default React.memo(ImageText);

const Box = styled.article`
  margin: 0 0 30px;
  padding: 0;
  position: relative;

  &::after {
    transition: all 0.3s;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.bgDarkOpacity};
    visibility: hidden;
    opacity: 0;
  }

  .box-icons {
    visibility: hidden;
    opacity: 0;
  }

  &:hover .box-icons,
  &:hover:after {
    visibility: visible;
    opacity: 1;
  }
`;

const BoxBorder = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.gray};
  border-bottom: none;
`;

const BoxLink = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
`;

const BoxImage = styled.figure`
  position: relative;
  padding-bottom: 100%;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BoxBody = styled.hgroup`
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.gray};
  text-align: center;

  h5 {
    font-size: 16px;
    color: ${({ theme }) => theme.primary1};
  }
`;
