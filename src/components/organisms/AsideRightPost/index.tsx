import React from 'react';
import styled from 'styled-components';
import CardAvatar from '@components/molecules/Avatars/CardAvatar';
import Button from '@components/molecules/Buttons';
import { formatDatetimeByMonthYear } from '@utils/formatDatetime';
import { IUser } from '@models/IFUser';
import { IFPost } from '@models/IFPosts';
import SectionTitleH4 from '@components/molecules/Titles/SectionTitleH4';

/**
 * @param user
 * @constructor
 * @todo: show postRelated card
 * @todo: Button follow
 */

const AsideRightPost = ({ user, postRelated }: { user: IUser, postRelated?: IFPost }) => {
  const handleClick = () => true;

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
            handleClick={handleClick}
          />
        </BoxProfile>

        {user?.description && (
          <UserInfo>{user?.description}</UserInfo>
        )}

        {(user?.address || user?.job) && (
          <UserInfo>
            {user?.address && (
              <SectionTitleH4
                title={'Location'}
                des={user?.address}
              />
            )}
            {user?.job && (
              <SectionTitleH4
                title={'Work'}
                des={user?.job}
              />
            )}
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
