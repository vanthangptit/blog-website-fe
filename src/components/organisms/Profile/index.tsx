import React from 'react';
import { Column, Row } from '@components/atoms/Layout';
import SectionTitle from '@components/molecules/Titles/SectionTitle';
import { IUser } from '@models/IFUser';
import FormFirstName from '@components/molecules/Forms/FormFirstName';
import FormLastName from '@components/molecules/Forms/FormLastName';
import FormUserAddress from '@components/molecules/Forms/FormUserAddress';
import FormUserJob from '@components/molecules/Forms/FormUserJob';
import FormUserGender from '@components/molecules/Forms/FormUserGender';
import FormUserBirthDay from '@components/molecules/Forms/FormUserBirthDay';
import FormEmail from '@components/molecules/Forms/FormEmail';
import { AVATAR_DEFAULT } from '@constants/aws/s3';
import FormProfilePhoto from '@components/molecules/Forms/FormProfilePhoto';
import FormUserSchool from '@components/molecules/Forms/FormUserSchool';
import FormUserAlias from '@components/molecules/Forms/FormUserAlias';

const Profile = ({ user }: { user: IUser }) => {
  return (
    <>
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
          {/*<FormUserBio description={user?.description}/>*/}
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
    </>
  );
};

export default React.memo(Profile);
