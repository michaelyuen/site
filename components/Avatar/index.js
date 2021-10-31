import styled, { css } from "styled-components";

const getHeightAndWidth = ({
  theme: {
    sizes: { avatar },
  },
}) => css`
  height: ${avatar};
  width: ${avatar};
`;

export const AvatarContainer = styled.img`
  border-radius: 50%;
  ${getHeightAndWidth};
`;

export const Avatar = (props) => (
  <AvatarContainer {...props} src="/images/me.jpg" alt="Michael Yuen" />
);
