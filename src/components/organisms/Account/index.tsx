import React from 'react';
import { Column, Row } from '@components/atoms/Layout';
import SectionTitle from '@components/molecules/Titles/SectionTitle';
import { IUser } from '@models/IFUser';
import FormNewPassword from '@components/molecules/Forms/FormNewPassword';

const Account = ({ user }: { user: IUser }) => {
  return (
    <>
      <Row>
        <Column>
          <SectionTitle title={'Account information'}/>
        </Column>
        <Column>
          <FormNewPassword isLoginGoogle={user?.isLoginGoogle} password={user?.password} />
        </Column>
        <Column>
          <SectionTitle title={'Delete account'}/>
        </Column>
      </Row>
    </>
  );
};

export default React.memo(Account);
