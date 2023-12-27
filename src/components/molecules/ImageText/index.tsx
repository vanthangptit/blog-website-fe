import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AVATAR_DEFAULT } from '@src/constants';
import { IFCategory } from '@models/IFCategory';

const ImageText = ({
  item,
  url,
  handleClick
}: {
  item: IFCategory,
  url: string
  handleClick?: (e: MouseEvent<HTMLDivElement>) => void
}) => {
  const click = (e: MouseEvent<HTMLDivElement>) => {
    if (handleClick) {
      e.stopPropagation();
      handleClick && handleClick(e);
    }
  };

  return (
    <Box onClick={(e) => click(e)}>
      <BoxLink to={url} state={{ _id: item?._id }}>
        <BoxBorder>
          <BoxImage>
            <img src={item?.image ?? AVATAR_DEFAULT} alt={item?.title} />
          </BoxImage>
        </BoxBorder>
        <BoxBody>
          <h5>{item?.title}</h5>
        </BoxBody>
      </BoxLink>
    </Box>
  );
};

export default ImageText;

const Box = styled.div`
  margin: 0 0 30px;
  padding: 0;
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

const BoxImage = styled.div`
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
