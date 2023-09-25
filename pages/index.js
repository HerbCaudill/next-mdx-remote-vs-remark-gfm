import gfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';

export default function TestPage({ source }) {
  return (
    <div style={{ padding: 20 }}>
      <MDXRemote {...source} />
    </div>
  );
}

export async function getStaticProps() {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'content/test.mdx'),
    'utf8'
  );

  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [gfm]
    }
  });
  return { props: { source: mdxSource } };
}
