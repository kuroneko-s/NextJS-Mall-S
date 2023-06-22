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

export const AdminInfoWrapper = styled.div``;

export const MenuTabWrapper = styled.div``;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 7px;
  font-size: 1.1rem;
  font-weight: 600;

  &:hover {
    background-color: rgba(223, 230, 233, 0.6);
    color: gray;
  }

  &.active {
    span {
      padding: 6px 12px;
      color: rgb(59, 130, 246);
      border-bottom: 2px solid rgb(59, 130, 246);
    }
  }
`;
