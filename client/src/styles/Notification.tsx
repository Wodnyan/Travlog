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
  background: ${(props) => setBackgroundColor(props)};
`;
