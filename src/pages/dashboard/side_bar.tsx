/**
 * @author PT. ESD - Telkom University
 * @copyright © All rights reserved. Dashboard 2023
 */

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import 'flowbite';
import styles from './Sidebar.module.css';
import ipdManagementMenu from '@/components/dummyData/ipdManagementMenu';
import MasterDataList from '@/components/dummyData/masterDataLis';


export default function Side_bar() {
  const [sideBarOpen, setIsOpen] = useState<boolean>(true);
  const toggle = () => setIsOpen(!sideBarOpen);

  const [ddOpen, setDdOpen] = useState<boolean>(false);
  const ddBtn = () => setDdOpen(!ddOpen);

  const weblink = useRouter()

  // const id_patient = patient_dummy_data.some((data) => data.id)
  
  return (
    <>
      <div
        className={`${
          sideBarOpen ? styles['behind-sidebar'] : styles['behind-sidebar-mini']
        }`}
      >
        {/* sidebar */}
        <aside
          id='sidebar-multi-level-sidebar'
          className={`${
            sideBarOpen ? styles.mainsidebar : styles['mainsidebar-mini']
          }`}
          aria-label='Sidebar'
          data-collapse={sideBarOpen}
        >
          <div className='h-full overflow-y-auto bg-dark'>
            {/* Title */}
            <div
              className={`${
                sideBarOpen
                  ? 'flex items-center justify-center gap-28 bg-dark-active py-[21px] pl-2'
                  : 'hidden'
              }`}
            >
              <Link href=''>
                <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
                  Hospital
                </span>
              </Link>
              {/* <div className='ml-8 w-8'> */}
              <i
                onClick={toggle}
                className='material-icons cursor-pointer rounded-lg text-primary hover:bg-gray-700'
              >
                navigate_before
              </i>
              {/* </div> */}

              {/* </button> */}
            </div>

            {/* Hamburger Icon*/}
            <button
              onClick={toggle}
              className={`${
                sideBarOpen ? 'hidden' : 'bg-dark-active py-[13px] px-7'
              }`}
            >
              <i className='material-icons text-4xl text-white hover:bg-gray-700'>
                view_headline
              </i>
            </button>

            {/* Sidebar Items */}
            <ul className='space-y-2 py-10 font-medium'>
              {/* Dashboard */}
              <li>
                <Link
                  href='/dashboard/index_dashboard'
                  className={`${
                    weblink.pathname == '/dashboard/index_dashboard'
                      ? 'bg-dark-active text-primary'
                      : ''
                  } ${
                    sideBarOpen
                      ? 'flex items-center justify-start p-5 px-3 pl-6 '
                      : 'flex items-center justify-center p-5 px-3  '
                  } text-white hover:bg-gray-700`}
                >
                  <i className='material-icons'>dashboard</i>
                  <span className={`${sideBarOpen ? 'ml-3' : 'hidden'}`}>
                    Dashboard
                  </span>
                </Link>
              </li>

              {/* IPD Management */}
              <li>
                {/* DROPDOWN */}
                <button
                  type='button'
                  onClick={ddBtn}
                  className={`${
                    ipdManagementMenu.some(
                      (item) => item.path == `${weblink.pathname}`
                    ) == true ||
                    weblink.pathname ==
                      `/dashboard/patient/vital_sign/[vital_sign]`
                      ? 'bg-dark-active text-primary'
                      : ''
                  } ${
                    sideBarOpen
                      ? 'flex w-full items-center p-5 px-3 pl-6'
                      : 'flex w-full items-center justify-center p-5 px-3'
                  } ${
                    ddOpen == true ? 'focus:bg-dark-active' : ''
                  } text-white transition duration-75 hover:bg-gray-700 `}
                >
                  <i className='material-icons'>group</i>
                  <span
                    className={`${
                      sideBarOpen
                        ? 'ml-3 flex-1 whitespace-nowrap text-left'
                        : 'hidden'
                    }`}
                  >
                    IPD Management
                  </span>
                  <i
                    className={`${
                      sideBarOpen ? 'material-icons text-white' : 'hidden'
                    }`}
                  >
                    {ddOpen && sideBarOpen ? 'remove' : 'keyboard_arrow_down'}
                  </i>
                </button>
                {/* ISI DROPDOWN */}
                <ul
                  className={`${
                    ddOpen && sideBarOpen ? styles['dd-value-area'] : 'hidden'
                  }`}
                >
                  {ipdManagementMenu.map(({ path, name }) => (
                    <li key={name}>
                      <Link
                        href={path}
                        className={`${
                          weblink.pathname == path ? 'text-primary' : ''
                        } group flex w-full items-center p-5 pl-12 text-white transition duration-75 hover:bg-gray-700`}
                      >
                        <div
                          className={`${
                            weblink.pathname == path
                              ? 'mr-4 h-2 w-2 rounded-full bg-btn-primary'
                              : 'mr-4 h-2 w-2 rounded-full bg-white'
                          }`}
                        ></div>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* End IPD Management */}

              {/* Early warning system */}
              <li>
                <Link
                  href='/dashboard/ews_iot'
                  className={`${
                    weblink.pathname == '/dashboard/ews_iot'
                      ? 'bg-dark-active text-primary'
                      : ''
                  } ${
                    sideBarOpen
                      ? 'flex items-center justify-start p-5 px-3 pl-6 '
                      : 'flex items-center justify-center p-5 px-3'
                  } text-white hover:bg-gray-700`}
                >
                  {/* <i className='material-icons'>devices_other</i> */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill={`${
                      weblink.pathname == '/dashboard/ews_iot'
                        ? '#00A3FF'
                        : 'white'
                    }`}
                  >
                    <path
                      d='M19 12C15.13 12 12 15.13 12 19C12 19.34 12.03 19.67 12.08 20H3V19L5 17V11C5 7.9 7.03 5.17 10 4.29V4C10 2.9 10.9 2 12 2C13.1 2 14 2.9 14 4V4.29C16.97 5.17 19 7.9 19 11V12ZM10 21C10 21.5304 10.2107 22.0391 10.5858 22.4142C10.9609 22.7893 11.4696 23 12 23C12.39 23 12.75 22.88 13.06 22.69C12.74 22.17 12.5 21.6 12.3 21H10ZM23.77 20.32C23.87 20.39 23.89 20.53 23.83 20.64L22.83 22.37C22.77 22.5 22.64 22.5 22.53 22.5L21.28 21.97C21 22.17 20.75 22.34 20.44 22.47L20.25 23.79C20.23 23.91 20.13 24 20 24H18C17.88 24 17.77 23.91 17.75 23.79L17.57 22.47C17.25 22.34 17 22.17 16.72 21.97L15.5 22.5C15.37 22.5 15.23 22.5 15.17 22.37L14.17 20.64C14.1415 20.5879 14.1319 20.5276 14.1429 20.4693C14.1538 20.411 14.1846 20.3582 14.23 20.32L15.29 19.5C15.27 19.33 15.25 19.17 15.25 19C15.25 18.83 15.27 18.67 15.29 18.5L14.23 17.68C14.14 17.61 14.11 17.5 14.17 17.36L15.17 15.64C15.23 15.53 15.37 15.5 15.5 15.53L16.72 16C17 15.83 17.25 15.66 17.57 15.54L17.75 14.21C17.77 14.09 17.88 14 18 14H20C20.13 14 20.23 14.09 20.25 14.21L20.44 15.54C20.75 15.66 21 15.83 21.28 16L22.53 15.53C22.64 15.5 22.77 15.53 22.83 15.64L23.83 17.36C23.89 17.5 23.87 17.61 23.77 17.68L22.72 18.5C22.7587 18.8322 22.7587 19.1678 22.72 19.5L23.77 20.32ZM20.75 19C20.75 18.03 19.97 17.25 19 17.25C18.03 17.25 17.25 18.03 17.25 19C17.25 19.97 18.04 20.75 19 20.75C19.96 20.75 20.75 19.97 20.75 19Z'
                      fill=''
                    />
                  </svg>
                  <span className={`${sideBarOpen ? 'ml-3' : 'hidden'}`}>
                    Early Warning System
                  </span>
                </Link>
              </li>

              {/* Master Data */}
              <li>
                <Link href='/dashboard/master_data'
                  className={`${
                    MasterDataList.some(
                      (item) => item.href == `${weblink.pathname}`
                    ) == true || weblink.pathname == '/dashboard/master_data'
                      ? 'bg-dark-active text-primary'
                      : 'text-white'
                  } ${
                    sideBarOpen
                      ? 'flex items-center justify-start p-5 px-3 pl-6 '
                      : 'flex items-center justify-center p-5 px-3'
                  }hover:bg-gray-700`}
                >
                  <i className='material-icons'>assessment</i>
                  <span className={`${sideBarOpen ? 'ml-3' : 'hidden'}`}>
                    Master Data
                  </span>
                </Link>
              </li>

              {/* Help */}
              <li>
                <Link
                  href='/dashboard/index_dashboard'
                  className={`${
                    weblink.pathname == ''
                      ? 'bg-dark-active text-primary'
                      : ''
                  } ${
                    sideBarOpen
                      ? 'flex items-center justify-start p-5 px-3 pl-6 '
                      : 'flex items-center justify-center p-5 px-3'
                  } text-white hover:bg-gray-700`}
                >
                  <i className='material-icons'>help</i>
                  <span className={`${sideBarOpen ? 'ml-3' : 'hidden'}`}>
                    Help
                  </span>
                </Link>
              </li>
              {/* End Sidebar Link */}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};