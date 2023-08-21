import React from 'react'
import BaseLayout from '@/pages/dashboard/baselayout'
import styles from './MainContent.module.css';

function Help() {
  return (
    <BaseLayout>
    {/* Title */}
      <div className={`${styles.title} font-inter`}>Help</div>
      <div className={`${styles['help-bg']} font-poppins`}>
        <p className='text-lg font-semibold'>What is Patient Monitoring Dashboard?</p>
        <p className=''>
          The patient Monitoring Dashboard is a visual interface that is used to monitor and track data and patient health information in real time or periodically. This dashboard is usually used by medical personnel and healthcare professionals to efficiently monitor health parameters, treatment status, and patient conditions. In the context of COVID-19, this kind of dashboard can provide information such as body temperature, heart rate, blood oxygen level, blood pressure, and other vital data. The aim is to provide medical personnel with a comprehensive view of a patient's health status, enabling them to make better decisions and be responsive to changes in a patient's condition. The Patient Monitoring Dashboard can assist in optimizing patient care, reducing errors, and facilitating better coordination among medical teams.
        </p>
      </div>
      <div className={`${styles['help-bg']}`}>
        <p className='text-lg font-semibold'>Help Center</p>
        <p className=''>
          Please contact us if you find any problems or problems in using this Patient Monitoring Dashboard.
          <br/>Contact: 081234567890
          <br/>Email: admin@mail.com
        </p>
      </div>
    </BaseLayout>
  )
}

export default Help