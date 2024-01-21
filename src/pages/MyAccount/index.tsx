import React, { useContext, useEffect } from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel
} from 'react-tabs';
import { Row, Column } from '@components/atoms/Layout';
import styled from 'styled-components';
import Layout12 from '@components/organisms/Layout-12';
import { useUser } from '@hooks/useUser';
import NotFound from '@components/molecules/NotFound';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';
import ProfileForm from '@components/organisms/ProfileForm';
import { TOAST } from '@constants/toast';

const MyAccount = () => {
  const { setUnauthorized } = useContext(UnauthorizedContext);
  const { getProfile, profile } = useUser();

  useEffect(() => {
    getProfile()
      .unwrap()
      .then((rs) => {
        if (rs.status === 401 || rs.statusCode === 401) {
          setUnauthorized(true);
        }
      });
  }, []);

  return (
    <>
      {profile?.data && (
        <Layout12>
          <Box>
            <Tabs style={{ width: '100%' }}>
              <Row>
                <Column $mdWidth={'35%'}>
                  <ListInformation>
                    <TabList>
                      <Tab>My profile</Tab>
                      <Tab>Saved posts</Tab>
                    </TabList>
                  </ListInformation>
                </Column>

                <Column $mdWidth={'65%'}>
                  <TabPanel>
                    <ProfileForm user={profile?.data} />
                  </TabPanel>
                  <TabPanel>{TOAST.WARNING_UPDATING}</TabPanel>
                </Column>
              </Row>
            </Tabs>
          </Box>
        </Layout12>
      )}

      {profile?.statusCode && profile?.statusCode !== 200 && profile?.statusCode !== 401 && (
        <NotFound message={'SORRY! THIS USER DOES NOT EXISTS'} />
      )}
    </>
  );
};

export default MyAccount;

const Box = styled.section`
  padding: 20px 0;
`;

const ListInformation = styled.div`
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 15px;
    padding: 0 0 25px;
    margin-bottom: 25px;
    color: ${({ theme }) => theme.primary5};
    border-bottom: 1px solid ${({ theme }) => theme.primary4};
    white-space: nowrap;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.gray7};
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.gray7};
    }

    @media (min-width: 768px) {
      border: 1px solid ${({ theme }) => theme.primary4};
      border-radius: 7px;
      padding: 20px;
      flex-direction: column;
    }

    & li {
      cursor: pointer;
      outline: none;
    }
  }
`;
