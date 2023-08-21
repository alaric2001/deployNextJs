import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Nav_bar from '@/pages/dashboard/nav_bar';
import Side_bar from '@/pages/dashboard/side_bar';
import BaseLayout from '@/pages/dashboard/baselayout';
import styles from '../MainContent.module.css';
import MasterDataList from '@/components/dummyData/masterDataLis';

// interface MasterData {
//   image: string;
//   name: string;
//   color: string;
//   href: string;
// }
const Master = () => {
  return (
    // <BaseLayout
    // title='Master Data'
    // backPageButton={false}
    // contentColor='bg-transparent'
    // >
    <>
      <Nav_bar />
      <div className={styles.layout}>
        <Side_bar />
        <div className={styles.children}>
          <div className={`${styles.title} font-inter`}>Master Data</div>
          <div className='mx-auto mt-6 grid w-[1172px] grid-cols-4 gap-10'>
            {MasterDataList.map((e, k) => (
              <Link key={k} href={e.href}>
                <div className='flex h-20 items-center gap-10 rounded-lg bg-white p-4 shadow hover:bg-gray-100'>
                  <img
                    src={e.image}
                    className='h-[50px] w-[50px]'
                    alt={e.name}
                  />
                  <p className={`text-xl font-bold ${e.color} capitalize`}>
                    {e.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
    /* </BaseLayout> */
  );
};

export default Master;
