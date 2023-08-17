import React, { useEffect, useRef, useState } from 'react';
import styles from '../MainContent.module.css';
import AutoGoToTop from '@/components/AutoGoToTop';
import BaseLayout from '@/pages/dashboard/baselayout';
import axios from 'axios';

function Radiology() {
  // FETCH DATA radiologie
  const [radiologies, setRadiologies] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  //Fetching Data From API
  useEffect(() => {
    fetchDataFromApis();
  }, []);
  const fetchDataFromApis = async () => {
    try {
      const radiologiesApi = await axios.get('http://localhost:8000/api/radiologies');
      setRadiologies(radiologiesApi.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Search Control
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const filtered_data = radiologies.filter((item) =>
      item.radiology_exam.toLowerCase().includes(event.target.value.toLowerCase())
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
        return radiologies.sort((a, b) =>
          a.radiology_exam.localeCompare(b.radiology_exam)
        );
      } else if (option === 'indate') {
        radiologies.sort(sort_admission_date);
      } else if (option === 'outdate') {
        radiologies.sort(discharge_date_sort);
      } else if (option === 'room') {
        return radiologies.sort((a, b) => a.room.localeCompare(b.room));
      } else if (option === 'mrn') {
        return radiologies.sort((a, b) => a.id - b.id); // Default sorting, do not change the order
      } else {
        return radiologies;
      }
    } else {
      if (option === 'name') {
        return searchResults.sort((a, b) =>
          a.radiology_exam.localeCompare(b.radiology_exam)
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
      <div className={`${styles.title}`}>Master Data Radiologies</div>
      {/* TABLE FRAME */}
      <div className={styles['table-master-bg']}>
        <div className='mx-6 flex items-center justify-between pt-6 '>
          {/* SEARCH radiologie NAME */}
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
                <p>Search Radiologies Name</p>
              </div>
            </div>
          </div>

          {/* SORT radiologie DATA */}
          {/* <div className='flex items-center gap-3'>
            <p>Sort by</p>
            <select
              className='h-8 w-[150px] rounded border-[#ECECEC] bg-[#ECECEC] text-xs'
              onChange={handleSorting}
              value={sortingChoice}
            >
              <option value='mrn'></option>
              <option value='name'>radiologie Name</option>
              <option value='indate'>Admission Date</option>
              <option value='outdate'>Dischard Date</option>
              <option value='room'>Room</option>
            </select>
          </div> */}
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
                  Date
                </th>
                <th scope='col' className='py-3'>
                  Radiology Exam
                </th>
                <th scope='col' className='py-3'>
                  Doctor in Charge
                </th>
                <th scope='col' className='py-3'>
                  Approved Date
                </th>
                <th scope='col' className='py-3'>
                  Processed
                </th>
                <th scope='col' className=' py-3'>
                  Result
                </th>
              </tr>
            </thead>
            <tbody className='text-xs'>
              {(searchValue == '' ? radiologies : searchResults).map(
                (item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 != 0 ? 'bg-[#EAEAEA]' : ''}`}
                  >
                    <td className='py-4 px-4'>{index + 1}</td>
                    <td className='px-1 py-4'>{item.date}</td>
                    <td className='px-1 py-4'>{item.radiology_exam}</td>
                    <td className='py-4 px-4'>{item.doctor_id}</td>
                    <td className='px-3 py-4'>{item.approved_date}</td>
                    <td className='px-3 py-4'>{item.processed_date}</td>
                    <td className='px-3 py-4'>{item.result}</td>
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

export default Radiology;
