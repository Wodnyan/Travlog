import styled from "styled-components";

interface NotificationProps {
  type?: "warning" | "error";
}

function setBackgroundColor(props: NotificationProps) {
  switch (props.type) {
    case "warning":
      return "yellow";
    case "error":
      return "red";
    default:
      return "blue";
  }
}

export const Notification = styled.div<NotificationProps>`
  display: flex;
  padding: 0.7rem 1rem;
  margin: 10px 0;
  width: 350px;
  border-radius: 7px;
  background: ${(props) => setBackgroundColor(props)};
  &.notification-enter {
    transform: translate(-150px);
  }
  &.notification-enter-active {
    transition: transform 0.2s ease;
    transform: translate(0);
  }
  &.notification-exit {
    transform: translate(0);
  }
  &.notification-exit-active {
    transform: translate(150px);
    transition: transform 0.2s ease;
  }
`;
