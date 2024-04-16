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
import { UnauthorizedContext } from '@infra/../../services/context/UnauthorizedContext';
import { TOAST } from '@constants/toast';
import Profile from '@components/organisms/Profile';
import Account from '@components/organisms/Account';
import SiteAvatar from '@components/molecules/Avatars/SiteAvatar';
import { AVATAR_DEFAULT } from '@constants/aws/s3';

const spacing = '6rem';
const heightAvatar = 99;
const borderAvatar = 10;

const Settings = () => {
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
    <ContainerBg>
      {profile?.data && (
        <Layout12>
          <Box>
            <Tabs style={{ width: '100%' }}>
              <Row>
                <Column $mdWidth={'25%'}>
                  <ListInformation>
                    <TabList>
                      <Tab>Profile</Tab>
                      <Tab>Account</Tab>
                      <Tab>Saved posts</Tab>
                    </TabList>
                  </ListInformation>
                </Column>

                <Column $mdWidth={'75%'}>
                  <TabsBox>
                    <Header>
                      <Avatar>
                        <SiteAvatar
                          viewerPhoto={profile?.data?.profilePhoto ?? AVATAR_DEFAULT}
                          height={heightAvatar}
                        />
                      </Avatar>
                    </Header>

                    <TabPanel>
                      <Profile user={profile?.data} />
                    </TabPanel>
                    <TabPanel>
                      <Account user={profile?.data} />
                    </TabPanel>
                    <TabPanel>{TOAST.WARNING_UPDATING}</TabPanel>
                  </TabsBox>
                </Column>
              </Row>
            </Tabs>
          </Box>
        </Layout12>
      )}

      {profile?.statusCode && profile?.statusCode !== 200 && profile?.statusCode !== 401 && (
        <NotFound message={'SORRY! THIS USER DOES NOT EXISTS'} />
      )}
    </ContainerBg>
  );
};

export default Settings;

const ContainerBg = styled.div`
  // background-color: rgba(245, 245,245,1);
`;

const Box = styled.section`
  padding: 20px 0;
`;

const ListInformation = styled.div`
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0 0 10px;
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
      border: none;
      padding: 20px;
      flex-direction: column;
      padding: 0 0 25px;
      & li.react-tabs__tab--selected {
        background-color: ${({ theme }) => theme.bg4};
        color: ${({ theme }) => theme.black};
        font-family: ${({ theme }) => theme.fontRobotoBold};
      }
    }

    & li {
      padding: 8px 10px;
      cursor: pointer;
      outline: none;
      border-radius: 7px;

      &.react-tabs__tab--selected {
        font-family: ${({ theme }) => theme.fontRobotoBold};
      }
    }
  }
`;

const TabsBox = styled.div`
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