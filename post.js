import matter from "gray-matter";

export const getAllPostsMeta = async () => {
  const blogUrl = process.env.NEXT_PUBLIC_BLOG_BASE_URL;
  const url = `${blogUrl}/blogIndex.md`;
  console.log("url234", url);
  const res = await fetch(url);
  const text = await res.text();
  const titles = text.split("\n");

  /**
   * interface PostDetail{
   *  meta: {
   *    title, date, spoiler, slug, id
   *  };
   *  content
   * }
   */
  let datas = await Promise.all(
    titles.map(async (title) => {
      const { meta, content } = await getPostBySlug(title);
      return { title: title, meta, content };
    })
  );

  datas.sort((a, b) => {
    return Date.parse(a.meta.date) < Date.parse(b.meta.date) ? 1 : -1;
  });
  return datas;
};

export const getPostBySlug = async (slug) => {
  const blogUrl = process.env.NEXT_PUBLIC_BLOG_BASE_URL; // 从环境变量中获取基本 URL
  const url = `${blogUrl}/${slug}.md`; // 获取具体的 markdown 文件路径
  const res = await fetch(url); // 发起 fetch 请求
  const markdown = await res.text(); // 获取 markdown 内容

  const { data, content } = matter(markdown);

  return {
    meta: data,
    content,
  };
};

export async function getPost(slug) {
  const posts = await getAllPostsMeta();
  if (!slug) throw new Error("not found");
  const post = posts.find((post) => post.title === slug);
  if (!post) {
    throw new Error(`not found article [${slug}]`);
  }
  console.log("slug", slug, "posts", posts, "post", post);
  return post;
}
