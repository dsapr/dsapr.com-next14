"use client";

import Wrapper from "@/components/layout/Wrapper";
import styled from "styled-components";
import Color from "colorjs.io";
import { sans } from "@/public/font/fonts";

const Main = styled.main`
  position: relative;
  top: -10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TitleDate = styled.p`
  font-size: 13px;
  color: #4a4a4a; /* gray-700 */

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    color: #d1d5db; /* gray-300 */
  }
`;

const StyledH2 = styled.h2.withConfig({
  shouldForwardProp: (prop) => prop !== "sansClassName", // 过滤掉 'sansClassName'
})`
  ${(props) => props.sansClassName}; // 应用 sans 的样式
  font-size: 28px;
  font-weight: 900;

  /* 动态设置颜色 */
  color: var(--lightLink);

  /* 针对暗模式的样式 */
  @media (prefers-color-scheme: dark) {
    color: var(--darkLink);
  }
`;

const Title = styled.main`
  display: block;
  transform: scale(1); /* scale-100 对应 scale(1) */
  padding-top: 1rem; /* py-4 对应 padding-top 和 padding-bottom 为 1rem */
  padding-bottom: 1rem; /* py-4 对应 padding-top 和 padding-bottom 为 1rem */

  &:hover {
    transform: scale(1.005);
  }

  &:active {
    transform: scale(1);
  }
`;

export default function Page() {
  const posts = [
    { meta: { title: "article1", date: "2024-09-04" } },
    { meta: { title: "article2", date: "2024-08-04" } },
    { meta: { title: "支持数学公式", date: "2024-07-04" } },
    { meta: { title: "article3", date: "2024-06-04" } },
    { meta: { title: "article4", date: "2024-05-04" } },
    { meta: { title: "article5", date: "2021-07-07" } },
  ];
  return (
    <Wrapper>
      <Main>
        {posts.map((item, index) => (
          <Title key={index}>
            <PostTitle post={item} />
            <TitleDate>
              {new Date(item.meta.date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </TitleDate>
            <p style={{ marginTop: "0.25rem" }}>"这是一句spoiler"</p>
          </Title>
        ))}
      </Main>
    </Wrapper>
  );
}

function PostTitle({ post }) {
  let lightStart = new Color("lab(63 59.32 -1.47)");
  let lightEnd = new Color("lab(33 42.09 -43.19)");
  let lightRange = lightStart.range(lightEnd);
  let darkStart = new Color("lab(81 32.36 -7.02)");
  let darkEnd = new Color("lab(78 19.97 -36.75)");
  let darkRange = darkStart.range(darkEnd);
  let today = new Date();
  let timeSinceFirstPost = (
    today.valueOf() - new Date(2018, 10, 30).valueOf()
  ).valueOf();
  let timeSinceThisPost = (
    today.valueOf() - new Date(2024, 10, 30).valueOf()
  ).valueOf();
  let staleness = timeSinceThisPost / timeSinceFirstPost;

  return (
    <StyledH2
      sansClassName={sans.className}
      style={{
        "--lightLink": lightRange(staleness).toString(),
        "--darkLink": darkRange(staleness).toString(),
      }}
    >
      {post.meta.title}
    </StyledH2>
  );
}
