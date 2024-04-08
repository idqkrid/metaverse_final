import React from 'react';
import Head from 'next/head';

/* reduce */
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore'
import { END } from 'redux-saga';
import axios from 'axios';

/* import 문 */
import BlogImpormation from '../../components/BlogScrean/BlogImpormation'

const Blog = () => {
  return (
    <>
      <Head>
        <title>Meat_Community</title>
      </Head>
      <BlogImpormation />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
})

export default Blog;