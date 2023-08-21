import React, { useEffect, useRef, useState } from 'react';
import styles from '../MainContent.module.css';
import AutoGoToTop from '@/components/AutoGoToTop';
import BaseLayout from '@/pages/dashboard/baselayout';
import axios from 'axios';
import RomanNumerals from '@/components/dummyData/roman_numerals';

function Ward_master() {
  // FETCH DATA ward
  const [wards, setWards] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  //Fetching Data From API
  useEffect(() => {
    fetchDataFromApis();
  }, []);
  const fetchDataFromApis = async () => {
    try {
      const wardApi = await axios.get('https://patientmonitoring.my.id/api/wards');
      // const wardApi = await axios.get('http://localhost:8000/api/wards');
      // const wardApi = await axios.get(
      //   'https://4f23-113-11-180-109.ngrok-free.app/api/wards',
      //   {
      //     headers: {
      //       'ngrok-skip-browser-warning': 'any',
      //     },
      //   }
      // );
      setWards(wardApi.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Search Control
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const filtered_data = wards.filter((item) =>
      item.ward_name.toLowerCase().includes(event.target.value.toLowerCase())
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
    if (searchValue == '') {
      if (option === 'name') {
        return wards.sort((a, b) => a.ward_name.localeCompare(b.ward_name));
      } else if (option === 'class') {
        return wards.sort((a, b) => a.class - b.class); // Default sorting, do not change the order
      } else if (option === 'default') {
        return wards.sort((a, b) => a.id - b.id); // Default sorting, do not change the order
      } else {
        return wards;
      }
    } else {
      if (option === 'name') {
        return searchResults.sort((a, b) =>
          a.ward_name.localeCompare(b.ward_name)
        );
      } else if (option === 'class') {
        return searchResults.sort((a, b) => a.class - b.class); // Default sorting, do not change the order
      } else if (option === 'default') {
        return searchResults.sort((a, b) => a.id - b.id); // Default sorting, do not change the order
      } else {
        return searchResults;
      }
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
      {/* Title */}
      <div className={`${styles.title} font-inter`}>Master Data Ward</div>
      {/* TABLE FRAME */}
      <div className={styles['table-master-bg']}>
        <div className='mx-6 flex items-center justify-between pt-6 '>
          {/* SEARCH ward NAME */}
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
                <p>Search Ward Name</p>
              </div>
            </div>
          </div>

          {/* SORT ward DATA */}
          <div className='flex items-center gap-3'>
            <p>Sort by</p>
            <select
              className='h-8 w-[150px] rounded border-[#ECECEC] bg-[#ECECEC] text-xs'
              onChange={handleSorting}
              value={sortingChoice}
            >
              <option value='default'></option>
              <option value='name'>Ward Name</option>
              <option value='class'>Class</option>
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
                  Ward Name
                </th>
                <th scope='col' className='py-3'>
                  Class
                </th>
                <th scope='col' className='py-3'>
                  Description
                </th>
                <th scope='col' className='py-3'>
                  Facilities
                </th>
                <th scope='col' className='py-3'>
                  Rates
                </th>
              </tr>
            </thead>
            <tbody className='text-xs'>
              {(searchValue == '' ? wards : searchResults).map(
                (item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 != 0 ? 'bg-[#EAEAEA]' : ''}`}
                  >
                    <td className='py-4 px-4'>{index + 1}</td>
                    <td className='px-1 py-4'>{item.ward_name}</td>
                    <td className='py-4 px-4'>{convertToRoman(item.class)}</td>
                    <td className='w-[500px] px-3 py-4'>{item.desc}</td>
                    <td className='px-3 py-4'>{item.facilities}</td>
                    <td className='px-1 py-4'>Rp. {item.rates}</td>
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

export default Ward_master;