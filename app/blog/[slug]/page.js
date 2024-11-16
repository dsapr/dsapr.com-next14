"use client";

import { getPost } from "@/data/post";
import { sans } from "@/public/font/fonts";
import "./markdown.css";
import { getPostWords, readingTime } from "@/lib/utils";
import Markdown from "react-markdown";
import styled from "styled-components";
import { useState, useEffect } from "react";

export default function PostPage({ params }) {
  console.log("aaaa", params.slug);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 在组件加载时异步获取数据
    const fetchPost = async () => {
      try {
        const title = decodeURIComponent(params.slug);
        console.log("title2314", title);
        const postData = await getPost(title);
        if (postData) {
          setPost(postData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  // const words = getPostWords(post.content);
  // const readTime = readingTime(words);
  const words = "123";
  const readTime = 33;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Post not found.</div>;
  console.log("post234", post, "error", error);
  return (
    <Article>
      <Title>{post.title}</Title>
      <DateText>
        {new Date(post.meta.createDate).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </DateText>
      <Stats>
        <p>字数：{words}</p>
        <p>预计阅读时间：{readTime}分钟</p>
      </Stats>

      <ContentWrapper className="markdown">
        <Markdown>{post?.content || ""}</Markdown>
      </ContentWrapper>
    </Article>
  );
}

// Styled-components
const Article = styled.article`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  line-height: 44px;
  color: var(--title);
  font-family: ${sans.className};
`;

const DateText = styled.p`
  margin-top: 10px;
  margin-bottom: 6px;
  font-size: 13px;
  color: gray;
  &.dark {
    color: lightgray;
  }
`;

const Stats = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: gray;
  & p {
    margin-top: 2px;
  }

  &.dark {
    color: lightgray;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 30px;
`;
