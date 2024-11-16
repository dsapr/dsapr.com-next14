"use client";

import { getAllPostsMeta, getPost } from "@/data/post"; // 从你的 data/post.js 中导入获取文章数据的函数
import Wrapper from "@/components/layout/Wrapper";
import styled from "styled-components";
import { sans } from "@/public/font/fonts"; // 假设你有这个字体文件
import Color from "colorjs.io";
import { useState, useEffect } from "react";

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
  color: var(--lightLink);

  @media (prefers-color-scheme: dark) {
    color: var(--darkLink);
  }
`;

const Title = styled.main`
  display: block;
  transform: scale(1);
  padding-top: 1rem;
  padding-bottom: 1rem;

  &:hover {
    transform: scale(1.005);
  }

  &:active {
    transform: scale(1);
  }
`;

export default function Page({ params }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 在组件加载时异步获取数据
    const fetchPost = async () => {
      try {
        const postData = await getAllPostsMeta(); // 获取文章列表数据
        setPosts(postData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return <div>Loading...</div>;
  console.log("111", posts);
  const posts2 = [
    { title: "article1", meta: { date: "2024-09-04 12:31" } },
    { title: "article2", meta: { date: "2024-08-04 12:31" } },
    { title: "支持数学公式", meta: { date: "2024-07-04 12:31" } },
    { title: "article3", meta: { date: "2024-06-04 12:31" } },
    { title: "article4", meta: { date: "2024-05-04 12:31" } },
    { title: "article5", meta: { date: "2021-07-07 12:31" } },
  ];
  return (
    <Wrapper>
      <Main>
        {posts.map((item, index) => (
          <Title key={index}>
            <PostTitle post={item} />
            <TitleDate>
              {new Date(item.meta.createDate).toLocaleDateString("en-US", {
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

// PostTitle 组件，用于显示文章标题和颜色样式
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
      {post.title}
    </StyledH2>
  );
}
