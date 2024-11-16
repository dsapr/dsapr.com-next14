"use client";

import styled from "styled-components";

import utilStyles from "@/styles/util.module.css";
import styls from "@/styles/Content.module.css";
import { useEffect, useState } from "react";

const Box = styled.div`
  width: 100px;
  height: 1px;
  background-color: #cccccc;
  margin: 23px auto;
`;

export default function Content() {
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    const fetchMarkdown = async () => {
      const blogUrl = process.env.NEXT_PUBLIC_BLOG_BASE_URL;
      const url = `${blogUrl}/blogIndex.md`;

      const res = await fetch(url);
      const text = await res.text();
      const titleLines = text.split("\n");
      setTitles(titleLines);
    };

    fetchMarkdown();
  }, []);
  return (
    <>
      <div className={`${styls.content} ${utilStyles.plain}`}>
        <article>
          <p>
            Hi, I&apos;m Dsapr, a sophomore at{" "}
            <span className={utilStyles.stress}>Software Engineer&nbsp;</span>
            of Xi&apos;an. Most of my work is open source and publicly available
            on{" "}
            <a
              className={`${styls.external}`}
              target="_blank"
              href="https://github.com/dsapr"
            >
              Github
            </a>
            ,
            <a className={`${styls.external}`} target="_blank" href="blog">
              Blog
            </a>
            .
          </p>
          <p>
            I love <span className={utilStyles.stress}>cats</span>. 🐈
          </p>
        </article>

        <Box />
      </div>
    </>
  );
}
