import Link from "next/link";
import { useState } from "react";
import _throttle from "lodash.throttle";
import styled, { css } from "styled-components";
import { Avatar, AvatarContainer } from "../Avatar";
import { Nav, NavContainer } from "../Nav";
import { useEventListener } from "../../hooks";

const navItems = [
  {
    label: "bio.",
    value: "/",
  },
  {
    label: "work.",
    value: "/work",
  },
  {
    label: "notes.",
    value: "/notes",
  },
  {
    label: "blog.",
    value: "/blog",
  },
  {
    label: "til.",
    value: "/today-i-learned",
  },
];

const StyledAnchor = styled.a`
  align-items: center;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const HeaderContainer = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space[3]}px;
  position: sticky;
  top: 0;
  transition: transform 300ms ease;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices[2]};

  ${({ isAtTop }) =>
    !isAtTop &&
    css`
      transform: translateY(-150px);

      h1 {
        span {
          opacity: 0;
          width: 0 !important;
          transition: opacity 600ms ease 300ms, width 300ms ease 600ms;
        }
      }
    `}

  ${AvatarContainer} {
    margin-bottom: ${({ theme }) => theme.space[2]}px;
  }

  h1 {
    font-family: "Pacifico", serif;
    line-height: 1.15;
    margin-bottom: ${({ theme }) => theme.space[3]}px;

    span {
      display: inline-block;
      width: auto;
      transition: opacity 600ms ease 600ms, width 300ms ease 300ms;

      ${({ isAtTop }) => {
        return (
          !isAtTop &&
          css`
            opacity: 0;
            width: 0 !important;
            transition: opacity 600ms ease 300ms, width 300ms ease 600ms;
          `
        );
      }}

      &:first-child {
        width: 80px;
      }

      &:nth-child(2) {
        width: 9px;
      }

      &:last-child {
        width: 45px;
      }
    }
  }

  ${NavContainer} {
    font-family: "Gaegu";

    ul {
      display: flex;

      a {
        color: inherit;
        padding-right: ${({ theme }) => theme.space[2]}px;
      }
    }
  }
`;

const SCROLL_THRESHOLD = 120;

export const Header = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEventListener(
    "scroll",
    _throttle(() => {
      if (typeof window !== "undefined") {
        if (window.pageYOffset > SCROLL_THRESHOLD) {
          console.log("setting is at top: false");
          setIsAtTop(false);
        } else {
          setIsAtTop(true);
        }
      }
    }, 150)
  );

  return (
    <HeaderContainer isAtTop={isAtTop}>
      <Link href="/" passHref>
        <StyledAnchor>
          <Avatar />
          <h1>
            m<span>ichael</span>
            <span>&nbsp;</span>y<span>uen</span>
          </h1>
        </StyledAnchor>
      </Link>
      {/* <Nav items={navItems} /> */}
    </HeaderContainer>
  );
};
