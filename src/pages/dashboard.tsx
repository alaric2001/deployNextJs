import 'flowbite';

import styles from './dashboard/MainContent.module.css';
import Nav_bar from '@/pages/dashboard/nav_bar';
import Side_bar from '@/pages/dashboard/side_bar';

export default function index_dashboard() {
  return (
    // <BaseLayout>
    <>
    <Nav_bar />
      <div className={styles.layout}>
          <Side_bar />
        <div className={`${styles.children} ${''}`}>
          <div className={`${styles.title}`}>
            Covid-19 Patients Monitoring Dashboard
          </div>

          <div className={styles.recap}>
            <div className={styles.nop}>
              <div className='flex flex-col pt-4 pl-8'>
                <p className='font-poppins text-base font-medium text-black'>
                  Number of Patients
                </p>
                <p className='font-poppins text-3xl font-medium text-black'>40</p>
              </div>
            </div>

            <div className={styles.sc}>
              <div className='flex flex-col pt-4 pl-8'>
                <p className='font-poppins text-base font-medium text-black'>
                  Severe Case
                </p>
                <p className='font-poppins text-3xl font-medium text-black'>8</p>
              </div>
            </div>

            <div className={styles.mc}>
              <div className='flex flex-col pt-4 pl-8'>
                <p className='font-poppins text-base font-medium text-black'>
                  Mild Case
                </p>
                <p className='font-poppins text-3xl font-medium text-black'>32</p>
              </div>
            </div>
          </div>

          <div className={styles['table-bg']}>p</div>
        </div>
      </div>
      </>
    /* </BaseLayout> */
  );
}
