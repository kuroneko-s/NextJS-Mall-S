import styled from "styled-components";

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.85rem;
  font-weight: 600;
`;

export const Label = styled.label`
  font-size: 0.875rem /* 15.75px */;
  line-height: 1.25rem /* 22.5px */;
  margin-bottom: 0.25rem /* 4.5px */;
  margin-top: 8px;
`;

export const Input = styled.input`
  width: 100%;
  border-width: 1px;
  border-radius: 0.125rem /* 2.25px */;
  outline: 2px solid transparent;
  outline-offset: 2px;

  --tw-ring-offset-width: 2px;
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(147 197 253 / var(--tw-ring-opacity));

  padding: 2px 13.5px;
  &:focus {
    --tw-border-opacity: 1;
    border-color: rgb(147 197 253 / var(--tw-border-opacity));
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
      var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
  }
`;
