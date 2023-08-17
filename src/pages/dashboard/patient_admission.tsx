import BaseLayout from '@/pages/dashboard/baselayout'
import styles from './MainContent.module.css';

export default function patient_admission() {
  return (
    <BaseLayout>
      <div className={`${styles.title}`}>Patient Admission</div>
      {/* <div className={`${styles.content} ${'container'}`}> */}

      <div className={`${styles['input-patient']} ${''}`}>
        <div className='flex flex-col items-center justify-center'>
          {/* Form */}
          <form>
            {/* Subtitle */}
            <div className={`${styles['subtitle']}  ${'mb-6'}`}>
              New Patient Data
            </div>

            {/* === New Patient Data Form === */}
            <div className='flex justify-center gap-[60px]'>
              {/* Left */}
              <div>
                {/* name */}
                <div className='row mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='name'
                      className={`${''} ${'mb-2 font-medium text-gray-900 '}`}
                    >
                      Name
                    </label>
                  </div>
                  <div className=''>
                    <input
                      name='name'
                      type='text'
                      id='name'
                      className={`${
                        styles['form-input']
                      } ${'rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                      placeholder='Input Patien Name'
                      required
                    />
                  </div>
                </div>

                {/* ID Card Number */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='idcard'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      ID Card Number
                    </label>
                  </div>
                  <input
                    name='idcard'
                    type='number'
                    id='idcard'
                    className={`${
                      styles['form-input']
                    } ${'rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                    placeholder='Input ID Card Number'
                    required
                  />
                </div>

                {/* Gender */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='gender'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Gender
                    </label>
                  </div>
                  <div className=''>
                    <select
                      id='gender'
                      className='block w-full rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                    >
                      <option defaultValue='G'>Gender</option>
                      <option defaultValue='M'>Male</option>
                      <option defaultValue='F'>Female</option>
                    </select>
                  </div>
                </div>

                {/* Birth Date */}
                <div className='row mb-4 flex items-center justify-start'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='birth-date'
                      className={`${''} ${' mb-2 font-medium text-gray-900 '}`}
                    >
                      Birth Date
                    </label>
                  </div>
                  <div className='col'>
                    <input
                      type='date'
                      name='date'
                      id='birth-date'
                      // type={type}
                      // onFocus={() => setType('date')}
                      // onBlur={() => setType('text')}
                      // onChange={(e) => onChangeDate(e)}
                      className={`${
                        styles['']
                      } ${'rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                      required
                    />
                    {/* <input
                      datepicker
                      datepicker-format='mm/dd/yyyy'
                      type='text'
                      className='block w-full rounded border border-gray-300 bg-gray-50 pl-10 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-400 dark:focus:ring-gray-400'
                      placeholder='Select date'
                    ></input> */}
                  </div>
                </div>

                {/* Address */}
                <div className='mb-4 flex'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='address'
                      className={`${''} ${'mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Address
                    </label>
                  </div>

                  <div className=''>
                    <textarea
                      id='address'
                      name='address'
                      rows={1}
                      className={`${
                        styles['text-area']
                      } ${'rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                      placeholder='Input Patient Address'
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='contact'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Contact
                    </label>
                  </div>
                  <input
                    name='contact'
                    type='number'
                    id='contact'
                    className={`${
                      styles['form-input']
                    } ${'rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                    placeholder='Input Patient Contact'
                    required
                  />
                </div>

                {/* Education */}
                <div className='row mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='education'
                      className={`${''} ${'mb-2 font-medium text-gray-900 '}`}
                    >
                      Education
                    </label>
                  </div>
                  <div className=''>
                    <input
                      name='education'
                      type='text'
                      id='education'
                      className={`${
                        styles['form-input']
                      } ${'rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                      placeholder='Input Patient Education'
                      required
                    />
                  </div>
                </div>

                {/* Occupation */}
                <div className='row mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='occupation'
                      className={`${''} ${'mb-2 font-medium text-gray-900 '}`}
                    >
                      Occupation
                    </label>
                  </div>
                  <div className=''>
                    <input
                      name='occupation'
                      type='text'
                      id='occupation'
                      className={`${
                        styles['form-input']
                      } ${'rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                      placeholder='Input Patient Occupation'
                      required
                    />
                  </div>
                </div>

                {/* Faith (Religion) */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='faith'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Faith (Religion)
                    </label>
                  </div>
                  <div>
                    <select
                      id='faith'
                      className='rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                    >
                      <option defaultValue='Faith/Relgion'>
                        Faith/Religion
                      </option>
                      <option defaultValue='isla'>Islam</option>
                      <option defaultValue='christianity'>Christianity</option>
                      <option defaultValue='catholicism'>Catholicism</option>
                      <option defaultValue='hinduism'>Hinduism</option>
                      <option defaultValue='buddhism'>Buddhism</option>
                      <option defaultValue='confucianism'>Confucianism</option>
                    </select>
                  </div>
                </div>

                {/* Marital Status */}
                <div className='flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='marital'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Marital Status
                    </label>
                  </div>
                  <div>
                    <select
                      id='marital'
                      className='rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                    >
                      <option defaultValue='blood'>Marital Status</option>
                      <option defaultValue='unmarried'>Unmarried</option>
                      <option defaultValue='married'>Married</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                {/* Height */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='Height'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Height
                    </label>
                  </div>
                  <input
                    name='Height'
                    type='number'
                    id='Height'
                    className={`${'mr-3 w-[90px] rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                    placeholder='Height'
                    required
                  />
                  <p>cm</p>
                </div>

                {/* Weight */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='Weight'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Weight
                    </label>
                  </div>
                  <input
                    name='Weight'
                    type='number'
                    id='Weight'
                    className={`${'mr-3 w-[90px] rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                    placeholder='Weight'
                    required
                  />
                  <p>kg</p>
                </div>

                {/* Blood Type */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='blood'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Blood Type
                    </label>
                  </div>
                  <div>
                    <select
                      id='blood'
                      className='rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                    >
                      <option defaultValue='blood'>Select Blood Type</option>
                      <option defaultValue='A'>A</option>
                      <option defaultValue='B'>B</option>
                      <option defaultValue='AB'>AB</option>
                      <option defaultValue='O'>O</option>
                    </select>
                  </div>
                </div>

                {/* Covid Case */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='covid-case'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Covid Case
                    </label>
                  </div>
                  <div>
                    <select
                      id='covid-case'
                      className='rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                    >
                      <option defaultValue='covid-case'>Covid Case</option>
                      <option defaultValue='M'>Mild</option>
                      <option defaultValue='F'>Serve</option>
                    </select>
                  </div>
                </div>

                {/* Type/Result*/}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='typeresult'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Type/Result
                    </label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div>
                      <select
                        id='type'
                        className='rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                      >
                        <option defaultValue='test-type'>
                          Choose Test Type
                        </option>
                        <option defaultValue='antigen'>Swab Antigen</option>
                        <option defaultValue='pcr'>Swab PCR</option>
                      </select>
                    </div>
                    <p>/</p>
                    <div>
                      <select
                        id='result'
                        className='rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                      >
                        <option defaultValue='test-result'>
                          Choose Test Result
                        </option>
                        <option defaultValue='n'>Negative</option>
                        <option defaultValue='p'>Positive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Referred Form */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='referredform'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Referred Form
                    </label>
                  </div>
                  <input
                    type='text'
                    name='referredform'
                    id='referredform'
                    className={`${'w-[413px] rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                    placeholder='Input Clinic Name'
                    required
                  />
                </div>

                {/* notes */}
                <div className='mb-4 flex'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='notes'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Patient Notes
                    </label>
                  </div>
                  <textarea
                    id='notes'
                    name='notes'
                    rows={4}
                    className={`${'w-[413px] rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                    placeholder='Patient Notes'
                  />
                </div>

                {/* Ward/Room*/}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='wardroom'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Ward/Room
                    </label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div>
                      <select
                        id='ward'
                        className='rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                      >
                        <option defaultValue='ward'>Select Ward</option>
                        <option defaultValue='antigen'>Covid</option>
                        <option defaultValue='pcr'>Non-Covid</option>
                      </select>
                    </div>
                    <p>/</p>
                    <div>
                      <select
                        id='room'
                        className='rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                      >
                        <option defaultValue='room'>Select Room</option>
                        <option defaultValue='r'>Regular</option>
                        <option defaultValue='v'>VIP</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Upload Photo */}
                <div className='row flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='photo'
                      className={`${''} ${'mb-2 font-medium text-gray-900 '}`}
                    >
                      Upload Photo
                    </label>
                  </div>
                  <div className=''>
                    <input
                      className='block cursor-pointer rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none'
                      id='photo'
                      type='file'
                      name='photo'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* LINE */}
            <div className='mt-8 h-[1px] w-auto bg-[#ABABAB]'></div>

            {/* Subtitle */}
            <div className={`${styles['subtitle']}  ${'mb-6'}`}>
              Next of Kin Detail
            </div>

            {/* === Next of Kin Detail Form === */}
            <div className='flex gap-[60px]'>
              {/* Left-Bottom */}
              <div>
                {/* Full name Kin detail */}
                <div className='row mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='full-name'
                      className={`${''} ${'mb-2 font-medium text-gray-900 '}`}
                    >
                      Full Name
                    </label>
                  </div>
                  <div className=''>
                    <input
                      name='full-name'
                      type='text'
                      id='full-name'
                      className={`${
                        styles['form-input']
                      } ${'rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                      placeholder='Input Full Name'
                      required
                    />
                  </div>
                </div>

                {/* Relationship */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='relationship'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Relationship
                    </label>
                  </div>
                  <div className=''>
                    <select
                      id='relationship'
                      className='block w-full rounded border border-gray-300 bg-gray-50 text-base text-gray-500 focus:border-gray-400 focus:ring-gray-400'
                    >
                      <option defaultValue='relationship'>Relationship</option>
                      <option defaultValue='father'>Father</option>
                      <option defaultValue='Mother'>Mother</option>
                      <option defaultValue='simblings'>Simblings</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right-Bottom */}
              <div>
                {/* Address Kin Detail */}
                <div className='mb-4 flex'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='address-kin'
                      className={`${''} ${'mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Address
                    </label>
                  </div>

                  <div className=''>
                    <textarea
                      id='address-kin'
                      name='address-kin'
                      rows={1}
                      className={`${'w-[413px] rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                      placeholder='Input Patient Address'
                    />
                  </div>
                </div>

                {/* Contact Kin Detail */}
                <div className='mb-4 flex items-center'>
                  <div className='w-36 flex-initial'>
                    <label
                      htmlFor='contact-kin'
                      className={`${''} ${' mb-2text-sm  font-medium text-gray-900 '}`}
                    >
                      Contact
                    </label>
                  </div>
                  <input
                    name='contact-kin'
                    type='number'
                    id='contact-kin'
                    className={`${'w-[413px] rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400'}`}
                    placeholder='Input Patient Contact'
                    required
                  />
                </div>
              </div>
            </div>

            {/* BTN */}
            <div className='flex justify-end pb-5'>
              <button
                type='submit'
                className={`${
                  styles['btn-size']
                } ${'mr-5 rounded bg-btn-primary text-center text-base font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-gray-400'}`}
              >
                Save
              </button>
              <button
                className={`${
                  styles['btn-size']
                } ${'rounded bg-btn-secondary text-center text-base font-medium text-black focus:outline-none focus:ring-4 focus:ring-gray-300 hover:bg-gray-400'}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </BaseLayout>
  );
}
