import React, { useState, useCallback, useEffect } from 'react';
import styles from './styles.module.css';

/* axios */
import axios from 'axios';

/* router */
import { useRouter } from 'next/router';

/* reducers */
import { LOAD_MY_INFO_REQUEST } from '../../../../reducers/user';
import wrapper from '../../../../store/configureStore.js';

/* redux */
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';

import CustomerSupportHead from '../../../../components/CustomerSupportScrean/CustomerSupportImpormation/CustomerSupportHead';

import {
  ADD_POST_NOTICE_REQUEST,
} from '../../../../reducers/post';

const CaseStudy = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { addNoticeDone } = useSelector((state) => state.post);

  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');

  const onChangeText = useCallback((e) => {
    e.preventDefault();
    setContents(e.target.value);
  });

  const onChangeTitle = useCallback((e) => {
    e.preventDefault();
    setTitle(e.target.value);
  });


  const onAddPost = useCallback((e) => {
    e.preventDefault();
    if (!contents || !contents.trim()) {
      return alert('게시글을 작성하세요.');
    }
    if (!title || !title.trim()) {
      return alert('게시글을 작성하세요.');
    }

    const formData = new FormData();

    formData.append('content', contents);
    formData.append('title', title);

    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    return dispatch({
      type: ADD_POST_NOTICE_REQUEST,
      data: {title: title, content: contents},
    });
  }, [contents,title]);


  useEffect(() => {
    if (addNoticeDone) {
      router.replace(`/CustomerSupport/CustomerSupportNotice`)
    } else {

    }
  })

  return (
    <div className={styles.header}>
      <CustomerSupportHead />
      <div className={styles.content2}>
        <div className={styles.content2Head}>
          <div className={styles.content2HeadContext1}>
            <h2>공지사항</h2>
          </div>
        </div>
        <div className={styles.board_wrap}>
            <div className={styles.board_write_wrap}>
                <div className={styles.board_write}>
                    <div className={styles.title}>
                      <input value={title} onChange={onChangeTitle} placeholder='제목을 입력해주세요'></input>
                    </div>
                    <div className={styles.cont}>
                      <textarea placeholder="내용 입력해주세요" value={contents} onChange={onChangeText}></textarea>
                    </div>
                </div>
                <div className={styles.bt_wrap}>
                    <button className={styles.buttonWrap} type="primary" htmlType="submit" onClick={onAddPost}>등록</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default CaseStudy;
