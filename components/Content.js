'use client'

import styled from "styled-components";

import utilStyles from "@/styles/util.module.css";
import styls from "@/styles/Content.module.css";

const Box = styled.div`
  width: 100px;
  height: 1px;
  background-color: #cccccc;
  margin: 23px auto;
`;

export default function Content() {
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
            ,<a
              className={`${styls.external}`}
              target="_blank"
              href= 'blog' 
            >
              Blog
            </a>.
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
