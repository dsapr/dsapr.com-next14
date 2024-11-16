import { getAllPostsMeta, getPost } from "@/data/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { sans } from "@/public/font/fonts";
import "./markdown.css";
import { getPostWords, readingTime } from "@/lib/utils";
import styled from "styled-components";

// 生成静态参数（文章列表）
export async function generateStaticParams() {
  const metas = await getAllPostsMeta();
  return metas.map((post) => {
    return { slug: post.meta.slug };
  });
}

export default async function PostPage({ params }) {
  console.log(params);
  const post = await getPost(params.slug);
  let postComponents = {};

  // 动态导入组件
  try {
    postComponents = await import(
      "../../posts/" + params.slug + "/components.js"
    );
  } catch (e) {
    if (!e || e.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
  }

  const words = getPostWords(post.content);
  const readTime = readingTime(words);

  return (
    <Article>
      <Title>{post.meta.title}</Title>
      <DateText>
        {new Date(post.meta.date).toLocaleDateString("cn", {
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
        <MDXRemote
          source={post?.content || ""} // MDX 内容
          // components={{ // 自定义组件，覆盖默认markdown元素
          //   ...postComponents,
          // }}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                rehypeKatex,
                [
                  rehypePrettyCode,
                  {
                    theme: "material-theme-palenight",
                  },
                ],
              ],
            },
          }}
        />
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
