import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Row, Column } from '@components/atoms/Layout';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout12 from '@components/organisms/Layout-12';
import SingleTitle from '@components/molecules/Titles/SingleTitle';
import FormControl from '@components/molecules/FormControl';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Textarea from '@components/atoms/Textarea';
import Select from '@components/molecules/Select';
import { GENDER } from '@constants/selects';
import FieldBoxChange from '@components/molecules/Fields/FieldBoxChange';
import DateTimePicker from '@components/molecules/DateTimePicker';
import SectionTitle from '@components/molecules/Titles/SectionTitle';

const MyAccount = () => {
  const location: any = useLocation();
  const { shortUrl } = useParams();
  const [ datetime, setDate ] = useState<Date | null>(null);
  const {
    // setValue,
    control,
    handleSubmit,
    register,
    formState
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async data => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(location);
  }, [ shortUrl ]);

  // eslint-disable-next-line no-console
  console.log(typeof datetime);

  return (
    <Layout12>
      <Header>
        <SingleTitle title={'My Profile'} />
      </Header>

      <div>
        <Tabs style={{ width: '100%' }}>
          <Row>
            <Column $mdWidth={'35%'}>
              <ListInformation>
                <TabList>
                  <Tab>Person Information</Tab>
                  <Tab>My futures</Tab>
                </TabList>
              </ListInformation>
            </Column>

            <Column $mdWidth={'65%'}>
              <TabPanel>
                <FormElement onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Column>
                      <SectionTitle title={'Account information'}/>
                    </Column>
                    <Column>
                      <FieldBoxChange
                        label={'First name'}
                      >
                        <FormControl
                          register={register}
                          formState={formState}
                          textEr={'First name is required'}
                          typeField={'text'}
                          nameField={'firstName'}
                          $with={'100%'}
                          $height={'45px'}
                          $minLength={3}
                          $maxLength={25}
                          placeholder={'New first name...'}
                        />
                      </FieldBoxChange>
                    </Column>
                    <Column>
                      <FieldBoxChange
                        label={'Last name'}
                      >
                        <FormControl
                          register={register}
                          formState={formState}
                          textEr={'Last name is required'}
                          typeField={'text'}
                          nameField={'lastName'}
                          $with={'100%'}
                          $height={'45px'}
                          $minLength={3}
                          $maxLength={25}
                          placeholder={'New last name...'}
                        />
                      </FieldBoxChange>
                    </Column>
                    <Column>
                      <FieldBoxChange
                        label={'Email'}
                      >
                        <FormControl
                          register={register}
                          formState={formState}
                          textEr={'Email is required'}
                          typeField={'email'}
                          nameField={'email'}
                          $with={'100%'}
                          $height={'45px'}
                          $minLength={3}
                          $maxLength={25}
                          placeholder={'New email...'}
                        />
                      </FieldBoxChange>
                    </Column>
                    <Column>
                      <FieldBoxChange
                        label={'Password'}
                      >
                        <FormControl
                          register={register}
                          formState={formState}
                          textEr={'Password is required'}
                          typeField={'password'}
                          nameField={'password'}
                          placeholder={'Password'}
                          $with={'100%'}
                          $height={'45px'}
                        />
                        <FormControl
                          register={register}
                          formState={formState}
                          textEr={'This field is required'}
                          typeField={'password'}
                          nameField={'newPassword'}
                          $with={'100%'}
                          $height={'45px'}
                          placeholder={'New password'}
                        />
                      </FieldBoxChange>
                    </Column>
                    <Column>
                      <FieldBoxChange
                        label={'Description'}
                      >
                        <Textarea
                          register={register}
                          formState={formState}
                          nameField={'description'}
                          placeholder={'Write a small introduction about yourself...'}
                          textEr={'Description required and must between 25 - 255 characters.'}
                          $minLength={25}
                          $maxLength={255}
                          $isRequired={false}
                          $rows={3}
                        />
                      </FieldBoxChange>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <SectionTitle title={'Personal information'}/>
                    </Column>
                    <Column>
                      <FieldBoxChange
                        label={'Address'}
                      >
                        <FormControl
                          register={register}
                          formState={formState}
                          typeField={'text'}
                          nameField={'address'}
                          textEr={'Address required and maximum 75 characters.'}
                          $maxLength={75}
                          $with={'100%'}
                          $height={'45px'}
                          placeholder={'New address...'}
                        />
                      </FieldBoxChange>
                    </Column>
                    <Column>
                      <FieldBoxChange
                        label={'Job'}
                      >
                        <FormControl
                          register={register}
                          formState={formState}
                          typeField={'text'}
                          nameField={'job'}
                          textEr={'Job required and maximum 255 characters.'}
                          $maxLength={255}
                          $with={'100%'}
                          $height={'45px'}
                          placeholder={'New job...'}
                        />
                      </FieldBoxChange>
                    </Column>
                    <Column>
                      <FieldBoxChange
                        label={'Gender'}
                      >
                        <GroupField>
                          <Select
                            colourOptions={GENDER}
                            nameField={'gender'}
                            height={'45px'}
                            control={control}
                            Controller={Controller}
                            formState={formState}
                            textEr={'Error'}
                            classNamePrefix={'react-select'}
                          />
                        </GroupField>
                      </FieldBoxChange>
                    </Column>
                    <Column>
                      <FieldBoxChange
                        label={'Birthday'}
                      >
                        <div>
                          <DateTimePicker
                            $height={'45px'}
                            $with={'100%'}
                            date={datetime}
                            setDate={setDate}
                            placeholder={'Click to select a date...'}
                          />
                        </div>
                      </FieldBoxChange>
                    </Column>
                  </Row>
                </FormElement>
              </TabPanel>
              <TabPanel>2</TabPanel>
            </Column>
          </Row>
        </Tabs>
      </div>
    </Layout12>
  );
};

export default MyAccount;

const Header = styled.div`
  text-align: center;
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

const FormElement = styled.form`
  width: 100%;
`;

const GroupField = styled.div`
  padding-bottom: 32px;
`;
