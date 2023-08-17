import { ReactNode } from "react";

import styles from './MainContent.module.css';

import Nav_bar from '@/pages/dashboard/nav_bar';

import Side_bar from './side_bar';

interface Props{
  children: ReactNode | ReactNode[];
  // title: string;
  // backPageButton: boolean;
  // contentColor:string
}

export default function BaseLayout ({ children }: Props) {

  return (
    <>
      <Nav_bar />
      <div className={styles.layout}>
        <Side_bar />

        {/* {children} */}
        <div className={styles.children}>{children}</div>

        {/* <main className='layout__main-content'>{children}</main>; */}
      </div>
    </>
  );
};