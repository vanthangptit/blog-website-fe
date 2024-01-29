import React from 'react';
import { Column, Row } from '@components/atoms/Layout';
import SectionTitle from '@components/molecules/Titles/SectionTitle';
import styled from 'styled-components';
import { IUser } from '@models/IFUser';
import FormFirstName from '@components/molecules/Forms/FormFirstName';
import FormLastName from '@components/molecules/Forms/FormLastName';
import FormUserAddress from '@components/molecules/Forms/FormUserAddress';
import FormUserJob from '@components/molecules/Forms/FormUserJob';
import FormUserGender from '@components/molecules/Forms/FormUserGender';
import FormUserBirthDay from '@components/molecules/Forms/FormUserBirthDay';
import FormEmail from '@components/molecules/Forms/FormEmail';
import SiteAvatar from '@components/molecules/Avatars/SiteAvatar';
import { AVATAR_DEFAULT } from '@constants/aws/s3';
import FormProfilePhoto from '@components/molecules/Forms/FormProfilePhoto';
import FormUserSchool from '@components/molecules/Forms/FormUserSchool';
import FormUserAlias from '@components/molecules/Forms/FormUserAlias';

const spacing = '6rem';
const heightAvatar = 99;
const borderAvatar = 10;

const ProfileForm = ({ user }: { user: IUser }) => {
  return (
    <ProfileBox>
      <Header>
        <Avatar>
          <SiteAvatar
            viewerPhoto={user?.profilePhoto ?? AVATAR_DEFAULT}
            height={heightAvatar}
          />
        </Avatar>

      </Header>
      <Row>
        <Column>
          <SectionTitle title={'Account information'}/>
        </Column>
        <Column>
          <FormUserAlias alias={user?.alias} />
        </Column>
        <Column>
          <FormFirstName firstName={user?.firstName}/>
        </Column>
        <Column>
          <FormLastName lastName={user?.lastName}/>
        </Column>
        <Column>
          <FormEmail email={user?.email}/>
        </Column>
        <Column>
          <FormProfilePhoto profilePhoto={user?.profilePhoto ?? AVATAR_DEFAULT} />
        </Column>
      </Row>

      <Row>
        <Column>
          <SectionTitle title={'Other information'}/>
        </Column>
        <Column>
          <FormUserBirthDay birthDay={user?.birthDay ?? null}/>
        </Column>
        <Column>
          <FormUserGender gender={user?.gender}/>
        </Column>
        <Column>
          <FormUserAddress address={user?.address}/>
        </Column>
        <Column>
          <FormUserJob job={user?.job}/>
        </Column>
        <Column>
          <FormUserSchool school={user?.school} />
        </Column>
      </Row>
    </ProfileBox>
  );
};

export default React.memo(ProfileForm);

const ProfileBox = styled.div`
  width: 100%;
  padding: ${spacing} 20px 20px;
  background-image: linear-gradient(${({ theme }) => theme.bg4} ${spacing}, rgba(0, 0, 0, 0) ${spacing});
  border-radius: 5px 5px 0 0;
  border: 1px solid ${({ theme }) => theme.bg4};
`;

const Avatar = styled.div`
  display: inline-flex;
  border: ${borderAvatar}px solid ${({ theme }) => theme.bg4};
  border-radius: 50%;
  width: ${heightAvatar + (borderAvatar * 2) - 1}px;
  height: ${heightAvatar + (borderAvatar * 2) - 1}px;
`;

const Header = styled.div`
  margin-top: -${(heightAvatar + (borderAvatar * 2) - 1) / 2}px;
  text-align: center;
  margin-bottom: 25px;
`;
