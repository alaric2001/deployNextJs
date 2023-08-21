import React from 'react'
import BaseLayout from '@/pages/dashboard/baselayout'
import styles from './MainContent.module.css';

function Help() {
  return (
    <BaseLayout>
    {/* Title */}
      <div className={`${styles.title} font-inter`}>Help</div>
      <div className={`${styles['help-bg']} font-poppins`}>
        <p className='text-lg font-semibold'>Apa itu Dashboard Monitoring Pasien?</p>
        <p className=''>
          Dashboard Monitoring Pasien adalah antarmuka visual yang digunakan untuk memantau dan melacak data 
          serta informasi tanda-tanda vital pasien secara real-time atau berkala. Dashboard ini biasanya digunakan 
          oleh tenaga medis dan profesional kesehatan untuk memantau parameter kesehatan, status pengobatan, 
          dan kondisi pasien secara efisien. Dalam konteks Covis-19, dashboard semacam ini dapat memberikan 
          informasi seperti suhu tubuh, detak jantung, tingkat oksigen dalam darah, tekanan darah, dan laju pernapasan. 
          Tujuannya adalah untuk memberikan pandangan komprehensif tentang status kesehatan pasien kepada tenaga medis, 
          memungkinkan mereka untuk mengambil keputusan yang lebih baik dan responsif terhadap perubahan kondisi pasien. 
          Dashboard Monitoring Pasien dapat membantu dalam mengoptimalkan perawatan pasien, mengurangi kesalahan, dan 
          memfasilitasi koordinasi yang lebih baik di antara tim medis.
        </p>
      </div>
      <div className={`${styles['help-bg']}`}>
        <p className='text-lg font-semibold'>Pusat Bantuan</p>
        <p className=''>
          Silahkan hubungi kami bila ditemukan seuatu kendala atau masalah dalam penggunaan Dashboard Monitoring Pasien ini.
          <br/>Kontak: 081234567890
          <br/>Email: admin@mail.com
        </p>
      </div>
    </BaseLayout>
  )
}

export default Help