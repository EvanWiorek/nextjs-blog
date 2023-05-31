import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}


/*
- paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js. Learn more in the paths key documentation
*/
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        {/* {postData.date}
        the below is from date-fns
        */}
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }}></div>
      </article>
    </Layout>
  );
}
