import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

export default function Nav_bar() {
  const [ddNavOpen, setDdNavOpen] = useState<boolean>(false);

  const ddRef = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setDdNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const ddNavBtn = () => setDdNavOpen(!ddNavOpen);
  return (
    <nav className={`${styles.navbg}`}>
      <div className={`${styles['nav-item']}`}>
        {/* <div className=' flex gap-2 hover:bg-gray-700'>
          <i className='material-icons cursor-pointer rounded-lg text-white '>
            notifications
          </i>
          <p className={`${styles.normaltext} ${'text-white'}`}>EWS Alert</p>
        </div> */}
        <div className=''>
          {/* DROPDOWN */}
          <button
            ref={ddRef}
            type='button'
            onClick={ddNavBtn}
            className={`${
              ddNavOpen == true ? 'bg-gray-700 ' : ''
            } ${'flex items-center gap-2 py-[23px] text-white transition duration-75 hover:bg-gray-700'} `}
          >
            <i className='material-icons cursor-pointer rounded-lg text-white hover:bg-gray-700'>
              person
            </i>
            <p className={`${styles.normaltext} ${'text-white'}`}>
              Evenetus Purba
            </p>
            {/* <i className={`${'material-icons text-white'}`}>
              {ddNavOpen ? 'remove' : 'keyboard_arrow_down'}
            </i> */}
          </button>
          {/* ISI DROPDOWN */}
          <ul className={`${ddNavOpen ? styles['dd-nav-open'] : 'hidden'}`}>
            <li
              ref={ddRef}
              className='flex h-[50px] w-[124px] items-center font-poppins text-xs font-medium not-italic text-white hover:bg-gray-700 active:text-btn-primary'
            >
              <button className='ml-2 flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4' />
                  <path d='M16 17L21 12 16 7' />
                  <path d='M21 12L9 12' />
                </svg>
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
