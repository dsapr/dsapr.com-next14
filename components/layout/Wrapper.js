'use client'

import styled from "styled-components";
import Plum from "@/components/layout/Plum";

const Wrapper = styled.div`
  max-width: 820px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 0 40px;
  /* if max width <= 600 px */
  @media screen and (max-width: 768px) {
    margin-top: 5px;
    padding: 0 25px;
  }
`;

export default function Component({ children }) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
      <Plum />
    </>
  );
}
