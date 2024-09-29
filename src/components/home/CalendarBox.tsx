import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { useState } from 'react';
import { ReactComponent as LeftIcon } from '../../assets/icons/left-polygon.svg';
import { ReactComponent as RightIcon } from '../../assets/icons/right-polygon.svg';

const Container = styled.div`
  margin-bottom: 112px;
`;

const ImageBox = styled.img`
  width: 100%;
  height: 100%;
  object: fit;
`;

const StyledCalendar = styled.div`
  .react-calendar {
    /*달력 전체*/
    width: 100%;
    border: none;
  }

  .react-calendar__tile {
    /*달력 내 각 날짜박스*/
    width: 46.85px;
    height: 76px;
    font-family: 'Noto_Reg';
    font-size: 20px;
    line-height: 120%;
    letter-spacing: -1.6px;
    color: black;
    background-color: white;
    text-align: center;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
  }

  /*hover, focus, 선택됐을 시 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: white;
    pointer-events: none;
  }

  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--neighboringMonth {
    /*전 달, 다음 달의 날짜가 보이는 것*/
    abbr {
      color: white;
    }
  }

  .react-calendar__tile--now {
    abbr {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 100%;
      border: none;
      background-color: black;
      color: white;
    }
  }

  .react-calendar__month-view {
    /*헤더를 제외한 전체 달력 박스*/
    border-right: 1px solid #000;
  }

  .react-calendar__month-view__weekdays {
    /*요일 전체 박스*/
    display: grid !important;
    grid-template-columns: repeat(7, 1fr); /*열 배치*/
    grid-column-gap: 1px;
    border-left: 1px solid #000;
  }

  .react-calendar__month-view__weekdays__weekday {
    /*요일 하나 당 박스*/
    padding: 15px 8px;
    border: none;
    color: white;
    background-color: black;
    font-family: 'DTL';
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -1.12px;
    abbr {
      width: 31.69209px;
      height: 18px;
      text-decoration: none;
    }
  }

  .react-calendar__navigation {
    /*Month 바꾸는 헤더 부분*/
    margin-bottom: 16px;
    display: inline-flex; /*flex는 가로전체를 차지하려고 함. inline-flex는 콘텐츠에 맞춰짐.*/
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
    /*prev Month 화살표 버튼*/
    min-width: 15px;
    padding: 0;
    &:hover,
    &:focus,
    &:active {
      background-color: white;
    }
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button:disabled {
    /*더 이상 이전 Month 달력이 없을 때 */
    background-color: white !important;
    .left {
      opacity: 0.1;
    }
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
    /*next Month 화살표 버튼*/
    min-width: 15px;
    padding: 0;
    &:hover,
    &:focus,
    &:active {
      background-color: white;
    }
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__next-button:disabled {
    /*더 이상 다음 Month 달력이 없을 때 */
    background-color: white !important;
    .right {
      opacity: 0.1;
    }
  }

  .react-calendar__navigation__label {
    /*Month label*/
    font-family: 'DTL';
    font-size: 35.652px;
    font-weight: 500;
    letter-spacing: -2.852px;
    pointer-events: none;
    min-width: 0;
    padding: 0 24px;
  }

  .future_date {
    color: #919191;
  }
`;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarBox() {
  const [value, setValue] = useState<Value>(new Date());

  const tileClassName = ({ date }: { date: Date }) => {
    if (date > new Date()) {
      return 'future_date'; //css 클래스
    }
    return null;
  };

  return (
    <Container>
      <StyledCalendar>
        <Calendar
          locale="en"
          onChange={setValue}
          value={value}
          defaultView="month"
          formatDay={(locale, date) => format(date, 'd')}
          formatMonthYear={(locale, date) => format(date, 'M')}
          minDate={new Date('2024-05-10')} //사람마다 회원가입 달 넣기
          maxDate={new Date()}
          nextLabel={<RightIcon />}
          prevLabel={<LeftIcon />}
          next2Label={null}
          prev2Label={null}
          tileClassName={tileClassName}
          /*tileContent={() => {
          return (
            <ImageBox
              src={
                'https://s3-alpha-sig.figma.com/img/2dee/9c18/4a18c7ef0557219335a6bede8d1d0c3f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nBC3-pwz9uTv1qpostuzHMQ6526x3W7eq~Gnc9nZIJWSLjcYcYrncrkKOPy~lgjLWaVGriDoTgRtmPizKCw~j9~aFUQMdEONAJA8PTYvOMTsgjKmj3pOSXXvnjyJ8Bx~4rqx9po-ZIAyPye7FXlc9e9vyAjLS9sH~HNALJNqlVksiVeV7Wvckt6-E4YOoP2tbU8dx8Yj-F2YyQ5fu-entXiJUUTtzAm7oDCdwGtWNdpJXR4AjeTgtTObSvPuy4iZJaEC9-h8WkcvoGujqxoQ0YRX1nb6J0FSrUzH7VERD8-qJ17hIZNvxJZ-tofozWVHa3Kb68N5cUYVQh4RfPpC1g__'
              }
            />
          );
        }}*/
        />
      </StyledCalendar>
    </Container>
  );
}
