import React from 'react';
import BaseLayout from '@/pages/dashboard/baselayout'
import styles from './MainContent.module.css';
import 'flowbite';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import AutoGoToTop from '@/components/AutoGoToTop';

export default function Index_dashboard() {
  const [data_main_dashboard, setData_main_dashboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //Autoreload Fetching Data From API
  useEffect(() => {
    fetchData();
    // Set up an interval to fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Patien Data From API
  const fetchData = async () => {
    try {
      // const response = await axios.get(
      //   'https://4f23-113-11-180-109.ngrok-free.app/api/patient-ttv',
      //   {
      //     headers: {
      //       'ngrok-skip-browser-warning': 'any',
      //     },
      //   }
      // ); // Replace with your API URL/
      const response = await axios.get('https://patientmonitoring.my.id/api/patient-ttv');
      // const response = await axios.get('http://localhost:8000/api/patient-ttv'); 
      // console.log('output env', process.env.NEXT_PUBLIC_API_URL)
      // console.log('output env', `${process.env.NEXT_PUBLIC_API_URL}/patient_ttv`)
      
      // // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/patient-ttv`);
      
      setData_main_dashboard(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data from API.');
      setLoading(false);
    }
  };

  const patien_total = data_main_dashboard.length;
  const discharge_patient = data_main_dashboard.filter(item => item.discharge_date !== null).length;
  const addmision_patient = data_main_dashboard.filter(item => item.addmision_date);
  const male_patient = data_main_dashboard.filter(item => item.gender == 'Male').length;
  const female_patient = data_main_dashboard.filter(item => item.gender == 'Female').length;
  // const severe_case = data_main_dashboard.filter(item => item.covid_case == 1).length;
  // const mild_case = data_main_dashboard.filter(item => item.covid_case == 0).length;

  // Initialize counters
  let totalCases1 = 0;
  let totalCases0 = 0;

  // Iterate through patients and their Covid Case data
  data_main_dashboard.forEach((patient) => {
    // Check if patient.examination is defined and an array
    if (patient.examination?.length) {
      patient.examination.forEach((covid_case: any) => {
        if (covid_case.covid_case == 1) {
          totalCases1++;
        } else if (covid_case.covid_case == 0) {
          totalCases0++;
        }
      });
    }
  });

  // console.log(totalCases1);

  function Case_chart() {
    useEffect(() => {
      const ctx = document.getElementById('case_chart') as HTMLCanvasElement;
      const chartConfig = {
        type: 'doughnut',
        data: {
          labels: ['Severe Case', 'Mild Case'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [totalCases0, totalCases1],
              backgroundColor: [
                'rgba(255, 64, 105, 1)',
                'rgba(255, 194, 22, 1)',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          // cutout: 100,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Patient Case',
            },
          },
          animation: { 
            duration: 0
          },
        },
      };

      const case_chart = new (Chart as any)(ctx, chartConfig);

      return () => {
        case_chart.destroy();
      };
    });
  }

  function Inout_chart() {
    useEffect(() => {
      const ctx = document.getElementById('inout_chart') as HTMLCanvasElement;
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const chartConfig = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'In',
              data: [20, 30, 10, 40, 50, 10, 30],
              borderColor: 'rgba(255, 194, 22, 1)',
              backgroundColor: 'rgba(255, 194, 22, 0.4)',
              fill: true,
            },
            {
              label: 'Out',
              data: [10, 10, 20, 20, 30, 25, 15],
              borderColor: 'rgba(0, 102, 255, 1)',
              backgroundColor: 'rgba(0, 102, 255, 0.4)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'In-Out Patient',
            },
            tooltip: {
              mode: 'index',
            },
          },
          animation: { 
            duration: 0
          },
          // interaction: {
          //   mode: 'nearest',
          //   axis: 'x',
          //   intersect: false
          // },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month',
              },
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Value',
              },
              beginAtZero: true,
            },
          },
        },
      };

      const inout_chart = new (Chart as any)(ctx, chartConfig);

      return () => {
        inout_chart.destroy();
      };
    });
  }

  function Gender_chart() {
    useEffect(() => {
      const ctx = document.getElementById('gender_chart') as HTMLCanvasElement;
      const labels = [addmision_patient];
      const chartConfig = {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Male',
              data: [male_patient],
              backgroundColor: 'rgba(59, 173, 255, 1)',
              fill: true,
            },
            {
              label: 'Female',
              data: [female_patient],
              backgroundColor: 'rgba(254, 132, 212, 1)',
              fill: true,
            }
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Patient by Gender',
            },
          },
          animation: { 
            duration: 0
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Value',
              },
              beginAtZero: true,
            },
          },
        },
      };

      const gender_chart = new (Chart as any)(ctx, chartConfig);

      return () => {
        gender_chart.destroy();
      };
    });
  }

  // const TableAlert = () => {
  //   return (
  //     <div className='w-full md:col-span-4 relative m-auto p-4 border rounded-lg bg-white'>
  //       Table
  //     </div>
  //   )
  // }

  //========= Call Function =========//
  Case_chart();
  Inout_chart();
  Gender_chart();


  // Ururtkan berdasarkan tgl terakhit
  const sortBy_created_at = (
    a: { created_at: string },
    b: { created_at: string }
  ) => {
    const date1 = b.created_at.split('/').reverse().join('');
    const date2 = a.created_at.split('/').reverse().join('');
    return date1.localeCompare(date2);
  };

  //Ambil data HR terakhir berdasarkan ID Pasien
  const take_hr = data_main_dashboard.map((data) => data.hr.map((hr: any) => hr));
  const lastestHR = (id: any) => {
    const filteringLastestHR = take_hr[id - 1];
    if (!filteringLastestHR || filteringLastestHR.length === 0) {
      return '-';
    }
    filteringLastestHR.sort(sortBy_created_at);
    return filteringLastestHR[0] ? filteringLastestHR[0].heart_beats : '-';
  };

  //Ambil data RR terakhir berdasarkan ID Pasien
  const take_rr = data_main_dashboard.map((data) => data.rr.map((rr: any) => rr));
  const lastestRR = (id: any) => {
    const filteringLastestRR = take_rr[id - 1];
    if (!filteringLastestRR || filteringLastestRR.length === 0) {
      return '-';
    }
    filteringLastestRR.sort(sortBy_created_at);
    return filteringLastestRR[0] ? filteringLastestRR[0].breaths : '-';
  };

  //Ambil data Spo2 terakhir berdasarkan ID Pasien
  const take_spo2 = data_main_dashboard.map((data) =>
    data.spo2.map((spo2: any) => spo2)
  );
  const lastestSpo2 = (id: any) => {
    const filteringLastestSpo2 = take_spo2[id - 1];
    if (!filteringLastestSpo2 || filteringLastestSpo2.length === 0) {
      return '-';
    }
    filteringLastestSpo2.sort(sortBy_created_at);
    return filteringLastestSpo2[0] ? filteringLastestSpo2[0].blood_oxygen : '-';
  };

  //Ambil data Suhu Pasien terakhir berdasarkan ID Pasien
  const take_temp = data_main_dashboard.map((data) =>
    data.temp.map((temp: any) => temp)
  );
  const lastestTemp = (id: any) => {
    const filteringLastestTemp = take_temp[id - 1];
    if (!filteringLastestTemp || filteringLastestTemp.length === 0) {
      return '-';
    }
    filteringLastestTemp.sort(sortBy_created_at);
    return filteringLastestTemp[0] ? filteringLastestTemp[0].patient_temp : '-';
  };

  //Ambil data NIBP Pasien terakhir berdasarkan ID Pasien
  const take_nibp = data_main_dashboard.map((data) =>
    data.nibp.map((nibp: any) => nibp)
  );
  const lastestNibpSystolic = (id: any) => {
    const filteringLastestNibp = take_nibp[id - 1];
    if (!filteringLastestNibp || filteringLastestNibp.length === 0) {
      return '-';
    }
    filteringLastestNibp.sort(sortBy_created_at);
    return filteringLastestNibp[0] ? filteringLastestNibp[0].systolic : '-';
  };
  const lastestNibpDiastolic = (id: any) => {
    const filteringLastestNibp = take_nibp[id - 1];
    //Solving error typeerror: cannot read properties of undefined (reading '0').
    if (!filteringLastestNibp || filteringLastestNibp.length === 0) {
      return '-';
    }
    filteringLastestNibp.sort(sortBy_created_at);
    return filteringLastestNibp[0] ? filteringLastestNibp[0].diastolic : '-';
  };


  //Color Indicator Alert
  const color_indicator_alert = (indicator: any) => {
    return indicator == 'red' ? 'bg-[#FF8D8D]' 
    : indicator == 'orange' ? 'bg-[#FFC47F]' 
    : indicator == 'yellow'? 'bg-[#FDFF9C]' 
    : indicator == 'green'? 'bg-[#9CFFA0]' 
    : 'bg-[#AFE2FF]'}


  //Sort By Indicator
  const colorOrder = ['red', 'orange', 'yellow', 'green', 'blue'];

  // Custom sorting function based on colorOrder
  const sortedData = data_main_dashboard.sort((a, b) => {
    const aIndex = colorOrder.indexOf(a.indicator);
    const bIndex = colorOrder.indexOf(b.indicator);
    return aIndex - bIndex;
  });
  
  

  return (
    <BaseLayout>
      <div className={`${styles.content} ${'container'}`}>
        <div className={`${styles.title} font-inter`}>Covid-19 Patients Monitoring Dashboard</div>
        <div className='grid gap-4 p-4 w-[1172px] lg:grid-cols-7'>
          <div className='flex w-full justify-between rounded-lg border bg-white p-4 lg:col-span-2'>
            <div className='flex flex-col gap-1'>
              <p className='max-w-[240px] font-poppins text-2xl font-black not-italic'>
                Patient
              </p>
              <div className='flex p-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='36'
                  height='36'
                  viewBox='0 0 36 36'
                  fill='none'
                >
                  <rect width='36' height='36' rx='4' fill='#00A3FF' />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M18 9.225C18 11.8352 15.8852 13.95 13.275 13.95C10.6648 13.95 8.55 11.8352 8.55 9.225C8.55 6.61477 10.6648 4.5 13.275 4.5C15.8852 4.5 18 6.61477 18 9.225ZM4.5 18.945C4.5 16.0722 10.3462 14.625 13.275 14.625C15.0948 14.625 18.0405 15.1839 20.0115 16.2956C18.794 16.9322 17.7428 17.8455 16.9423 18.9621C16.1418 20.0787 15.6145 21.3675 15.4026 22.725H4.5V18.945ZM22.05 17.325C22.05 17.146 22.1211 16.9743 22.2477 16.8477C22.3743 16.7211 22.546 16.65 22.725 16.65H25.425C25.604 16.65 25.7757 16.7211 25.9023 16.8477C26.0289 16.9743 26.1 17.146 26.1 17.325C26.1 17.504 26.0289 17.6757 25.9023 17.8023C25.7757 17.9289 25.604 18 25.425 18H24.75V19.3973C25.5319 19.5094 26.2729 19.8168 26.9046 20.2909L27.8455 19.35L27.6478 19.1522C27.5248 19.0249 27.4568 18.8544 27.4583 18.6774C27.4599 18.5004 27.5308 18.3311 27.656 18.206C27.7811 18.0808 27.9504 18.0099 28.1274 18.0083C28.3044 18.0068 28.4749 18.0748 28.6022 18.1978L29.9522 19.5478C30.0752 19.6751 30.1432 19.8456 30.1417 20.0226C30.1401 20.1996 30.0692 20.3689 29.944 20.494C29.8189 20.6192 29.6496 20.6901 29.4726 20.6917C29.2956 20.6932 29.1251 20.6252 28.9978 20.5022L28.8 20.3045L27.859 21.2454C28.3332 21.8771 28.6406 22.6181 28.7528 23.4H30.15V22.725C30.15 22.546 30.2211 22.3743 30.3477 22.2477C30.4743 22.1211 30.646 22.05 30.825 22.05C31.004 22.05 31.1757 22.1211 31.3023 22.2477C31.4289 22.3743 31.5 22.546 31.5 22.725V25.425C31.5 25.604 31.4289 25.7757 31.3023 25.9023C31.1757 26.0289 31.004 26.1 30.825 26.1C30.646 26.1 30.4743 26.0289 30.3477 25.9023C30.2211 25.7757 30.15 25.604 30.15 25.425V24.75H28.7528C28.664 25.3693 28.4524 25.9646 28.1304 26.501L29.475 27.8455L29.6728 27.6478C29.8001 27.5248 29.9706 27.4568 30.1476 27.4583C30.3246 27.4599 30.4939 27.5308 30.619 27.656C30.7442 27.7811 30.8151 27.9504 30.8167 28.1274C30.8182 28.3044 30.7502 28.4749 30.6272 28.6022L29.2772 29.9522C29.1499 30.0752 28.9794 30.1432 28.8024 30.1417C28.6254 30.1401 28.4561 30.0692 28.331 29.944C28.2058 29.8189 28.1349 29.6496 28.1333 29.4726C28.1318 29.2956 28.1998 29.1251 28.3228 28.9978L28.5205 28.8L27.2731 27.5533C26.5727 28.1989 25.693 28.6169 24.75 28.7521V30.15H25.425C25.604 30.15 25.7757 30.2211 25.9023 30.3477C26.0289 30.4743 26.1 30.646 26.1 30.825C26.1 31.004 26.0289 31.1757 25.9023 31.3023C25.7757 31.4289 25.604 31.5 25.425 31.5H22.725C22.546 31.5 22.3743 31.4289 22.2477 31.3023C22.1211 31.1757 22.05 31.004 22.05 30.825C22.05 30.646 22.1211 30.4743 22.2477 30.3477C22.3743 30.2211 22.546 30.15 22.725 30.15H23.4V28.7528C22.6181 28.6406 21.8771 28.3332 21.2454 27.859L20.3045 28.8L20.5022 28.9978C20.6252 29.1251 20.6932 29.2956 20.6917 29.4726C20.6901 29.6496 20.6192 29.8189 20.494 29.944C20.3689 30.0692 20.1996 30.1401 20.0226 30.1417C19.8456 30.1432 19.6751 30.0752 19.5478 29.9522L18.1978 28.6022C18.0748 28.4749 18.0068 28.3044 18.0083 28.1274C18.0099 27.9504 18.0808 27.7811 18.206 27.656C18.3311 27.5308 18.5004 27.4599 18.6774 27.4583C18.8544 27.4568 19.0249 27.5248 19.1522 27.6478L19.35 27.8455L20.2909 26.9046C19.8168 26.2729 19.5094 25.5319 19.3973 24.75H18V25.425C18 25.604 17.9289 25.7757 17.8023 25.9023C17.6757 26.0289 17.504 26.1 17.325 26.1C17.146 26.1 16.9743 26.0289 16.8477 25.9023C16.7211 25.7757 16.65 25.604 16.65 25.425V22.725C16.65 22.546 16.7211 22.3743 16.8477 22.2477C16.9743 22.1211 17.146 22.05 17.325 22.05C17.504 22.05 17.6757 22.1211 17.8023 22.2477C17.9289 22.3743 18 22.546 18 22.725V23.4H19.3973C19.5094 22.6181 19.8168 21.8771 20.2909 21.2454L19.35 20.3045L19.1522 20.5022C19.0249 20.6252 18.8544 20.6932 18.6774 20.6917C18.5004 20.6901 18.3311 20.6192 18.206 20.494C18.0808 20.3689 18.0099 20.1996 18.0083 20.0226C18.0068 19.8456 18.0748 19.6751 18.1978 19.5478L19.5478 18.1978C19.6751 18.0748 19.8456 18.0068 20.0226 18.0083C20.1996 18.0099 20.3689 18.0808 20.494 18.206C20.6192 18.3311 20.6901 18.5004 20.6917 18.6774C20.6932 18.8544 20.6252 19.0249 20.5022 19.1522L20.3045 19.35L21.2454 20.2909C21.8771 19.8168 22.6181 19.5094 23.4 19.3973V18H22.725C22.546 18 22.3743 17.9289 22.2477 17.8023C22.1211 17.6757 22.05 17.504 22.05 17.325Z'
                    fill='white'
                  />
                </svg>
                <span className='ml-4'>
                  <p className='text-md font-poppins font-semibold not-italic'>
                    Number of patient
                  </p>
                  <p className='font-poppins text-sm not-italic'>
                    {patien_total} Patient
                  </p>
                </span>
              </div>

              {/* <div className='flex p-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='36'
                  height='36'
                  viewBox='0 0 36 36'
                  fill='none'
                >
                  <rect width='36' height='36' rx='4' fill='#FF3E3E' />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M18 9.225C18 11.8352 15.8852 13.95 13.275 13.95C10.6648 13.95 8.55 11.8352 8.55 9.225C8.55 6.61477 10.6648 4.5 13.275 4.5C15.8852 4.5 18 6.61477 18 9.225ZM4.5 18.945C4.5 16.0722 10.3462 14.625 13.275 14.625C15.0948 14.625 18.0405 15.1839 20.0115 16.2956C18.794 16.9322 17.7428 17.8455 16.9423 18.9621C16.1418 20.0787 15.6145 21.3675 15.4026 22.725H4.5V18.945ZM22.05 17.325C22.05 17.146 22.1211 16.9743 22.2477 16.8477C22.3743 16.7211 22.546 16.65 22.725 16.65H25.425C25.604 16.65 25.7757 16.7211 25.9023 16.8477C26.0289 16.9743 26.1 17.146 26.1 17.325C26.1 17.504 26.0289 17.6757 25.9023 17.8023C25.7757 17.9289 25.604 18 25.425 18H24.75V19.3973C25.5319 19.5094 26.2729 19.8168 26.9046 20.2909L27.8455 19.35L27.6478 19.1522C27.5248 19.0249 27.4568 18.8544 27.4583 18.6774C27.4599 18.5004 27.5308 18.3311 27.656 18.206C27.7811 18.0808 27.9504 18.0099 28.1274 18.0083C28.3044 18.0068 28.4749 18.0748 28.6022 18.1978L29.9522 19.5478C30.0752 19.6751 30.1432 19.8456 30.1417 20.0226C30.1401 20.1996 30.0692 20.3689 29.944 20.494C29.8189 20.6192 29.6496 20.6901 29.4726 20.6917C29.2956 20.6932 29.1251 20.6252 28.9978 20.5022L28.8 20.3045L27.859 21.2454C28.3332 21.8771 28.6406 22.6181 28.7528 23.4H30.15V22.725C30.15 22.546 30.2211 22.3743 30.3477 22.2477C30.4743 22.1211 30.646 22.05 30.825 22.05C31.004 22.05 31.1757 22.1211 31.3023 22.2477C31.4289 22.3743 31.5 22.546 31.5 22.725V25.425C31.5 25.604 31.4289 25.7757 31.3023 25.9023C31.1757 26.0289 31.004 26.1 30.825 26.1C30.646 26.1 30.4743 26.0289 30.3477 25.9023C30.2211 25.7757 30.15 25.604 30.15 25.425V24.75H28.7528C28.664 25.3693 28.4524 25.9646 28.1304 26.501L29.475 27.8455L29.6728 27.6478C29.8001 27.5248 29.9706 27.4568 30.1476 27.4583C30.3246 27.4599 30.4939 27.5308 30.619 27.656C30.7442 27.7811 30.8151 27.9504 30.8167 28.1274C30.8182 28.3044 30.7502 28.4749 30.6272 28.6022L29.2772 29.9522C29.1499 30.0752 28.9794 30.1432 28.8024 30.1417C28.6254 30.1401 28.4561 30.0692 28.331 29.944C28.2058 29.8189 28.1349 29.6496 28.1333 29.4726C28.1318 29.2956 28.1998 29.1251 28.3228 28.9978L28.5205 28.8L27.2731 27.5533C26.5727 28.1989 25.693 28.6169 24.75 28.7521V30.15H25.425C25.604 30.15 25.7757 30.2211 25.9023 30.3477C26.0289 30.4743 26.1 30.646 26.1 30.825C26.1 31.004 26.0289 31.1757 25.9023 31.3023C25.7757 31.4289 25.604 31.5 25.425 31.5H22.725C22.546 31.5 22.3743 31.4289 22.2477 31.3023C22.1211 31.1757 22.05 31.004 22.05 30.825C22.05 30.646 22.1211 30.4743 22.2477 30.3477C22.3743 30.2211 22.546 30.15 22.725 30.15H23.4V28.7528C22.6181 28.6406 21.8771 28.3332 21.2454 27.859L20.3045 28.8L20.5022 28.9978C20.6252 29.1251 20.6932 29.2956 20.6917 29.4726C20.6901 29.6496 20.6192 29.8189 20.494 29.944C20.3689 30.0692 20.1996 30.1401 20.0226 30.1417C19.8456 30.1432 19.6751 30.0752 19.5478 29.9522L18.1978 28.6022C18.0748 28.4749 18.0068 28.3044 18.0083 28.1274C18.0099 27.9504 18.0808 27.7811 18.206 27.656C18.3311 27.5308 18.5004 27.4599 18.6774 27.4583C18.8544 27.4568 19.0249 27.5248 19.1522 27.6478L19.35 27.8455L20.2909 26.9046C19.8168 26.2729 19.5094 25.5319 19.3973 24.75H18V25.425C18 25.604 17.9289 25.7757 17.8023 25.9023C17.6757 26.0289 17.504 26.1 17.325 26.1C17.146 26.1 16.9743 26.0289 16.8477 25.9023C16.7211 25.7757 16.65 25.604 16.65 25.425V22.725C16.65 22.546 16.7211 22.3743 16.8477 22.2477C16.9743 22.1211 17.146 22.05 17.325 22.05C17.504 22.05 17.6757 22.1211 17.8023 22.2477C17.9289 22.3743 18 22.546 18 22.725V23.4H19.3973C19.5094 22.6181 19.8168 21.8771 20.2909 21.2454L19.35 20.3045L19.1522 20.5022C19.0249 20.6252 18.8544 20.6932 18.6774 20.6917C18.5004 20.6901 18.3311 20.6192 18.206 20.494C18.0808 20.3689 18.0099 20.1996 18.0083 20.0226C18.0068 19.8456 18.0748 19.6751 18.1978 19.5478L19.5478 18.1978C19.6751 18.0748 19.8456 18.0068 20.0226 18.0083C20.1996 18.0099 20.3689 18.0808 20.494 18.206C20.6192 18.3311 20.6901 18.5004 20.6917 18.6774C20.6932 18.8544 20.6252 19.0249 20.5022 19.1522L20.3045 19.35L21.2454 20.2909C21.8771 19.8168 22.6181 19.5094 23.4 19.3973V18H22.725C22.546 18 22.3743 17.9289 22.2477 17.8023C22.1211 17.6757 22.05 17.504 22.05 17.325Z'
                    fill='white'
                  />
                </svg>
                <span className='ml-4'>
                  <p className='text-md font-poppins font-semibold not-italic'>
                    Untreated Patient
                  </p>
                  <p className='font-poppins text-sm not-italic'>40 Patient</p>
                </span>
              </div>

              <div className='flex p-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='36'
                  height='36'
                  viewBox='0 0 36 36'
                  fill='none'
                >
                  <rect width='36' height='36' rx='4' fill='#FFB800' />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M18 9.225C18 11.8352 15.8852 13.95 13.275 13.95C10.6648 13.95 8.55 11.8352 8.55 9.225C8.55 6.61477 10.6648 4.5 13.275 4.5C15.8852 4.5 18 6.61477 18 9.225ZM4.5 18.945C4.5 16.0722 10.3462 14.625 13.275 14.625C15.0948 14.625 18.0405 15.1839 20.0115 16.2956C18.794 16.9322 17.7428 17.8455 16.9423 18.9621C16.1418 20.0787 15.6145 21.3675 15.4026 22.725H4.5V18.945ZM22.05 17.325C22.05 17.146 22.1211 16.9743 22.2477 16.8477C22.3743 16.7211 22.546 16.65 22.725 16.65H25.425C25.604 16.65 25.7757 16.7211 25.9023 16.8477C26.0289 16.9743 26.1 17.146 26.1 17.325C26.1 17.504 26.0289 17.6757 25.9023 17.8023C25.7757 17.9289 25.604 18 25.425 18H24.75V19.3973C25.5319 19.5094 26.2729 19.8168 26.9046 20.2909L27.8455 19.35L27.6478 19.1522C27.5248 19.0249 27.4568 18.8544 27.4583 18.6774C27.4599 18.5004 27.5308 18.3311 27.656 18.206C27.7811 18.0808 27.9504 18.0099 28.1274 18.0083C28.3044 18.0068 28.4749 18.0748 28.6022 18.1978L29.9522 19.5478C30.0752 19.6751 30.1432 19.8456 30.1417 20.0226C30.1401 20.1996 30.0692 20.3689 29.944 20.494C29.8189 20.6192 29.6496 20.6901 29.4726 20.6917C29.2956 20.6932 29.1251 20.6252 28.9978 20.5022L28.8 20.3045L27.859 21.2454C28.3332 21.8771 28.6406 22.6181 28.7528 23.4H30.15V22.725C30.15 22.546 30.2211 22.3743 30.3477 22.2477C30.4743 22.1211 30.646 22.05 30.825 22.05C31.004 22.05 31.1757 22.1211 31.3023 22.2477C31.4289 22.3743 31.5 22.546 31.5 22.725V25.425C31.5 25.604 31.4289 25.7757 31.3023 25.9023C31.1757 26.0289 31.004 26.1 30.825 26.1C30.646 26.1 30.4743 26.0289 30.3477 25.9023C30.2211 25.7757 30.15 25.604 30.15 25.425V24.75H28.7528C28.664 25.3693 28.4524 25.9646 28.1304 26.501L29.475 27.8455L29.6728 27.6478C29.8001 27.5248 29.9706 27.4568 30.1476 27.4583C30.3246 27.4599 30.4939 27.5308 30.619 27.656C30.7442 27.7811 30.8151 27.9504 30.8167 28.1274C30.8182 28.3044 30.7502 28.4749 30.6272 28.6022L29.2772 29.9522C29.1499 30.0752 28.9794 30.1432 28.8024 30.1417C28.6254 30.1401 28.4561 30.0692 28.331 29.944C28.2058 29.8189 28.1349 29.6496 28.1333 29.4726C28.1318 29.2956 28.1998 29.1251 28.3228 28.9978L28.5205 28.8L27.2731 27.5533C26.5727 28.1989 25.693 28.6169 24.75 28.7521V30.15H25.425C25.604 30.15 25.7757 30.2211 25.9023 30.3477C26.0289 30.4743 26.1 30.646 26.1 30.825C26.1 31.004 26.0289 31.1757 25.9023 31.3023C25.7757 31.4289 25.604 31.5 25.425 31.5H22.725C22.546 31.5 22.3743 31.4289 22.2477 31.3023C22.1211 31.1757 22.05 31.004 22.05 30.825C22.05 30.646 22.1211 30.4743 22.2477 30.3477C22.3743 30.2211 22.546 30.15 22.725 30.15H23.4V28.7528C22.6181 28.6406 21.8771 28.3332 21.2454 27.859L20.3045 28.8L20.5022 28.9978C20.6252 29.1251 20.6932 29.2956 20.6917 29.4726C20.6901 29.6496 20.6192 29.8189 20.494 29.944C20.3689 30.0692 20.1996 30.1401 20.0226 30.1417C19.8456 30.1432 19.6751 30.0752 19.5478 29.9522L18.1978 28.6022C18.0748 28.4749 18.0068 28.3044 18.0083 28.1274C18.0099 27.9504 18.0808 27.7811 18.206 27.656C18.3311 27.5308 18.5004 27.4599 18.6774 27.4583C18.8544 27.4568 19.0249 27.5248 19.1522 27.6478L19.35 27.8455L20.2909 26.9046C19.8168 26.2729 19.5094 25.5319 19.3973 24.75H18V25.425C18 25.604 17.9289 25.7757 17.8023 25.9023C17.6757 26.0289 17.504 26.1 17.325 26.1C17.146 26.1 16.9743 26.0289 16.8477 25.9023C16.7211 25.7757 16.65 25.604 16.65 25.425V22.725C16.65 22.546 16.7211 22.3743 16.8477 22.2477C16.9743 22.1211 17.146 22.05 17.325 22.05C17.504 22.05 17.6757 22.1211 17.8023 22.2477C17.9289 22.3743 18 22.546 18 22.725V23.4H19.3973C19.5094 22.6181 19.8168 21.8771 20.2909 21.2454L19.35 20.3045L19.1522 20.5022C19.0249 20.6252 18.8544 20.6932 18.6774 20.6917C18.5004 20.6901 18.3311 20.6192 18.206 20.494C18.0808 20.3689 18.0099 20.1996 18.0083 20.0226C18.0068 19.8456 18.0748 19.6751 18.1978 19.5478L19.5478 18.1978C19.6751 18.0748 19.8456 18.0068 20.0226 18.0083C20.1996 18.0099 20.3689 18.0808 20.494 18.206C20.6192 18.3311 20.6901 18.5004 20.6917 18.6774C20.6932 18.8544 20.6252 19.0249 20.5022 19.1522L20.3045 19.35L21.2454 20.2909C21.8771 19.8168 22.6181 19.5094 23.4 19.3973V18H22.725C22.546 18 22.3743 17.9289 22.2477 17.8023C22.1211 17.6757 22.05 17.504 22.05 17.325Z'
                    fill='white'
                  />
                </svg>
                <span className='ml-4'>
                  <p className='text-md font-poppins font-semibold not-italic'>
                    Treated Patient
                  </p>
                  <p className='font-poppins text-sm not-italic'>40 Patient</p>
                </span>
              </div> */}

              <div className='flex p-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='36'
                  height='36'
                  viewBox='0 0 36 36'
                  fill='none'
                >
                  <rect width='36' height='36' rx='4' fill='#00CB20' />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M18 9.225C18 11.8352 15.8852 13.95 13.275 13.95C10.6648 13.95 8.55 11.8352 8.55 9.225C8.55 6.61477 10.6648 4.5 13.275 4.5C15.8852 4.5 18 6.61477 18 9.225ZM4.5 18.945C4.5 16.0722 10.3462 14.625 13.275 14.625C15.0948 14.625 18.0405 15.1839 20.0115 16.2956C18.794 16.9322 17.7428 17.8455 16.9423 18.9621C16.1418 20.0787 15.6145 21.3675 15.4026 22.725H4.5V18.945ZM22.05 17.325C22.05 17.146 22.1211 16.9743 22.2477 16.8477C22.3743 16.7211 22.546 16.65 22.725 16.65H25.425C25.604 16.65 25.7757 16.7211 25.9023 16.8477C26.0289 16.9743 26.1 17.146 26.1 17.325C26.1 17.504 26.0289 17.6757 25.9023 17.8023C25.7757 17.9289 25.604 18 25.425 18H24.75V19.3973C25.5319 19.5094 26.2729 19.8168 26.9046 20.2909L27.8455 19.35L27.6478 19.1522C27.5248 19.0249 27.4568 18.8544 27.4583 18.6774C27.4599 18.5004 27.5308 18.3311 27.656 18.206C27.7811 18.0808 27.9504 18.0099 28.1274 18.0083C28.3044 18.0068 28.4749 18.0748 28.6022 18.1978L29.9522 19.5478C30.0752 19.6751 30.1432 19.8456 30.1417 20.0226C30.1401 20.1996 30.0692 20.3689 29.944 20.494C29.8189 20.6192 29.6496 20.6901 29.4726 20.6917C29.2956 20.6932 29.1251 20.6252 28.9978 20.5022L28.8 20.3045L27.859 21.2454C28.3332 21.8771 28.6406 22.6181 28.7528 23.4H30.15V22.725C30.15 22.546 30.2211 22.3743 30.3477 22.2477C30.4743 22.1211 30.646 22.05 30.825 22.05C31.004 22.05 31.1757 22.1211 31.3023 22.2477C31.4289 22.3743 31.5 22.546 31.5 22.725V25.425C31.5 25.604 31.4289 25.7757 31.3023 25.9023C31.1757 26.0289 31.004 26.1 30.825 26.1C30.646 26.1 30.4743 26.0289 30.3477 25.9023C30.2211 25.7757 30.15 25.604 30.15 25.425V24.75H28.7528C28.664 25.3693 28.4524 25.9646 28.1304 26.501L29.475 27.8455L29.6728 27.6478C29.8001 27.5248 29.9706 27.4568 30.1476 27.4583C30.3246 27.4599 30.4939 27.5308 30.619 27.656C30.7442 27.7811 30.8151 27.9504 30.8167 28.1274C30.8182 28.3044 30.7502 28.4749 30.6272 28.6022L29.2772 29.9522C29.1499 30.0752 28.9794 30.1432 28.8024 30.1417C28.6254 30.1401 28.4561 30.0692 28.331 29.944C28.2058 29.8189 28.1349 29.6496 28.1333 29.4726C28.1318 29.2956 28.1998 29.1251 28.3228 28.9978L28.5205 28.8L27.2731 27.5533C26.5727 28.1989 25.693 28.6169 24.75 28.7521V30.15H25.425C25.604 30.15 25.7757 30.2211 25.9023 30.3477C26.0289 30.4743 26.1 30.646 26.1 30.825C26.1 31.004 26.0289 31.1757 25.9023 31.3023C25.7757 31.4289 25.604 31.5 25.425 31.5H22.725C22.546 31.5 22.3743 31.4289 22.2477 31.3023C22.1211 31.1757 22.05 31.004 22.05 30.825C22.05 30.646 22.1211 30.4743 22.2477 30.3477C22.3743 30.2211 22.546 30.15 22.725 30.15H23.4V28.7528C22.6181 28.6406 21.8771 28.3332 21.2454 27.859L20.3045 28.8L20.5022 28.9978C20.6252 29.1251 20.6932 29.2956 20.6917 29.4726C20.6901 29.6496 20.6192 29.8189 20.494 29.944C20.3689 30.0692 20.1996 30.1401 20.0226 30.1417C19.8456 30.1432 19.6751 30.0752 19.5478 29.9522L18.1978 28.6022C18.0748 28.4749 18.0068 28.3044 18.0083 28.1274C18.0099 27.9504 18.0808 27.7811 18.206 27.656C18.3311 27.5308 18.5004 27.4599 18.6774 27.4583C18.8544 27.4568 19.0249 27.5248 19.1522 27.6478L19.35 27.8455L20.2909 26.9046C19.8168 26.2729 19.5094 25.5319 19.3973 24.75H18V25.425C18 25.604 17.9289 25.7757 17.8023 25.9023C17.6757 26.0289 17.504 26.1 17.325 26.1C17.146 26.1 16.9743 26.0289 16.8477 25.9023C16.7211 25.7757 16.65 25.604 16.65 25.425V22.725C16.65 22.546 16.7211 22.3743 16.8477 22.2477C16.9743 22.1211 17.146 22.05 17.325 22.05C17.504 22.05 17.6757 22.1211 17.8023 22.2477C17.9289 22.3743 18 22.546 18 22.725V23.4H19.3973C19.5094 22.6181 19.8168 21.8771 20.2909 21.2454L19.35 20.3045L19.1522 20.5022C19.0249 20.6252 18.8544 20.6932 18.6774 20.6917C18.5004 20.6901 18.3311 20.6192 18.206 20.494C18.0808 20.3689 18.0099 20.1996 18.0083 20.0226C18.0068 19.8456 18.0748 19.6751 18.1978 19.5478L19.5478 18.1978C19.6751 18.0748 19.8456 18.0068 20.0226 18.0083C20.1996 18.0099 20.3689 18.0808 20.494 18.206C20.6192 18.3311 20.6901 18.5004 20.6917 18.6774C20.6932 18.8544 20.6252 19.0249 20.5022 19.1522L20.3045 19.35L21.2454 20.2909C21.8771 19.8168 22.6181 19.5094 23.4 19.3973V18H22.725C22.546 18 22.3743 17.9289 22.2477 17.8023C22.1211 17.6757 22.05 17.504 22.05 17.325Z'
                    fill='white'
                  />
                </svg>
                <span className='ml-4'>
                  <p className='text-md font-poppins font-semibold not-italic'>
                    Patient Healed
                  </p>
                  <p className='font-poppins text-sm not-italic'>
                    {discharge_patient} Patient
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className='cols-span-1 flex w-full justify-center rounded-lg border bg-white p-4 lg:col-span-2'>
            <canvas id='case_chart' width={300} height={300}></canvas>
          </div>
          <div className='cols-span-1 flex w-full justify-between rounded-lg border bg-white p-4 lg:col-span-3'>
            <canvas id='inout_chart'></canvas>
          </div>
        </div>
        <div className='flex p-4 w-[1172px] gap-1 justify-between'>
        {/* <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-7'> */}
          {/* <TableAlert /> */}
          <div className='relative flex flex-col items-center w-[642px] rounded-lg border bg-white p-2'>
            <div className='font-poppins text-2xl font-black not-italic p-4'>Patient Early Warning Score Condition</div>
            <table className=' w-[100%] text-center font-poppins text-xs not-italic leading-[normal] text-[#2D2D2D]'>
              {data_main_dashboard.length != 0 ? (
                <thead className='border-b text-xs font-medium'>
                  <tr>
                    <th scope='col' className='py-2'>MRN</th>
                    <th scope='col' className='py-2'>Patient Name</th>
                    <th scope='col' className='py-2'>Room</th>
                    <th scope='col' className='py-2'>HR</th>
                    <th scope='col' className='py-2'>RR</th>
                    <th scope='col' className='py-2'>%SpO2</th>
                    <th scope='col' className='py-2'>Temp</th>
                    <th scope='col' className='py-2'>NIBP</th>
                  </tr>
                </thead>
              ) : (
                ''
              )}

              <tbody className='font-normal'>
                {/* (searchValue == '' ? data_main_dashboard : searchResults) */}
                {/* color_indicator(item.id) */}
                {sortedData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${color_indicator_alert(item.indicator)}`}
                  >
                    <td className='py-2 px-2'>{item.id}</td>
                    <td className='py-2'>{item.patient_name}</td>
                    <td className='py-2 px-2'>{item.patient_room}</td>
                    <td className='py-2 px-2'>{lastestHR(item.id)}</td>
                    <td className='py-2 px-2'>{lastestRR(item.id)}</td>
                    <td className='py-2 px-2'>{lastestSpo2(item.id)}</td>
                    <td className='py-2 px-2'>{lastestTemp(item.id)}</td>
                    <td className='py-2 px-2'>
                      {lastestNibpSystolic(item.id)}/
                      {lastestNibpDiastolic(item.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='h-[300px] w-[478px] flex flex-col rounded-lg border bg-white p-2 md:col-span-3'>
            <canvas id='gender_chart'></canvas>
          </div>
        </div>
        
        <AutoGoToTop />

        {/* <div className={styles['table-bg']}>p</div> */}
      </div>
    </BaseLayout>
  );
}


  //Color Indicator
  // const color_indicator = (patient_id: any) => {
  //   return lastestRR(patient_id) < 8 ||
  //     lastestRR(patient_id) > 35 ||
  //     lastestHR(patient_id) > 130 ||
  //     lastestSpo2(patient_id) < 80 ||
  //     lastestNibpSystolic(patient_id) > 180 ||
  //     lastestNibpDiastolic(patient_id) > 120 ||
  //     lastestNibpSystolic(patient_id) <= 50 ||
  //     lastestNibpDiastolic(patient_id) <= 33
  //     ? 'bg-[#FF8D8D]' //Red Indicator
  //     : lastestHR(patient_id) < 40 ||
  //       lastestHR(patient_id) > 120 ||
  //       (lastestRR(patient_id) >= 30 && lastestRR(patient_id) <= 35) ||
  //       (lastestSpo2(patient_id) >= 80 && lastestSpo2(patient_id) <= 89) ||
  //       lastestTemp(patient_id) > 40 ||
  //       (lastestNibpSystolic(patient_id) >= 140 && lastestNibpSystolic(patient_id) <= 180) ||
  //       (lastestNibpDiastolic(patient_id) >= 90 && lastestNibpDiastolic(patient_id) <= 120) ||
  //       (lastestNibpSystolic(patient_id) >= 51 && lastestNibpSystolic(patient_id) <= 60) ||
  //       (lastestNibpDiastolic(patient_id) >= 34 && lastestNibpDiastolic(patient_id) <= 40)
  //     ? 'bg-[#FFC47F]' //Orange Indicator
  //     : (lastestHR(patient_id) >= 111 && lastestHR(patient_id) <= 120) ||
  //       (lastestRR(patient_id) >= 25 && lastestRR(patient_id) <= 29) ||
  //       (lastestSpo2(patient_id) >= 90 && lastestSpo2(patient_id) <= 94) ||
  //       (lastestTemp(patient_id) >= 38.1 && lastestTemp(patient_id) <= 40) ||
  //       (lastestNibpSystolic(patient_id) >= 120 && lastestNibpSystolic(patient_id) <= 139) ||
  //       (lastestNibpDiastolic(patient_id) >= 80 && lastestNibpDiastolic(patient_id) <= 89) ||
  //       (lastestNibpSystolic(patient_id) >= 61 && lastestNibpSystolic(patient_id) <= 90) ||
  //       (lastestNibpDiastolic(patient_id) >= 41 && lastestNibpDiastolic(patient_id) <= 60)
  //     ? 'bg-[#FDFF9C]' //Yellow Indicator
  //     : (lastestHR(patient_id) >= 50 && lastestHR(patient_id) <= 110) ||
  //       (lastestRR(patient_id) >= 8 && lastestRR(patient_id) <= 24) ||
  //       lastestSpo2(patient_id) >= 95 ||
  //       (lastestTemp(patient_id) >= 36 && lastestTemp(patient_id) <= 38) ||
  //       (lastestNibpSystolic(patient_id) >= 91 && lastestNibpSystolic(patient_id) <= 120) ||
  //       (lastestNibpDiastolic(patient_id) >= 61 && lastestNibpDiastolic(patient_id) < 80)
  //     ? 'bg-[#9CFFA0]' //Green Indicator
  //     : 'bg-[#AFE2FF]';
  // };