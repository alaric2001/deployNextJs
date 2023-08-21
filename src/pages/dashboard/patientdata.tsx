import BaseLayout from '@/pages/dashboard/baselayout'
import styles from './MainContent.module.css';
import Side_bar from '@/pages/dashboard/side_bar';
import Nav_bar from '@/pages/dashboard/nav_bar';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import AutoGoToTop from '@/components/AutoGoToTop';
import axios from 'axios';

export default function Patientdata() {
  // FETCH DATA PATIENT
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  //Fetching Data From API
  useEffect(() => {
    fetchDataFromApis();
    // Set up an interval to fetch data every 5 seconds
    const interval = setInterval(fetchDataFromApis, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const fetchDataFromApis = async () => {
    try {
      // const patientApi = await axios.get(
      //   'http://localhost:8000/api/patient-ttv'
      // );
      const patientApi = await axios.get('https://patientmonitoring.my.id/api/patient-ttv');
      // const patientApi = await axios.get(
      //   'https://4f23-113-11-180-109.ngrok-free.app/api/patient-ttv',
      //   {
      //     headers: {
      //       'ngrok-skip-browser-warning': 'any',
      //     },
      //   }
      // );
      setPatients(patientApi.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Search Control
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const filtered_data = patients.filter((item) =>
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

  //SORT DATA PATIEN
  const [sortingChoice, setSortingChoice] = useState('');
  const handleSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingChoice(event.target.value);
  };
  const sortData = (option: any) => {
    // Convert String Date
    const sort_admission_date = (
      a: { admission_date: string },
      b: { admission_date: string }
    ) => {
      const date1 = a.admission_date.split('/').reverse().join('');
      const date2 = b.admission_date.split('/').reverse().join('');
      return date1.localeCompare(date2);
    };

    const discharge_date_sort = (
      c: { discharge_date: any },
      d: { discharge_date: any }
    ) => {
      const date1 = c.discharge_date.split('/').reverse().join('');
      const date2 = d.discharge_date.split('/').reverse().join('');
      return date1.localeCompare(date2);
    };
    if (searchValue == '') {
      if (option === 'name') {
        return patients.sort((a, b) =>
          a.patient_name.localeCompare(b.patient_name)
        );
      } else if (option === 'indate') {
        patients.sort(sort_admission_date);
      } else if (option === 'outdate') {
        patients.sort(discharge_date_sort);
      } else if (option === 'room') {
        return patients.sort((a, b) => a.patient_room.localeCompare(b.patient_room));
      } else if (option === 'mrn') {
        return patients.sort((a, b) => a.id - b.id); // Default sorting, do not change the order
      } else {
        return patients;
      }
    } else {
      if (option === 'name') {
        return searchResults.sort((a, b) =>
          a.patient_name.localeCompare(b.patient_name)
        );
      } else if (option === 'indate') {
        searchResults.sort(sort_admission_date);
      } else if (option === 'outdate') {
        searchResults.sort(discharge_date_sort);
      } else if (option === 'room') {
        return searchResults.sort((a, b) => a.patient_room.localeCompare(b.patient_room));
      } else if (option === 'mrn') {
        return searchResults.sort((a, b) => a.id - b.id); // Default sorting, do not change the order
      } else {
        return searchResults;
      }
    }
  };
  const sortedData = sortData(sortingChoice);

  //Ambil data HR berdasarkan ID Pasien
  // const rr_filter = (id: any) => {
  //   const filtering = hr.find((item) => item.patient_id == id);
  //   return <p>{filtering ? filtering.heart_beats : '-'}</p>;
  // };

  
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
  const take_hr = patients.map((data) => data.hr.map((hr: any) => hr));
  const lastestHR = (id: any) => {
    const filteringLastestHR = take_hr[id - 1];
    if (!filteringLastestHR || filteringLastestHR.length === 0) {
      return '-';
    }
    filteringLastestHR.sort(sortBy_created_at);
    // return (
    //   <p>{filteringLastestHR[0] ? filteringLastestHR[0].heart_beats : '-'}</p>
    // ); // The first element after sorting is the latest data
    return filteringLastestHR[0] ? filteringLastestHR[0].heart_beats : '-';
  };

  //Ambil data RR terakhir berdasarkan ID Pasien
  const take_rr = patients.map((data) => data.rr.map((rr: any) => rr));
  const lastestRR = (id: any) => {
    const filteringLastestRR = take_rr[id - 1];
    if (!filteringLastestRR || filteringLastestRR.length === 0) {
      return '-';
    }
    filteringLastestRR.sort(sortBy_created_at);
    return filteringLastestRR[0] ? filteringLastestRR[0].breaths : '-';
  };

  //Ambil data Spo2 terakhir berdasarkan ID Pasien
  const take_spo2 = patients.map((data) => data.spo2.map((spo2: any) => spo2));
  const lastestSpo2 = (id: any) => {
    const filteringLastestSpo2 = take_spo2[id - 1];
    if (!filteringLastestSpo2 || filteringLastestSpo2.length === 0) {
      return '-';
    }
    filteringLastestSpo2.sort(sortBy_created_at);
    return filteringLastestSpo2[0] ? filteringLastestSpo2[0].blood_oxygen : '-';
  };

  //Ambil data Suhu Pasien terakhir berdasarkan ID Pasien
  const take_temp = patients.map((data) => data.temp.map((temp: any) => temp));
  const lastestTemp = (id: any) => {
    const filteringLastestTemp = take_temp[id - 1];
    if (!filteringLastestTemp || filteringLastestTemp.length === 0) {
      return '-';
    }
    filteringLastestTemp.sort(sortBy_created_at);
    return filteringLastestTemp[0] ? filteringLastestTemp[0].patient_temp : '-';
  };

  //Ambil data NIBP Pasien terakhir berdasarkan ID Pasien
  const take_nibp = patients.map((data) => data.nibp.map((nibp: any) => nibp));
  const lastestNibpSystolic = (id: any) => {
    const filteringLastestNibp = take_nibp[id - 1];
    if (filteringLastestNibp.length === 0) {
      return '-';
    }
    filteringLastestNibp.sort(sortBy_created_at);
    return filteringLastestNibp[0] ? filteringLastestNibp[0].systolic : '-';
    // return (
    //   <>
    //     <span>
    //       {filteringLastestNibp[0] ? filteringLastestNibp[0].systolic : '-'}
    //     </span>
    //     <span>
    //       /{filteringLastestNibp[0] ? filteringLastestNibp[0].diastolic : '-'}
    //     </span>
    //   </>
    // );
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


  // Color Indicataor for Vital Sign Column
  const hr_color_indicator = (patient_id: any) => {
    return lastestHR(patient_id) >= 131 || lastestHR(patient_id) <= 40
      ? 'bg-[#FF8D8D]' //Red Indicator
      : lastestHR(patient_id)>= 111 && lastestHR(patient_id) <= 130
      ? 'bg-[#FFC47F]' //Orange Indicator
      : (lastestHR(patient_id) >= 41 && lastestHR(patient_id) <= 50) || (lastestHR(patient_id) >= 91 && lastestHR(patient_id) <= 110)
      ? 'bg-[#FDFF9C]' //Yellow Indicator
      : lastestHR(patient_id) >= 51 && lastestHR(patient_id) <= 90
      ? 'bg-[#9CFFA0]' //Green Indicator
      : 'bg-[#AFE2FF]';
  };

  const rr_color_indicator = (id: any) => {
    return lastestRR(id) < 8 || lastestRR(id) >= 25
      ? 'bg-[#FF8D8D]' //Red Indicator
      : lastestRR(id) >= 21 && lastestRR(id) <= 24
      ? 'bg-[#FFC47F]' //Orange Indicator
      : lastestRR(id) >= 9 && lastestRR(id) <= 11
      ? 'bg-[#FDFF9C]' //Yellow Indicator
      : lastestRR(id) >= 12 && lastestRR(id) <= 20
      ? 'bg-[#9CFFA0]' //Green Indicator
      : 'bg-[#AFE2FF]';
  };

    const temp_color_indicator = (id: any) => {
      return lastestTemp(id) <= 35
        ? 'bg-[#FF8D8D]' //Red Indicator
        : lastestTemp(id) >= 39.1
        ? 'bg-[#FFC47F]' //Orange Indicator
        : (lastestTemp(id) >= 38.1 && lastestTemp(id) <= 39) ||
          (lastestTemp(id) >= 35.1 && lastestTemp(id) <= 36)
        ? 'bg-[#FDFF9C]' //Yellow Indicator
        : lastestTemp(id) >= 36.1 && lastestTemp(id) <= 38
        ? 'bg-[#9CFFA0]' //Green Indicato
        : 'bg-[#AFE2FF]';
    };

  const spo2_color_indicator = (id: any) => {
    return lastestSpo2(id) <= 91
      ? 'bg-[#FF8D8D]' //Red Indicator
      : (lastestSpo2(id) >= 92 && lastestSpo2(id) <= 93)
      ? 'bg-[#FFC47F]' //Orange Indicator
      : (lastestSpo2(id) >= 94 && lastestSpo2(id) <= 95)
      ? 'bg-[#FDFF9C]' //Yellow Indicator
      : lastestSpo2(id) >= 96
      ? 'bg-[#9CFFA0]' //Green Indicator
      : 'bg-[#AFE2FF]';
  };

  const nibp_color_indicator = (id: any) => {
    return lastestNibpSystolic(id) >= 220 ||
      lastestNibpSystolic(id) <= 90 ||
      lastestNibpDiastolic(id) > 120 ||
      lastestNibpDiastolic(id) <= 33
      ? 'bg-[#FF8D8D]' //Red Indicator
      : (lastestNibpSystolic(id) >= 91 && lastestNibpSystolic(id) <= 100) ||
        (lastestNibpDiastolic(id) >= 90 && lastestNibpDiastolic(id) <= 120) ||
        (lastestNibpDiastolic(id) >= 34 && lastestNibpDiastolic(id) <= 40)
      ? 'bg-[#FFC47F]' //Orange Indicator
      : (lastestNibpSystolic(id) >= 101 && lastestNibpSystolic(id) <= 110) ||
        (lastestNibpDiastolic(id) >= 80 && lastestNibpDiastolic(id) <= 89) ||
        (lastestNibpDiastolic(id) >= 41 && lastestNibpDiastolic(id) <= 60)
      ? 'bg-[#FDFF9C]' //Yellow Indicator
      : (lastestNibpSystolic(id) >= 111 && lastestNibpSystolic(id) <= 219) ||
        (lastestNibpDiastolic(id) >= 61 && lastestNibpDiastolic(id) < 80)
      ? 'bg-[#9CFFA0]' //Green Indicator
      : 'bg-[#AFE2FF]';
  };
  // Create gray bg table very even number
  // ${index % 2 != 0 ? 'bg-[#EAEAEA]' : ''}
  // console.log();

  return (
    <>
      <Nav_bar />
      <div className={styles.layout}>
        <Side_bar />
        <div className={styles.children}>
          {/* TITLE FRAME*/}
          <div className={`${styles.title} font-inter`}>
            <p>Patient Data</p>
          </div>

          {/* TABLE FRAME */}
          <div className={styles['table-bg']}>
            <div className='mx-6 flex items-center justify-between pt-6 '>
              {/* SEARCH PATIENT NAME */}
              <div className='relative inline-block'>
                <input
                  type='text'
                  className='w-[400px] rounded border border-solid border-[#C3C3C3] focus:border-gray-400 focus:ring-gray-400'
                  placeholder=''
                  value={searchValue}
                  onChange={handleInputChange}
                  onClick={handleClick}
                />
                <div
                  ref={placeholderRef}
                  className={`${
                    searchValue != '' || placeholderSearch == false
                      ? 'hidden'
                      : 'pointer-events-none absolute left-2.5 top-2/4 -translate-y-2/4'
                  }`}
                >
                  <div className='flex gap-1 text-[#C3C3C3]'>
                    <i className={`${'material-icons'}`}>search</i>
                    <p>Search Patient Name</p>
                  </div>
                </div>
              </div>

              {/* SORT PATIENT DATA */}
              <div className='flex items-center gap-3'>
                <p>Sort by</p>
                <select
                  className='h-8 w-[150px] rounded border-[#ECECEC] bg-[#ECECEC] text-xs'
                  onChange={handleSorting}
                  value={sortingChoice}
                >
                  <option value='mrn'></option>
                  <option value='name'>Patient Name</option>
                  <option value='indate'>Admission Date</option>
                  <option value='outdate'>Dischard Date</option>
                  <option value='room'>Room</option>
                </select>
              </div>
            </div>

            {/* table */}
            <div className='m-6 flex items-center justify-center'>
              <table className='w-[1172px] text-center font-poppins text-xs not-italic leading-[normal] text-[#2D2D2D]'>
                <thead className='border-b text-xs font-medium'>
                  <tr>
                    {/* <th scope='col' className='py-2'></th> */}
                    <th scope='col' className=' py-3'>MRN</th>
                    <th scope='col' className=' py-3'>Patient Name</th>
                    <th scope='col' className=' py-3'>Admission Date</th>
                    <th scope='col' className=' py-3'>Discharge Date</th>
                    <th scope='col' className=' py-3'>Room</th>
                    <th scope='col' className=' py-3'>Gender</th>
                    <th scope='col' className=' py-3'>Age</th>
                    <th scope='col' className=' py-3'>HR</th>
                    <th scope='col' className=' py-3'>RR</th>
                    <th scope='col' className=' py-3'>%SpO2</th>
                    <th scope='col' className=' py-3'>Temp</th>
                    <th scope='col' className=' py-3'>NIBP</th>
                    <th scope='col' className=' py-3'>Action</th>
                  </tr>
                </thead>
                <tbody className='font-normal'>
                  {(searchValue == '' ? patients : searchResults).map(
                    (item, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 != 0 ? 'bg-[#EAEAEA]' : ''}`}
                      >
                        <td className='py-2'>{item.id}</td>
                        <td className='py-2'>{item.patient_name}</td>
                        <td className='py-2'>{item.admission_date}</td>
                        <td className='py-2'>
                          {item.discharge_date != ''
                            ? item.discharge_date
                            : '-'}
                        </td>
                        <td className='py-2'>{item.patient_room}</td>
                        <td className='py-2'>{item.gender}</td>
                        <td className='py-2'>{item.age}</td>
                        <td className={`py-2 px-1 ${hr_color_indicator(item.id)}`}>
                          {lastestHR(item.id)}
                        </td>
                        <td className={`py-2 px-1 ${rr_color_indicator(item.id)}`}>
                          {lastestRR(item.id)}
                        </td>
                        <td className={`${'py-2'} ${spo2_color_indicator(item.id)}`}>
                          {lastestSpo2(item.id)}
                        </td>
                        <td className={`${'py-2'} ${temp_color_indicator(item.id)}`}>
                          {lastestTemp(item.id)}
                        </td>
                        <td className={`${'py-2'} ${nibp_color_indicator(item.id)}`}>
                          {lastestNibpSystolic(item.id)}/
                          {lastestNibpDiastolic(item.id)}
                        </td>
                        <td className=' py-2'>
                          <Link
                            href={`/dashboard/patient/vital_sign/${item.id}`}
                          >
                            <button
                              type='submit'
                              className={`${
                                styles['action-btn']
                              } ${'rounded-lg bg-btn-primary text-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-500'}`}
                            >
                              Detail
                            </button>
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AutoGoToTop />
    </>
  );
}

//Add patient btn
{
  /* <Link href='/dashboard/patient_admission'>
              <button className='h-[30px] w-[139px] rounded bg-btn-primary text-center text-xs font-medium not-italic leading-[normal] text-[white] focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-500'>
                Add New Patient
              </button>
            </Link> */
}

// Checkbox table
{
  /* <td className='py-4'>
                          <div className='flex items-center'>
                            <input
                              id='checkbox-table-search-1'
                              type='checkbox'
                              className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500  '
                            />
                            <label
                              key={index}
                              htmlFor='checkbox-table-search-1'
                              className='sr-only'
                            >
                              checkbox
                            </label>
                          </div>
                        </td> */
}