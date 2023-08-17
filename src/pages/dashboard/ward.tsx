import React, { useEffect, useState } from 'react'
import BaseLayout from '@/pages/dashboard/baselayout';
import styles from './MainContent.module.css';
import AutoGoToTop from '@/components/AutoGoToTop';
// import data_ward from '@/pages/dashboard/dummyData/data_ward';
import room_dummy_data from '@/pages/dashboard/dummyData/room_dummy_data';
import RomanNumerals from '@/pages/dashboard/dummyData/roman_numerals';
import axios from 'axios';

function Ward() {
  const [data_ward, setData_ward] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //Autoreload Fetching Data From API
  useEffect(() => {
    fetchData();
    // Set up an interval to fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Ward Data From API
  const fetchData = async () => {
    try {
      const response = await axios.get('https://patientmonitoring.my.id/api/wards');
      // const response = await axios.get('http://localhost:8000/api/wards'); // Replace with your API URL
      // const response = await axios.get(
      //   'https://4f23-113-11-180-109.ngrok-free.app/api/wards',
      //   {
      //     headers: {
      //       'ngrok-skip-browser-warning': 'any',
      //     },
      //   }
      // );
      setData_ward(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data from API.');
      setLoading(false);
    }
  };

  // Fungsi return Room berdasarkan Ward IDnya
  // const room_filter = (id: any) => {
  //   const filtering = data_ward.filter((item) => item.ward_id === id);
  //   return filtering?.map((ward, i) => (
  //     <div
  //       key={i}
  //       className={`${
  //         ward.patient_id == 0 ? 'bg-[#FFAF50]' : 'bg-[#00BB40]'
  //       } ${'flex h-10 w-10 items-center justify-center rounded text-[10px] text-white'}`}
  //     >
  //       {ward.room.room_name}
  //     </div>
  //   ));
  // };
// console.log(data_ward)
  //SORT WARD DATA
  const [sortingChoice, setSortingChoice] = useState('');
  const handleSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingChoice(event.target.value);
  };
  const sortData = (option: any) => {
      if (option === 'room_name') {
        return data_ward.sort((a, b) =>
          a.ward_name.localeCompare(b.ward_name)
        );
      } else if (option === 'room_rates') {
        // return data_ward.sort((a, b) => a.rates - b.rates);
        return data_ward.sort((a, b) => b.rates.localeCompare(a.rates));
      } else if (option === 'default') {
        return data_ward.sort((a, b) => a.id - b.id);
      } else {
        return data_ward;
      }
  };
  const sortedData = sortData(sortingChoice);


  // Convert number to Roman Numeral
  const convertToRoman = (num: any) => {
    let result = '';
    for (let i = 0; i < RomanNumerals.length; i++) {
      while (num >= RomanNumerals[i].value) {
        result += RomanNumerals[i].numeral;
        num -= RomanNumerals[i].value;
      }
    }
    return result;
  };

  return (
    <BaseLayout>
      <div className={`${styles.title}`}>Ward Data</div>
      <div className={styles['table-bg']}>
        <div className='mx-6 flex items-center justify-end pt-6 '>
          {/* SORT PATIENT DATA */}
          <div className='flex items-center gap-3'>
            <p>Sort by</p>
            <select
              className='h-8 w-[150px] rounded border-[#ECECEC] bg-[#ECECEC] text-xs'
              onChange={handleSorting}
              value={sortingChoice}
              // onChange={handleSorting}
              // value={sortingChoice}
            >
              <option value='default'></option>
              <option value='room_name'>Room Name</option>
              <option value='room_rates'>Room Rates</option>
            </select>
          </div>
        </div>

        {/* TABLE WARD DATA*/}
        <div className='m-6'>
          <table className='w-full text-center text-xs text-gray-500'>
            <thead className='border-b text-xs text-gray-700 '>
              <tr>
                <th scope='col' className='py-3'>No.</th>
                <th scope='col' className='py-3'>Room Name</th>
                <th scope='col' className='py-3'>Class</th>
                <th scope='col' className='py-3'>Room Desc.</th>
                <th scope='col' className='py-3'>Facilities</th>
                <th scope='col' className='py-3'>Room Rates</th>
                <th scope='col' className='py-3 text-left'>Avaiable Rooms</th>
              </tr>
            </thead>
            <tbody className=''>
              {data_ward.map((datas, i) => (
                <tr
                  key={i + 1}
                  className={`${i % 2 != 0 ? 'bg-[#EAEAEA]' : ''}`}
                >
                  <td className='py-4 px-4'>
                    {(i + 1).toString().padStart(2, '0')}
                  </td>
                  <td className='w-[160px] py-4 px-4 text-left'>
                    {datas.ward_name}
                  </td>
                  <td className='py-4 px-4'>{convertToRoman(datas.class)}</td>
                  <td className='py-4 px-4'>{datas.desc}</td>
                  <td className='py-4 px-4'>{datas.facilities}</td>
                  <td className='w-[100px] py-4 px-2'>
                    Rp.{' '}
                    {datas.rates
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </td>
                  <td className='w-[236px] px-2 py-4'>
                    <div className='flex flex-wrap gap-1'>
                      {/* {room_filter(datas.id)} */}
                      {datas.room.map((room: any, i:any) => (
                        <div
                          key={i}
                          className={`${
                            room.patient_id != null
                              ? 'bg-[#FFAF50]'
                              : 'bg-[#00BB40]'
                          } ${'flex h-10 w-10 items-center justify-center rounded text-[10px] text-white'}`}
                        >
                          {room.room_name}
                        </div>
                      ))}
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AutoGoToTop />
    </BaseLayout>
  );
}

export default Ward

//Action
{
  /* <th scope='col' className='py-3'>
                  Action
                </th> */
}
{
  /* <td className='py-4 px-2'>
                    <div className='flex items-center justify-center gap-1'>
                      <button className='flex rounded bg-[#00BB40] px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-green-600'>
                        <i className='material-icons cursor-pointer text-sm text-white'>
                          add
                        </i>
                      </button>
                      <button className='flex rounded bg-[#FFF500] px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-500'>
                        <i className='material-icons cursor-pointer text-sm text-black'>
                          edit
                        </i>
                      </button>
                      <button className='flex rounded bg-[#FF4949] px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-red-600'>
                        <i className='material-icons cursor-pointer text-sm text-white'>
                          delete_forever
                        </i>
                      </button>
                    </div>
                  </td> */
}