import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15),
    rgba(200, 200, 200, 0.15)
  );
  padding: 8px 15px;
  border-radius: 7px;
`;

export const CalendarWrapper = styled.div`
  width: 340px;
  background-color: white;
  position: fixed;
  z-index: 99;

  .react-calendar__month-view__weekdays {
    text-align: center;
  }
`;
