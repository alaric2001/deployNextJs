import BaseLayout from '@/pages/dashboard/baselayout';
import styles from './MainContent.module.css';
import patient_dummy_data from '@/components/dummyData/patient_dummy';
// import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import AutoGoToTop from '@/components/AutoGoToTop';
// import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';




export default function Ews_iot() {
  //Search Control
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [data_ews, setData_ews] = useState<any[]>([]);
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
      const response = await axios.get('https://patientmonitoring.my.id/api/patient-ttv');
      // const response = await axios.get('http://localhost:8000/api/patient-ttv'); // Replace with your API URL
      // const response = await axios.get(
      //   'https://4f23-113-11-180-109.ngrok-free.app/api/patient-ttv',
      //   {
      //     headers: {
      //       'ngrok-skip-browser-warning': 'any',
      //     },
      //   }
      // ); // Replace with your API URL
      setData_ews(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data from API.');
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const filtered_data = patient_dummy_data.filter((item) =>
      item.patient_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filtered_data);
  };
  //Search Placeholder Control
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [placeholderSearch, setPlaceholderSearch] = useState<boolean>(true);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        placeholderRef.current &&
        !placeholderRef.current.contains(e.target as Node)
      ) {
        setPlaceholderSearch(true);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const handleClick = () => setPlaceholderSearch(!placeholderSearch);

  const [data, setData] = useState<any[]>([]);

  //Color Indicator Alert
  const color_indicator_alert = (indicator: any) => {
    return indicator == 'red'
      ? 'bg-[#FF8D8D]'
      : indicator == 'orange'
      ? 'bg-[#FFC47F]'
      : indicator == 'yellow'
      ? 'bg-[#FDFF9C]'
      : indicator == 'green'
      ? 'bg-[#9CFFA0]'
      : 'bg-[#AFE2FF]';
  };

  //Sort By Indicator
  const colorOrder = ['red', 'orange', 'yellow', 'green', 'blue'];

  // Custom sorting function based on colorOrder
  const sortedData = data_ews
    .filter((item) => item.indicator === 'red' || item.indicator === 'orange')
    .sort((a, b) => {
      const aIndex = colorOrder.indexOf(a.indicator);
      const bIndex = colorOrder.indexOf(b.indicator);
      return aIndex - bIndex;
    });

  // CREATE DELAY
  // useEffect(() => {
  //   const fetchDataWithDelay = async () => {
  //     // Dummy data (replace this with your actual API call)
  //     const dummyData = patient_dummy_data;

  //     for (const item of dummyData) {
  //       // Simulate a delay of 5 seconds for each item
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       setData((prevData) => [...prevData, item]);
  //     }
  //   };
  //   fetchDataWithDelay();
  // }, []);

  const handleCheckboxClick = async (
    patientId: any,
    vitalSignId: any,
    type: any,
    currentValue: any
  ) => {
    try {
      // const newValue = currentValue === 1 ? 0 : 1;
      const response = await axios.post(
        `https://patientmonitoring.my.id/api/update-patient-check/${patientId}/${vitalSignId}/${type}/${currentValue}`
        // `http://localhost:8000/api/update-patient-check/${patientId}/${vitalSignId}/${type}/${currentValue}`
      //   `https://4f23-113-11-180-109.ngrok-free.app/api/update-patient-check/${patientId}/${vitalSignId}/${type}/${currentValue}`,
      //   {
      //     headers: {
      //       'ngrok-skip-browser-warning': 'any',
      //     },
      //   }
      );
      // console.log('API Response:', response.data); // Log the response data
      if (response.data.message === 'Patient check updated successfully') {
        fetchData(); // Fetch data again after updating patient_check
      }
    } catch (error) {
      console.error('Error updating patient_check:', error);
    }
  };
  // console.log(sortedData.map((item, index) => item.hr[0].patient_check));
  // console.log(data_ews)

  return (
    <BaseLayout>
      {/* TITLE FRAME*/}
      <div className={`${styles.title} font-inter`}>
        <p>Early Warning System</p>
      </div>

      {/* <div> */}
      {data_ews.length != 0
        ? sortedData.map((item, index) => (
            <div key={index} className={`${styles['ews-bg']} ${color_indicator_alert(item.indicator)}`}>
              {/* Kiri */}
              <div className='w-[300px]'>
                <p className='font-poppins text-2xl font-bold not-italic leading-[normal] text-black'>
                  {item.patient_name}
                </p>
                <div className='flex gap-5'>
                  <p>MRN: {item.id} </p>
                  <p>Room: {item.patient_room}</p>
                </div>
              </div>

              {/* Kanan */}
              <div>
                <table>
                  <thead>
                    <tr className='border-b border-gray-500 text-center'>
                      <th className='px-4'>Patient Handled</th>
                      <th>Time/Date</th>
                      <th>Vital Sign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* HR */}
                    <tr className={`${item.alert_hr_date ? '' : 'hidden'}`}>
                      <td className='py-1 text-center'>
                        <input
                          type='checkbox'
                          className='cursor-pointer h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500'
                          checked={
                            item.hr.length > 0 && item.hr[0].patient_check == 1
                          } // Set checked based on patient_check value
                          onChange={() =>
                            handleCheckboxClick(item.id, item.hr[0].id, 'hr', item.hr[0].patient_check)
                          }
                        />
                      </td>
                      <td className='w-[150px] py-1 text-center'>
                        {item.alert_hr_date}
                      </td>
                      <td className='w-[160px] px-1 py-1'>
                        Heart Rate: {item.alert_patient_hr}
                      </td>
                    </tr>

                    {/* RR */}
                    <tr className={`${item.alert_rr_date ? '' : 'hidden'}`}>
                      <td className='py-1 text-center'>
                        <input
                          type='checkbox'
                          className='cursor-pointer h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500'
                          checked={
                            item.rr.length > 0 && item.rr[0].patient_check == 1
                          } // Set checked based on patient_check value
                          onChange={() =>
                            handleCheckboxClick(item.id, item.rr[0].id, 'rr', item.rr[0].patient_check)
                          }
                        />
                      </td>
                      <td className='w-[150px] py-1 text-center'>
                        {item.alert_rr_date}
                      </td>
                      <td className='w-[166px] px-1 py-1'>
                        Respiration Rate: {item.alert_patient_rr}
                      </td>
                    </tr>

                    {/* Temp */}
                    <tr className={`${item.alert_temp_date ? '' : 'hidden'}`}>
                      <td className='py-1 text-center'>
                        <input
                          type='checkbox'
                          className='cursor-pointer h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500'
                          checked={
                            item.temp.length > 0 &&
                            item.temp[0].patient_check == 1
                          } // Set checked based on patient_check value
                          onChange={() =>
                            handleCheckboxClick(
                              item.id,
                              item.temp[0].id,
                              'temp', item.temp[0].patient_check
                            )
                          }
                        />
                      </td>
                      <td className='w-[150px] py-1 text-center'>
                        {item.alert_temp_date}
                      </td>
                      <td className='w-[160px] px-1 py-1'>
                        Temperature: {item.alert_patient_temp}
                      </td>
                    </tr>

                    {/* Spo2 */}
                    <tr className={`${item.alert_spo2_date ? '' : 'hidden'}`}>
                      <td className='py-1 text-center'>
                        <input
                          type='checkbox'
                          className='cursor-pointer h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500'
                          checked={
                            item.spo2.length > 0 &&
                            item.spo2[0].patient_check == 1
                          } // Set checked based on patient_check value
                          onChange={() =>
                            handleCheckboxClick(
                              item.id,
                              item.spo2[0].id,
                              'spo2', item.spo2[0].patient_check
                            )
                          }
                        />
                      </td>
                      <td className='w-[150px] py-1 text-center'>
                        {item.alert_spo2_date}
                      </td>
                      <td className='w-[160px] px-1 py-1'>
                        Spo2: {item.alert_patient_spo2}
                      </td>
                    </tr>

                    {/* Nibp */}
                    <tr className={`${item.alert_nibp_date ? '' : 'hidden'}`}>
                      <td className='py-1 text-center'>
                        <input
                          type='checkbox'
                          className='cursor-pointer h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500'
                          checked={
                            item.nibp.length > 0 && item.nibp[0].patient_check == 1
                          } // Set checked based on patient_check value
                          onChange={() =>
                            handleCheckboxClick(item.id, item.nibp[0].id, 'nibp', item.nibp[0].patient_check)
                          }
                        />
                      </td>
                      <td className='w-[150px] py-1 text-center'>
                        {item.alert_nibp_date}
                      </td>
                      <td className='w-[160px] px-1 py-1'>
                        Nibp: {item.alert_patient_systolic}/
                        {item.alert_patient_diastolic}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        : 
        <div className={`${styles['ews-bg']} ${'bg-gray-200 flex justify-center'}`}>No Warning</div>
      }
      {/* </div> */}
      {/* <div className={styles['ews-bg']}>Patient handling 2</div>
      <div className={styles['ews-bg']}>Patient handling 3</div> */}
      <AutoGoToTop />
    </BaseLayout>
  );
}


{
  /* <Link href='/dashboard/patient_admission'>
          <button className='h-[30px] w-[139px] rounded bg-btn-primary text-center text-xs font-medium not-italic leading-[normal] text-[white] focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-500'>
            Add EWS & IoT Device
          </button>
        </Link> */
}