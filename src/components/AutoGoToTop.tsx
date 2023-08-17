import React, { useEffect, useState } from 'react'

// type Props = {}

function AutoGoToTop() {
  //BTN AUTO BACK TO TOP
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleBtnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className='fixed right-5 bottom-5'>
      <button
        className={`${
          showButton
            ? 'flex rounded-full bg-btn-primary p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-500'
            : 'hidden'
        }`}
        onClick={handleBtnToTop}
      >
        <i className={`${'material-icons'}`}>keyboard_arrow_up</i>
      </button>
    </div>
  );
}

export default AutoGoToTop