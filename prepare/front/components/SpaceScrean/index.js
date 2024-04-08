import React, { useState, useCallback, useEffect } from 'react';
import styles from '../SpaceScrean/styles.module.css';

import { ADD_META_REQUEST, LOAD_META_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

// redux
import { useSelector, useDispatch } from 'react-redux';

import SpaceCardForm from '../SpaceScrean/SpaceCardForm'

import Router from 'next/router';

const SpaceScrean = () => {
  const [showFirst, setShowFirst] = useState(true);

  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading, metaRooms } = useSelector((state) => state.post);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [querydata, setQuerydata] = useState('');
  const { me } = useSelector((state) => state.user);

  const filteredRooms = metaRooms.filter(room => room.User.id === me?.id);
  

  useEffect(() => {
    if (me === null) {
      Router.push('/Member/Login')
    }
  })


  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback((e) => {
    e.preventDefault();
    setIsModalOpen(false);
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();

    setQuerydata(e.target.value);
  })

  const onClickButton = useCallback((e) => {
    e.preventDefault();

    if (querydata !== '') {
      dispatch({
        type: ADD_META_REQUEST,
        data: { title: querydata },
      });
    }

    setIsModalOpen(false);

  }, [querydata])

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [dispatch])

  useEffect(() => {
    // 블로그 데이터 가져오기
    dispatch({
      type: LOAD_META_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;

          dispatch({
            type: LOAD_META_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
  <> 
    <div>
        <div className={styles.title}>
            <ul className={styles.titleNav}>
                <li onClick={() => setShowFirst(true)}><div className={styles.allButton}>🌝 전체</div></li>
                <li onClick={() => setShowFirst(false)}><div className={styles.allButton}>🍊 내 스페이스</div></li>
            </ul>
            <ul className={styles.navTwo}>
                <li>
                    <div className={styles.more2}>
                        <div className={styles.more2Floor1} onClick={openModal}>+ 스페이스 만들기</div>
                    </div>
                </li>
            </ul>
        </div>
        {showFirst
          ?
          <>
            <div className={styles.cotent1}>
              <div className={styles.gridContainer}>
                {metaRooms?.map((post) => <SpaceCardForm key={post.id} post={post} />)}
              </div>
            </div>
          </>
          :
          <>
            <div className={styles.cotent2}>
              <div className={styles.gridContainer}>
                {filteredRooms?.map((post) => <SpaceCardForm key={post.id} post={post} />)}
              </div>
            </div>
          </>
        }
        {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>
              <div className={styles.modalTitleContent1}>
                <div className={styles.modalTitleContent1Input}>
                  <div>스페이스 설정</div>    
                </div>
              </div>
              <div className={styles.modalTitleContent2} onClick={closeModal}>x</div> 
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalSearchTitle}>
              <input
                      type="text"
                      placeholder='Search...'
                      onChange={(e) => handleSearch(e)}
              />
              <div className={styles.modalSendButton} onClick={onClickButton}>전송</div>
              </div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
  )
}

export default SpaceScrean;