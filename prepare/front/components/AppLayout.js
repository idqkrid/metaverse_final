import React from 'react';
import Link from 'next/link';

/* 참조 import */
import HeadMain from '../components/MainScreen/Header';
import FooterMain from '../components/MainScreen/FooterMain';

const AppLayout = ({ children }) => {
  return (
    <>
      <HeadMain />
      {children}
      <FooterMain />
    </>
  )
}

export default AppLayout;