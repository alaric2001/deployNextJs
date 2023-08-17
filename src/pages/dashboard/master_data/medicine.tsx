import React, { useEffect, useRef, useState } from 'react';
import styles from '../MainContent.module.css';
import AutoGoToTop from '@/components/AutoGoToTop';
import BaseLayout from '@/pages/dashboard/baselayout';
import axios from 'axios';

function Medicine() {
  // FETCH DATA medicine
  const [medicines, setMedicines] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  //Fetching Data From API
  useEffect(() => {
    fetchDataFromApis();
  }, []);
  const fetchDataFromApis = async () => {
    try {
      const medicineApi = await axios.get('http://localhost:8000/api/medicines');
      setMedicines(medicineApi.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Search Control
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const filtered_data = medicines.filter((item) =>
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
    
    if (searchValue == '') {
      if (option === 'name') {
        return medicines.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (option === 'type') {
        return medicines.sort((a, b) => a.type.localeCompare(b.type));
      } else if (option === 'stock') {
        return medicines.sort((a, b) => a.stock - b.stock); // Default sorting, do not change the order
      } else if (option === 'default') {
        return medicines.sort((a, b) => a.id - b.id); // Default sorting, do not change the order
      } else {
        return medicines;
      }
    } else {
      if (option === 'name') {
        return searchResults.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (option === 'type') {
        return searchResults.sort((a, b) => a.type.localeCompare(b.type));
      } else if (option === 'stock') {
        return searchResults.sort((a, b) => a.stock - b.stock); // Default sorting, do not change the order
      } else if (option === 'default') {
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
      <div className={`${styles.title}`}>Master Data Medicine</div>
      {/* TABLE FRAME */}
      <div className={styles['table-master-bg']}>
        <div className='mx-6 flex items-center justify-between pt-6 '>
          {/* SEARCH medicine NAME */}
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
                <p>Search Medicine Name</p>
              </div>
            </div>
          </div>

          {/* SORT Medicine DATA */}
          <div className='flex items-center gap-3'>
            <p>Sort by</p>
            <select
              className='h-8 w-[150px] rounded border-[#ECECEC] bg-[#ECECEC] text-xs'
              onChange={handleSorting}
              value={sortingChoice}
            >
              <option value='default'></option>
              <option value='name'>Medicine Name</option>
              <option value='type'>Type</option>
              <option value='stock'>Stock</option>
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
                  Medicine Name
                </th>
                <th scope='col' className='py-3'>
                  Type
                </th>
                <th scope='col' className='py-3'>
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className='text-xs'>
              {(searchValue == '' ? medicines : searchResults).map(
                (item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 != 0 ? 'bg-[#EAEAEA]' : ''}`}
                  >
                    <td className='py-4 px-4'>{index + 1}</td>
                    <td className='px-1 py-4'>{item.name}</td>
                    <td className='py-4 px-4 w-[500px]'>{item.type}</td>
                    <td className='px-3 py-4'>{item.stock}</td>
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

export default Medicine;