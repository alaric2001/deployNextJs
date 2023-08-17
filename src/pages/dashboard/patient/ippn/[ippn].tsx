import React from 'react'
import { useRouter } from 'next/router';
import BaseLayout from '@/pages/dashboard/baselayout';
import styles from '../../MainContent.module.css';
import Side_bar from '@/pages/dashboard/side_bar';
import Nav_bar from '@/pages/dashboard/nav_bar';
import { useEffect, useState } from 'react';
import patient_dummy_data from '@/components/dummyData/patient_dummy';
import Link from 'next/link';
import axios from 'axios';



function Ippn() {
  const router = useRouter();
  const ippn = router.query.ippn;

  // FETCH DATA PATIENT
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fetchStatus, setFetchStatus] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/patients/'); // Replace with your API URL
      setData(response.data); // Assuming your API returns an array of data
      setLoading(false);
    } catch (error) {
      setError('Error fetching data from API.');
      setLoading(false);
    }
  };

  const data_by_id = data.find((item) => item.id == Number(ippn));
  return (
    <>
      <Nav_bar />
      <div className={styles.layout}>
        <Side_bar />
        <div className={styles.children}>
          {/* <div className={`${styles.content} ${'container'}`}> */}
          <div className={`${styles.title}`}>Patient Data</div>
          {/* = = = frame biodata = = =*/}
          <div className={styles['bio-frame']}>
            {/* Sisi kiri*/}
            <div className='flex items-center gap-4'>
              {/* Foto profil dkk*/}
              <div className={styles['image-rounded']}>
                <img src='/images/nextjs.png' alt='Your Image' />
              </div>
              {/* nama pasien dkk */}
              <div className='flex flex-col gap-1'>
                <p className='font-poppins text-4xl font-bold not-italic'>
                  {data_by_id?.patient_name}
                </p>
                <div className=''>
                  <span className='mr-[56px] font-poppins text-lg font-normal not-italic text-[#919191]'>
                    MRN: {ippn}
                  </span>
                  <span className='font-poppins text-lg font-normal not-italic text-[#919191]'>
                    Room: {data_by_id?.room}
                  </span>
                </div>

                <div className='grid w-[246px] grid-cols-2 grid-rows-2 gap-1'>
                  <div className='flex h-[30px] w-[120px] items-center justify-center rounded bg-[#00A3FF]'>
                    <p className='font-poppins text-xs font-medium not-italic text-white'>
                      Patient Detail
                    </p>
                  </div>
                  <div className='flex h-[30px] w-[120px] items-center justify-center rounded bg-[#00CB20]'>
                    <p className='font-poppins text-xs font-medium not-italic text-white'>
                      Medical Rec
                    </p>
                  </div>
                  <div className='flex h-[30px] w-[120px] items-center justify-center rounded bg-[#FFAF50]'>
                    <p className='font-poppins text-xs font-medium not-italic text-white'>
                      EWS & IoT Device
                    </p>
                  </div>
                  <div className='flex h-[30px] w-[120px] items-center justify-center rounded bg-[#FF3E3E]'>
                    <p className='font-poppins text-xs font-medium not-italic text-white'>
                      Patient Discharge
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* sisi kanan */}
            <div className='flex items-center gap-8 font-poppins text-sm font-normal not-italic text-black'>
              {/* gender dkk */}
              <div className='flex flex-col gap-4'>
                <div className='flex'>
                  <div className='w-[100px] flex-initial'>Gender</div>
                  <p>: {data_by_id?.gender}</p>
                </div>
                <div className='flex '>
                  <div className='w-[100px] flex-initial'>Date of Birth</div>
                  <p>: {data_by_id?.birth}</p>
                </div>
                <div className='flex '>
                  <div className='w-[100px] flex-initial'>Case</div>
                  <p>: {data_by_id?.room}</p>
                </div>
              </div>

              {/* Admission date dkk */}
              <div className='flex flex-col gap-4'>
                <div className='flex'>
                  <div className='w-32 flex-initial'>Admission Date</div>
                  <p>: {data_by_id?.admission_date}</p>
                </div>
                <div className='flex '>
                  <div className='w-32 flex-initial'>Patient Weight</div>
                  <p>: Mild Case</p>
                </div>
                <div className='flex '>
                  <div className='w-32 flex-initial'>Patient Notes</div>
                  <p>: Have a Hypertension</p>
                </div>
              </div>
            </div>
          </div>

          {/* = = = Tengah = = = */}
          <div className='mx-auto flex h-[46px] w-[1172px] items-center justify-center gap-[100px] border border-solid border-[#D7D7D7] bg-white text-black'>
            <Link href={`/dashboard/patient/vital_sign/${ippn}`}>
              TTV Monitoring
            </Link>
            <Link href={`/dashboard/patient/medical_prescription/${ippn}`}>
              Medical Prescription
            </Link>
            <Link href={`/dashboard/patient/order_lab/${ippn}`}>Order Lab</Link>
            <Link href={`/dashboard/patient/order_radiology/${ippn}`}>
              Order Radiology
            </Link>
            <Link
              href={`/dashboard/patient/ippn/${ippn}`}
              className='text-btn-primary'
            >
              Integrated patient progress notes
            </Link>
          </div>

          {/* = = = Bagian bawah = = = */}
          <div className={styles['grafik-detail-frame']}>
            {/* kiri */}
            <div className='flex w-[600px] flex-col gap-2'>
              <div className='h-[160px] rounded-xl border border-solid border-[#D7D7D7] bg-white'>
                Integrated patient progress notes Page
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Ippn;