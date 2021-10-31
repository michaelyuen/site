import Link from "next/link";
import styled from "styled-components";

export const NavContainer = styled.nav`
  a {
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    line-height: 1;
  }
`;

export const Nav = ({ className, items }) => (
  <NavContainer className={className}>
    <ul>
      {items.map((item) => (
        <li key={item.value}>
          <Link href={item.value} scroll={false}>
            <a>{item.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </NavContainer>
);
