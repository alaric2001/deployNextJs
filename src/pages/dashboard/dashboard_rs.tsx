/**
 * @author PT. ESD - Telkom University
 * @copyright © All rights reserved. Dashboard 2023
 */
import Script from 'next/script';
import { useState } from 'react';
import 'flowbite';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Dashboard.module.css';



export default function Dashboard() {
  // const [type, setType] = useState('text');
  // const [value, setValue] = useState(moment().format('DD-MM-YYYY'));
  const [startDate, setStartDate] = useState(new Date());
  
  return (
    <>
      <div className='flex'>
        {/* Sidebar */}
        <div className={styles['main-sidebar']}>
          {/* Title */}
          <div className={styles['header-sidebar']}>
            <div>RS TELKOM</div>
            <div className={styles.arrow}>
              <i className='material-icons'>navigate_before</i>
            </div>
          </div>

          {/* Items*/}
          <div className={styles['items-sidebar']}>
            {/* Dashboard */}
            <div className={`${styles['item-sidebar']} ${'hover:bg-dark'}`}>
              <div className={styles['items-icon']}>
                <i className='material-icons'>dashboard</i>
              </div>
              <div>Dashboard</div>
            </div>
            {/* Master Data */}
            <div className={`${styles['item-sidebar']} ${'hover:bg-dark'}`}>
              <div className={styles['items-icon']}>
                <i className='material-icons'>assessment</i>
              </div>
              <div>Master Data</div>
            </div>
            {/* Patient Data */}
            <div className={`${styles['item-sidebar']} ${'hover:bg-dark'}`}>
              <div className={styles['items-icon']}>
                <i className='material-icons'>group</i>
              </div>
              <div>
                {/* Dropdown */}
                <div>
                  <div>
                    <button
                      id='dropdownDefaultButton'
                      data-dropdown-toggle='dropdown'
                      className='inline-flex items-center bg-primary py-2.5 text-center
                  text-white focus:outline-none 
                  hover:bg-dark'
                      type='button'
                    >
                      Patient Data{' '}
                      <svg
                        className='ml-2 h-4 w-4'
                        aria-hidden='true'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      id='dropdown'
                      className='w-34 z-10 hidden divide-y divide-gray-100 rounded-lg bg-primary shadow'
                    >
                      <ul
                        className='text-sm '
                        aria-labelledby='dropdownDefaultButton'
                      >
                        <li>
                          <a
                            href='#'
                            className='flex items-center px-4 py-2 hover:bg-dark'
                          >
                            <div className={styles['items-icon']}>
                              <div className='h-2 w-2 rounded-full bg-white'></div>
                            </div>
                            <div>Patient List</div>
                          </a>
                        </li>
                        <li>
                          <a
                            href='#'
                            className='flex items-center px-4 py-2 hover:bg-dark'
                          >
                            <div className={styles['items-icon']}>
                              <div className='h-2 w-2 rounded-full bg-white'></div>
                            </div>
                            <div>Input Patient</div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`${styles.content} ${'container'}`}>
          <div className='pt-10 pl-10 font-poppins text-2xl font-bold text-black'>
            Patient Admission
          </div>
          {/* Form */}
          <div className={`${styles['form-div']} ${''}`}>
            <div className='pt-5 pl-10 font-poppins text-2xl font-semibold text-black'>
              Patient Data
            </div>
            <div className='pl-10 pt-10 pr-24'>
              <form>
                {/* name */}
                <div className='row mb-10 flex'>
                  <div className='w-56 flex-initial'>
                    <label
                      htmlFor='patient-name'
                      className={`${
                        styles['form-label']
                      } ${' mb-2 font-medium text-gray-900 '}`}
                    >
                      Patient Name
                    </label>
                  </div>
                  <div className='col'>
                    <input
                      type='text'
                      id='patient-name'
                      className={`${
                        styles['form-input']
                      } ${'rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'}`}
                      placeholder='Input Patien Name'
                      required
                    />
                  </div>
                </div>

                {/* Birth Date */}
                <div className='row mb-10 flex justify-start'>
                  <div className='w-56 flex-initial'>
                    <label
                      htmlFor='birth-date'
                      className={`${
                        styles['form-label']
                      } ${' mb-2 font-medium text-gray-900 '}`}
                    >
                      Birth Date
                    </label>
                  </div>
                  <div className='col'>
                    <input
                      type='date'
                      id='birth-date'
                      // type={type}
                      // onFocus={() => setType('date')}
                      // onBlur={() => setType('text')}
                      // onChange={(e) => onChangeDate(e)}
                      className={`${
                        styles['']
                      } ${'rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'}`}
                      required
                    />
                    {/* <input
                      datepicker
                      datepicker-format='mm/dd/yyyy'
                      type='text'
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                      placeholder='Select date'
                    ></input> */}
                  </div>
                </div>

                {/* Gender */}
                <div className='mb-10 flex'>
                  <div className='w-56 flex-initial'>
                    <label
                      htmlFor='gender'
                      className={`${
                        styles['form-label']
                      } ${' mb-2text-sm pr-32 font-medium text-gray-900 '}`}
                    >
                      Gender
                    </label>
                  </div>
                  <div className=''>
                    <select
                      id='gender'
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-500 focus:border-blue-500 focus:ring-blue-500'
                    >
                      <option defaultValue='G'>Gender</option>
                      <option defaultValue='M'>Male</option>
                      <option defaultValue='F'>Female</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className='mb-10 flex items-center'>
                  <div className='w-56 flex-initial'>
                    <label
                      htmlFor='address'
                      className={`${
                        styles['form-label']
                      } ${'mb-2text-sm pr-32 font-medium text-gray-900 '}`}
                    >
                      Address
                    </label>
                  </div>

                  <div className=''>
                    <textarea
                      id='address'
                      rows={2}
                      className={`${
                        styles['text-area']
                      } ${'rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'}`}
                      placeholder='Input Patient Address'
                    />
                  </div>
                </div>

                {/* Covid Case */}
                <div className='mb-10 flex'>
                  <div className='w-56 flex-initial'>
                    <label
                      htmlFor='covid-case'
                      className={`${
                        styles['form-label']
                      } ${' mb-2text-sm pr-32 font-medium text-gray-900 '}`}
                    >
                      Covid Case
                    </label>
                  </div>
                  <div>
                    <select
                      id='covid-case'
                      className='rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-500 focus:border-blue-500 focus:ring-blue-500'
                    >
                      <option defaultValue='covid-case'>Covid Case</option>
                      <option defaultValue='M'>Mild</option>
                      <option defaultValue='F'>Serve</option>
                    </select>
                  </div>
                </div>

                {/* diagnosis */}
                <div className='mb-10 flex'>
                  <div className='w-56 flex-initial'>
                    <label
                      htmlFor='diagnosis'
                      className={`${
                        styles['form-label']
                      } ${' mb-2text-sm pr-32 font-medium text-gray-900 '}`}
                    >
                      Diagnosis
                    </label>
                  </div>
                  <input
                    type='text'
                    id='diagnosis'
                    className={`${
                      styles['form-input']
                    } ${'rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'}`}
                    placeholder='Input Diagnosis'
                    required
                  />
                </div>

                {/* notes */}
                <div className='mb-10 flex'>
                  <div className='w-56 flex-initial'>
                    <label
                      htmlFor='notes'
                      className={`${
                        styles['form-label']
                      } ${' mb-2text-sm pr-32 font-medium text-gray-900 '}`}
                    >
                      Notes
                    </label>
                  </div>
                  <textarea
                    id='notes'
                    rows={2}
                    className={`${
                      styles['text-area']
                    } ${'rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'}`}
                    placeholder='Patient Notes'
                  />
                </div>

                <div className='flex justify-end pb-10'>
                  <button
                    className={`${
                      styles['btn-size']
                    } ${'mr-4 rounded-lg bg-btn-secondary text-center text-base font-medium text-black focus:outline-none focus:ring-4 focus:ring-gray-300 hover:bg-gray-400'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className={`${
                      styles['btn-size']
                    } ${'rounded-lg bg-btn-primary text-center text-base font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-500'}`}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js'></Script>
      {/* <script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js'></script> */}
      {/* <script src='../../node_modules/flowbite/dist/datepicker.js'></script> */}
    </>
  );
}
