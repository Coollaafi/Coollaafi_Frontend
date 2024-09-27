import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { useState } from 'react';

const Container = styled.div`
  padding: 0 16px;
  margin-bottom: 112px;
`;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarBox() {
  const [value, setValue] = useState<Value>(new Date());

  return (
    <Container>
      <Calendar
        onChange={setValue}
        value={value}
        defaultView="month"
        formatDay={(locale, date) => format(date, 'd')}
        formatMonthYear={(locale, date) => format(date, 'M')}
        minDate={new Date('2024-05-10')} //사람마다 회원가입 달 넣기
        maxDate={new Date()}
      />
    </Container>
  );
}
