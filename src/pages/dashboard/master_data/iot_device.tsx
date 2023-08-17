import React, { useEffect, useRef, useState } from 'react';
import styles from '../MainContent.module.css';
import AutoGoToTop from '@/components/AutoGoToTop';
import BaseLayout from '@/pages/dashboard/baselayout';
import axios from 'axios';

function IoT_device() {
  // FETCH DATA PATIENT
  const [patients, setPatients] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  //Fetching Data From API
  useEffect(() => {
    fetchDataFromApis();
  }, []);
  const fetchDataFromApis = async () => {
    try {
      const patientApi = await axios.get('http://localhost:8000/api/patients');
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
        return patients.sort((a, b) => a.room.localeCompare(b.room));
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
        return searchResults.sort((a, b) => a.room.localeCompare(b.room));
      } else if (option === 'mrn') {
        return searchResults.sort((a, b) => a.id - b.id); // Default sorting, do not change the order
      } else {
        return searchResults;
      }
    }
  };
  const sortedData = sortData(sortingChoice);

  return (
    <BaseLayout>
      {/* Title */}
      <div className={`${styles.title}`}>Master Data Patient</div>
      {/* TABLE FRAME */}
      <div className={styles['table-master-bg']}>
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
          <table className='w-full text-center text-gray-500'>
            <thead className=' bg-[#EAEAEA] text-xs text-gray-700'>
              <tr>
                <th scope='col' className=' py-3' rowSpan={2}>
                  MRN
                </th>
                <th scope='col' className=' py-3' rowSpan={2}>
                  Patient Name
                </th>
                <th scope='col' className='py-3' rowSpan={2}>
                  Admission Date
                </th>
                <th scope='col' className='py-3' rowSpan={2}>
                  Discharge Date
                </th>
                <th scope='col' className='py-3' rowSpan={2}>
                  Room
                </th>
                <th scope='col' className='py-3' rowSpan={2}>
                  Gender
                </th>
                <th scope='col' className=' py-3' rowSpan={2}>
                  Birth
                </th>
                <th scope='col' className=' py-3' rowSpan={2}>
                  ID Card
                </th>
                <th scope='col' className=' py-3' rowSpan={2}>
                  Address
                </th>
                <th scope='col' className=' py-3' rowSpan={2}>
                  Contact
                </th>
                <th scope='col' className=' py-3' rowSpan={2}>
                  Education
                </th>
                <th scope='col' className=' py-3' rowSpan={2}>
                  Occupation
                </th>
                <th scope='col' className='py-1.5 text-sm' colSpan={4}>
                  Next Of Kin
                </th>
              </tr>
              <tr>
                <th scope='col' className='pb-2'>
                  Name
                </th>
                <th scope='col' className='pb-2'>
                  Relationship
                </th>
                <th scope='col' className='pb-2'>
                  Address
                </th>
                <th scope='col' className='pb-2'>
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className='text-xs'>
              {(searchValue == '' ? patients : searchResults).map(
                (item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 != 0 ? 'bg-[#EAEAEA]' : ''}`}
                  >
                    <td className='py-4 px-4'>{item.id}</td>
                    <td className='px-1 py-4'>{item.patient_name}</td>
                    <td className='py-4 px-4'>{item.admission_date}</td>
                    <td className='py-4 px-3'>
                      {item.discharge_date != '' ? item.discharge_date : '-'}
                    </td>
                    <td className='px-3 py-4'>{item.room}</td>
                    <td className='px-3 py-4'>{item.gender}</td>
                    <td className='px-1 py-4'>{item.birth}</td>
                    <td className='px-1 py-4'>{item.id_card}</td>
                    <td className='w-[140px] px-1 py-4'>{item.address}</td>
                    <td className='px-1 py-4'>{item.contact}</td>
                    <td className='px-1 py-4'>{item.education}</td>
                    <td className='w-[110px] px-1 py-4'>{item.occupation}</td>
                    <td className='px-1 py-4'>{item.next_of_kin_name}</td>
                    <td className='px-1 py-4'>{item.relationship}</td>
                    <td className='w-[140px] px-1 py-4'>
                      {item.next_of_kin_address}
                    </td>
                    <td className=' py-4'>{item.next_of_kin_contact}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AutoGoToTop />
    </BaseLayout>
  );
}

export default IoT_device;