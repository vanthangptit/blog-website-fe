import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AVATAR_DEFAULT } from '@src/constants';
import { IFResponseCategories } from '@models/IFCategory';

const ImageText = ({ item }: { item: IFResponseCategories }) => {
  return (
    <Box>
      <BoxLink to={'/create'} state={{ _id: item?._id }}>
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

const Box = styled.article`
  margin: 0 0 30px;
  padding: 0;
`;

const BoxBorder = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colorBorderCard};
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
  border: 1px solid ${({ theme }) => theme.colorBorderCard};
  text-align: center;

  h5 {
    font-size: 16px;
    color: ${({ theme }) => theme.primary1};
  }
`;