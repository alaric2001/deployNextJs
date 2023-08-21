import React, { useEffect, useRef, useState } from 'react';
import styles from '../MainContent.module.css';
import AutoGoToTop from '@/components/AutoGoToTop';
import BaseLayout from '@/pages/dashboard/baselayout';
import axios from 'axios';

function Doctor() {
  // FETCH DATA PATIENT
  const [doctor, setDoctor] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  //Fetching Data From API
  useEffect(() => {
    fetchDataFromApis();
  }, []);
  const fetchDataFromApis = async () => {
    try {
      const doctorApi = await axios.get('https://patientmonitoring.my.id/api/doctors')
      // const doctorApi = await axios.get('http://localhost:8000/api/doctors');
      // const doctorApi = await axios.get(
      //   'https://4f23-113-11-180-109.ngrok-free.app/api/doctors',
      //   {
      //     headers: {
      //       'ngrok-skip-browser-warning': 'any',
      //     },
      //   }
      // );
      setDoctor(doctorApi.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Search Control
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const filtered_data = doctor.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
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
    const sort_birth_date = (
      a: { birth_date: string },
      b: { birth_date: string }
    ) => {
      const date1 = a.birth_date.split('/').reverse().join('');
      const date2 = b.birth_date.split('/').reverse().join('');
      return date1.localeCompare(date2);
    };
    if (searchValue == '') {
      if (option === 'name') {
        return doctor.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (option === 'gender') {
        return doctor.sort((a, b) => a.gender.localeCompare(b.gender));
      } else if (option === 'default') {
        return doctor.sort((a, b) => a.id - b.id); // Default sorting, do not change the order
      } else if (option === 'specialization') {
        return doctor.sort((a, b) =>
          a.specialization.localeCompare(b.specialization)
        );
      } else if (option === 'birth') {
        doctor.sort(sort_birth_date);
      } else {
        return doctor;
      }
    } else {
      if (option === 'name') {
        return searchResults.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (option === 'gender') {
        return searchResults.sort((a, b) => a.gender.localeCompare(b.gender));
      } else if (option === 'default') {
        return searchResults.sort((a, b) => a.id - b.id); // Default sorting, do not change the order
      } else if (option === 'specialization') {
        return searchResults.sort((a, b) =>
          a.specialization.localeCompare(b.specialization)
        );
      } else if (option === 'birth') {
        searchResults.sort(sort_birth_date);
      } else {
        return searchResults;
      }
    }
  };
  const sortedData = sortData(sortingChoice);

  return (
    <BaseLayout>
      {/* Title */}
      <div className={`${styles.title} font-inter`}>Master Data Doctor</div>
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
                <p>Search Doctor Name</p>
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
              <option value='default'></option>
              <option value='name'>Doctor Name</option>
              <option value='specialization'>Specialization</option>
              <option value='gender'>Gender</option>
              <option value='birth'>Birth Date</option>
            </select>
          </div>
        </div>

        {/* table */}
        <div className='m-6 flex items-center justify-center'>
          <table className='w-full text-center text-gray-500'>
            <thead className=' bg-[#EAEAEA] text-xs text-gray-700'>
              <tr>
                <th scope='col' className=' py-3'>
                  No.
                </th>
                <th scope='col' className=' py-3'>
                  Doctor Name
                </th>
                <th scope='col' className='py-3'>
                  Gender
                </th>
                <th scope='col' className=' py-3'>
                  Birth
                </th>
                <th scope='col' className=' py-3'>
                  Address
                </th>
                <th scope='col' className=' py-3'>
                  Contact
                </th>
                <th scope='col' className=' py-3'>
                  Specialization
                </th>
              </tr>
            </thead>
            <tbody className='text-xs'>
              {(searchValue == '' ? doctor : searchResults).map(
                (item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 != 0 ? 'bg-[#EAEAEA]' : ''}`}
                  >
                    <td className='py-4 px-4'>{index + 1}</td>
                    <td className='w-[400px] px-1 py-4'>{item.name}</td>
                    <td className='px-3 py-4'>{item.gender}</td>
                    <td className='px-1 py-4'>{item.birth_date}</td>
                    <td className='w-[200px] px-1 py-4'>{item.address}</td>
                    <td className='w-[200px] px-1 py-4'>{item.contact}</td>
                    <td className='w-[400px] px-1 py-4'>
                      {item.specialization}
                    </td>
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

export default Doctor;
