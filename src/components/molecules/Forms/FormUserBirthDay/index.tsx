import React, { useEffect, useState } from 'react';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import { formatDatetimeByMonthYear } from '@utils/formatDatetime';
import DateTimePicker from '@components/molecules/DateTimePicker';

const FormUserBirthDay = ({ birthDay }: { birthDay: string | null }) => {
  const { editUserBirthDay } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);
  const [ datetime, setDate ] = useState<Date | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (datetime) {
      editUserBirthDay({ birthDay: datetime.toString() })
        .unwrap()
        .then((rs) => {
          if (rs.status === 200 || rs.statusCode === 200) {
            toasts('success', TOAST.EDIT_PROFILE);
            setOpen(false);
          } else {
            toasts('error', TOAST.ERROR_COMMON);
          }
          setIsLoading(false);
        });
    } else {
      toasts('error', TOAST.ERROR_COMMON);
    }
  };

  useEffect(() => {
    setDate( birthDay ? new Date(birthDay) : null);
  }, [ birthDay ]);

  return (
    <Form onSubmit={(event) => onSubmit(event)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Birthday'}
        value={formatDatetimeByMonthYear(birthDay)}
        isLoading={isLoading}
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
      </ToggleField>
    </Form>
  );
};

export default FormUserBirthDay;
