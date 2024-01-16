import React from 'react';
import styled from 'styled-components';
import CardAvatar from '@components/molecules/Avatars/CardAvatar';
import Button from '@components/molecules/Buttons';
import { formatDatetimeByMonthYear } from '@utils/formatDatetime';

/**
 * @param user
 * @constructor
 * @todo: user must haven't any type
 */

const AsideRightPost = ({ user, postRelated }: { user: any, postRelated?: any }) => {
  return (
    <AsideRight>
      <Box>
        <BoxProfile>
          <CardAvatar
            link={`/profile/${user.id}`}
            imageUrl={user?.profilePhoto}
            userName={user?.fullName}
            createAt={`Joined on ${formatDatetimeByMonthYear(user.createdAt)}`}
          />

          <Button
            size={'sm'}
            text={'Follow'}
            buttonType={'button'}
          />
        </BoxProfile>

        {user?.description && (
          <UserInfo>{user?.description}</UserInfo>
        )}

        {(user?.address || user?.job) && (
          <UserInfo>
            <UserInfoList>
              {user?.address && (
                <UserInfoListItem>
                  <h4>Location</h4>
                  <p>Hoai Duc, Ha Noi City</p>
                </UserInfoListItem>
              )}
              {user?.job && (
                <UserInfoListItem>
                  <h4>Work</h4>
                  <p>FullStack developer at Dandelions Labs</p>
                </UserInfoListItem>
              )}
            </UserInfoList>
          </UserInfo>
        )}
      </Box>
      <Box>
        <BoxProfile>
          <h3>More from <a href={`/profile/${user.id}`} style={{ color: '#bc2e1d' }}>{user?.fullName}</a></h3>
          {postRelated && (
            <h4>Have not post related</h4>
          )}
        </BoxProfile>
      </Box>
    </AsideRight>
  );
};

export default React.memo(AsideRightPost);

const AsideRight = styled.div`
  width: 100%;
`;

const Box = styled.div`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.gray3};
  margin-bottom: 25px;
`;

const UserInfoList = styled.ul`
  list-style: none;
`;

const UserInfoListItem = styled.li`
  padding-bottom: 10px;
`;

const UserInfo = styled.div`
  margin: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.text4};
`;

const BoxProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  padding: 15px;
  background-color: ${({ theme }) => theme.gray3};
`;
