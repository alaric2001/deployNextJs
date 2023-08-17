
import { useRouter } from 'next/router';
import styles from '../../MainContent.module.css'
import Side_bar from '@/pages/dashboard/side_bar';
import Nav_bar from '@/pages/dashboard/nav_bar';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import axios, {AxiosResponse} from 'axios';
import Chart from 'chart.js/auto';
// import hr_chart from '@/components/chart/hr_chart';
// import rr_chart from '@/components/chart/rr_chart';
// import spo2_chart from '@/components/chart/spo2_chart';
// import temp_chart from '@/components/chart/temp_chart';
// import nibp_chart from '@/components/chart/nibp_chart';

interface ApiResponse {
  id: any;
  patient_name: any;
  address: any;
  admission_date: any;
  discharge_date: any;
  birth: any;
  contact: any;
  education: any;
  gender: any;
  hr: any;
  id_card: any;
  nibp: any[];
  occupation: any;
  photo: any;
  referred: any;
  room: any;
  rr: any[];
  spo2: any[];
  temp: any[];
  examination: any[];
  updated_at: any;
  created_at: any;
}

function VitalSign() {
  const router = useRouter();
  const { vital_sign } = router.query;

  const [allLast20Data, setAllLast20Data] = useState<ApiResponse | null>(null);
  const [createdAtHR, setCreatedAtHR] = useState<any>();
  const [createdAtRR, setCreatedAtRR] = useState<any>();
  const [createdAtSPO2, setCreatedAtSPO2] = useState<any>();
  const [createdAtTemp, setCreatedAtTemp] = useState<any>();
  const [createdAtNIBP, setCreatedAtNIBP] = useState<any>();

  useEffect(() => {
    if (vital_sign) {
      axios
        .get<ApiResponse>(`http://localhost:8000/api/patient-ttv/${vital_sign}`)
        .then((response: AxiosResponse<ApiResponse>) => {
          setAllLast20Data(response.data);

          // -------------- hr time ----------------- //
          const hrArray = response.data.hr;
          // Extract 'created_at' property from each object in the 'HR' array
          const apiCreatedAtHRList = hrArray.map(
            (item: any) => item.created_at
          );
          // Format the date using the formatApiDate function for each 'created_at'
          const formattedDateListHR = apiCreatedAtHRList
            .sort((a:any, b:any) => new Date(a).getTime() - new Date(b).getTime())
            .map((apiCreatedAt: string) => formatApiDate(apiCreatedAt));
          setCreatedAtHR(formattedDateListHR);

          // -------------- rr time ----------------- //
          const rrArray = response.data.rr;
          const apiCreatedAtRRList = rrArray.map(
            (item: any) => item.created_at
          );
          const formattedDateListRR = apiCreatedAtRRList
            .sort((a:any, b:any) => new Date(a).getTime() - new Date(b).getTime())
            .map((apiCreatedAt: string) => formatApiDate(apiCreatedAt)
            );
          setCreatedAtRR(formattedDateListRR);

          // -------------- SpO2 time ----------------- //
          const spo2Array = response.data.spo2;
          const apiCreatedAtSPO2List = spo2Array.map(
            (item: any) => item.created_at
          );
          const formattedDateListSPO2 = apiCreatedAtSPO2List
            .sort(
              (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
            )
            .map((apiCreatedAt: string) => formatApiDate(apiCreatedAt));
          setCreatedAtSPO2(formattedDateListSPO2);

          // -------------- temp time ----------------- //
          const tempArray = response.data.temp;
          const apiCreatedAtTempList = tempArray.map(
            (item: any) => item.created_at
          );
          const formattedDateListTemp = apiCreatedAtTempList
            .sort(
              (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
            )
            .map((apiCreatedAt: string) => formatApiDate(apiCreatedAt));
          setCreatedAtTemp(formattedDateListTemp);

          // -------------- nibp time ----------------- //
          const nibpArray = response.data.nibp;
          const apiCreatedAtNIBPList = nibpArray.map(
            (item: any) => item.created_at
          );
          const formattedDateListNIBP = apiCreatedAtNIBPList
            .sort(
              (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
            )
            .map((apiCreatedAt: string) => formatApiDate(apiCreatedAt));
          setCreatedAtNIBP(formattedDateListNIBP);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [vital_sign]);

  const formatApiDate = (apiDate: string): string => {
    try {
      // Remove milliseconds and time zone from the date string
      const formattedDate = apiDate.replace(/\.\d+Z$/, '');

      // Create a new Date object from the formatted date string
      const dateObject = new Date(formattedDate);

      // Format the time portion of the date using toLocaleString
      return dateObject.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date'; // Return a default value for invalid dates
    }
  };
  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  // const hrbyid = (id: any) => {
  //   const filteringhr = hr.filter((item) => item.patient_id == id);
  //   if (filteringhr.length == 0) {
  //     return '-';
  //   }
  //   return filteringhr.map((items, i) => <p key={i}>HR: {items.heart_beats}</p>);
  // };

  const hr_value = allLast20Data?.hr
    .sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .map(
      (items: any, i: number) =>
        // <p key={i}>
        items.heart_beats
      // </p>
    );

  const rr_value =
    allLast20Data?.rr.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).map((items: any, i: number) => items.breaths) ?? '';
  const temp_value =
    allLast20Data?.temp
      .sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .map((items: any, i: number) => items.patient_temp) ?? '';

  const spo2_value =
    allLast20Data?.spo2
      .sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .map((items: any, i: number) => items.blood_oxygen) ?? '';

  const nibp_value = allLast20Data?.nibp.map(
    (items: any, i: number) => items.systolic / items.diastolic
  );

  // PATIENT Examination
  const examinationArray = allLast20Data?.examination ?? [];
  const patient_weight =
    examinationArray?.length > 0
      ? examinationArray[examinationArray.length - 1].weight
      : null;

  const patient_notes =
    examinationArray?.length > 0
      ? examinationArray[examinationArray.length - 1].notes
      : null;

  const patient_covid_case =
    examinationArray?.length > 0
      ? examinationArray[examinationArray.length - 1].covid_case
      : null;
  const covidCase = patient_covid_case?.covid_case;
  const covidStatus = covidCase == 1 ? 'Positive' : 'Negative';
  // console.log(covidStatus);

  function Hr_chart() {
    useEffect(() => {
      const ctx = document.getElementById('hr_chart') as HTMLCanvasElement;
      const chartConfig = {
        type: 'line',
        data: {
          labels: createdAtHR,
          datasets: [
            {
              label: 'Heart Rate',
              data: hr_value,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const hr_chart = new (Chart as any)(ctx, chartConfig);

      return () => {
        hr_chart.destroy();
      };
    });
  }

  function Rr_chart() {
    useEffect(() => {
      const ctx = document.getElementById('rr_chart') as HTMLCanvasElement;
      const chartConfig = {
        type: 'line',
        data: {
          labels: createdAtRR,
          datasets: [
            {
              label: 'Respiration Rate',
              data: rr_value,
              borderColor: 'rgba(255, 184, 0, 1)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const rr_chart = new (Chart as any)(ctx, chartConfig);

      return () => {
        rr_chart.destroy();
      };
    });
  }

  function Spo2_chart() {
    useEffect(() => {
      const ctx = document.getElementById('spo2_chart') as HTMLCanvasElement;
      const chartConfig = {
        type: 'line',
        data: {
          labels: createdAtSPO2,
          datasets: [
            {
              label: 'SpO2',
              data: spo2_value,
              borderColor: 'rgba(255, 184, 0, 1)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const spo2_chart = new (Chart as any)(ctx, chartConfig);

      return () => {
        spo2_chart.destroy();
      };
    });
  }

  function Temp_chart() {
    useEffect(() => {
      const ctx = document.getElementById('temp_chart') as HTMLCanvasElement;
      const chartConfig = {
        type: 'line',
        data: {
          labels: createdAtTemp,
          datasets: [
            {
              label: 'Body Temp',
              data: temp_value,
              borderColor: 'rgba(0, 102, 255, 1)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const temp_chart = new (Chart as any)(ctx, chartConfig);

      return () => {
        temp_chart.destroy();
      };
    });
  }

  function Nibp_chart() {
    useEffect(() => {
      const ctx = document.getElementById('nibp_chart') as HTMLCanvasElement;
      if (!ctx) return;

      const chartConfig = {
        type: 'line',
        data: {
          labels: createdAtNIBP,
          datasets: [
            {
              label: 'Systolic',
              data: [],
              borderColor: 'rgba(255, 110, 47, 1)',
              tension: 0.1,
            },
            {
              label: 'Disatolic',
              data: [],
              borderColor: 'rgba(33, 33, 33, 1)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              align: 'start',
              labels: {
                boxWidth: 12,
              },
            },
            title: {
              display: true,
              text: 'NIBP',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const rr_chart = new (Chart as any)(ctx, chartConfig);

      return () => {
        rr_chart.destroy();
      };
    });
  }

  // == Calling chart function == //
  Hr_chart();
  Rr_chart();
  Spo2_chart();
  Temp_chart();
  Nibp_chart();

  // console.log(patient_weight);

  // AUTO RELOAD PAGE
  const reloadInterval = 5000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();
    }, reloadInterval);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // FETCH DATA PATIENT
  // const [data, setData] = useState<any[]>([]);
  // const [hr, setHr] = useState<any[]>([]);
  // const [rr, setRr] = useState<any[]>([]);
  // const [spo2, setSpo2] = useState<any[]>([]);
  // const [temp, setTemp] = useState<any[]>([]);
  // const [nibp, setNibp] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  // const [fetchStatus, setFetchStatus] = useState(true);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/patients/'); // Replace with your API URL
  //     const last20rrApi = await axios.get('http://localhost:8000/api/last20rr');
  //     const last20hrApi = await axios.get('http://localhost:8000/api/last20hr');
  //     const last20spo2Api = await axios.get('http://localhost:8000/api/last20spo2');
  //     const last20tempApi = await axios.get('http://localhost:8000/api/last20temp');
  //     const last20nibpApi = await axios.get('http://localhost:8000/api/last20nibp');

  //     const last20DataApi = await axios.get(
  //       `http://localhost:8000/api/patient-ttv/${vital_sign}`
  //     );
  //     setAllLast20Data(last20DataApi.data);

  //     setData(response.data); // Assuming your API returns an array of data
  //     setRr(last20rrApi.data);
  //     setHr(last20hrApi.data);
  //     setSpo2(last20spo2Api.data);
  //     setTemp(last20tempApi.data);
  //     setNibp(last20nibpApi.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setError('Error fetching data from API.');
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Nav_bar />
      <div className={styles.layout}>
        <Side_bar />
        <div className={styles.children}>
          {/* <div className={`${styles.content} ${'container'}`}> */}
          <div className={`${styles.title}`}>Patient Data</div>
          {/* = = = frame biodata = = =*/}
          <div className={styles['bio-frame']}>
            {/* Sisi kiri*/}
            <div className='flex items-center gap-4'>
              {/* Foto profil dkk*/}
              <div className={styles['image-rounded']}>
                <img src='/images/nextjs.png' alt='Your Image' />
              </div>
              {/* nama pasien dkk */}
              <div className='flex flex-col gap-1'>
                <p className='max-w-[240px] font-poppins text-4xl font-bold not-italic'>
                  {allLast20Data?.patient_name}
                </p>
                <div className=''>
                  <span className='mr-[56px] font-poppins text-lg font-normal not-italic text-[#919191]'>
                    MRN: {vital_sign}
                  </span>
                  <span className='font-poppins text-lg font-normal not-italic text-[#919191]'>
                    Room: {allLast20Data?.room}
                  </span>
                </div>

                {/* <div className='grid w-[246px] grid-cols-2 grid-rows-2 gap-1'>
                  <div className='flex h-[30px] w-[120px] items-center justify-center rounded bg-[#00A3FF]'>
                    <p className='font-poppins text-xs font-medium not-italic text-white'>
                      Patient Detail
                    </p>
                  </div>
                  <div className='flex h-[30px] w-[120px] items-center justify-center rounded bg-[#00CB20]'>
                    <p className='font-poppins text-xs font-medium not-italic text-white'>
                      Medical Rec
                    </p>
                  </div>
                  <div className='flex h-[30px] w-[120px] items-center justify-center rounded bg-[#FFAF50]'>
                    <p className='font-poppins text-xs font-medium not-italic text-white'>
                      EWS & IoT Device
                    </p>
                  </div>
                  <div className='flex h-[30px] w-[120px] items-center justify-center rounded bg-[#FF3E3E]'>
                    <p className='font-poppins text-xs font-medium not-italic text-white'>
                      Patient Discharge
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* sisi kanan */}
            <div className='flex items-center gap-8 font-poppins text-sm font-normal not-italic text-black'>
              {/* gender dkk */}
              <div className='flex flex-col gap-4'>
                <div className='flex'>
                  <div className='w-[100px] flex-initial'>Gender</div>
                  <p>: {allLast20Data?.gender}</p>
                </div>
                <div className='flex '>
                  <div className='w-[100px] flex-initial'>Date of Birth</div>
                  <p>: {allLast20Data?.birth}</p>
                </div>
                <div className='flex '>
                  <div className='w-[100px] flex-initial'>Case</div>
                  <p>: {covidStatus ? covidStatus : '-'}</p>
                </div>
              </div>

              {/* Admission date dkk */}
              <div className='flex flex-col gap-4'>
                <div className='flex gap-1'>
                  <div className='w-32 flex-initial'>Admission Date</div>
                  <p>: {allLast20Data?.admission_date}</p>
                </div>
                <div className='flex gap-1'>
                  <div className='w-32 flex-initial'>Patient Weight</div>
                  <p>: {patient_weight ? patient_weight : '-'} Kg</p>
                </div>
                <div className='flex items-center gap-1'>
                  <div className='w-32 flex-initial'>Patient Notes</div>
                  <p>:</p>
                  <p className='max-w-[350px] text-justify'>{patient_notes}</p>
                </div>
              </div>
            </div>
          </div>

          {/* = = = Tengah = = = */}
          <div className='mx-auto flex h-[46px] w-[1172px] items-center justify-center gap-[100px] border border-solid border-[#D7D7D7] bg-white text-black'>
            <Link
              href={`/dashboard/patient/vital_sign/${vital_sign}`}
              className='text-btn-primary'
            >
              TTV Monitoring
            </Link>
            <Link
              href={`/dashboard/patient/medical_prescription/${vital_sign}`}
            >
              Medical Prescription
            </Link>
            <Link href={`/dashboard/patient/order_lab/${vital_sign}`}>
              Order Lab
            </Link>
            <Link href={`/dashboard/patient/order_radiology/${vital_sign}`}>
              Order Radiology
            </Link>
            <Link href={`/dashboard/patient/ippn/${vital_sign}`}>
              Integrated patient progress notes
            </Link>
          </div>

          {/* = = = Bagian bawah = = = */}
          <div className={styles['grafik-detail-frame']}>
            {/* kiri */}
            <div className='flex w-[600px] flex-col gap-2'>
              <div className='h-[245px] rounded-xl border border-solid border-[#D7D7D7] bg-white'>
                <canvas id='hr_chart'></canvas>
              </div>
              <div className='h-[245px] rounded-xl border border-solid border-[#D7D7D7] bg-white'>
                <canvas id='rr_chart'></canvas>
              </div>
              <div className='h-[245px] rounded-xl border border-solid border-[#D7D7D7] bg-white'>
                <canvas id='spo2_chart'></canvas>
              </div>
            </div>
            {/* tengah */}
            <div className='flex w-[390px] flex-col gap-2'>
              <div className='h-[245px] rounded-xl border border-solid border-[#D7D7D7] bg-white'>
                <canvas id='temp_chart'></canvas>
              </div>
              <div className='h-[245px] rounded-xl border border-solid border-[#D7D7D7] bg-white'>
                <canvas id='nibp_chart'></canvas>
              </div>
            </div>
            {/* kanan */}
            {/* <div className='flex h-[500px] w-[350px] items-center justify-center border border-solid border-[#D7D7D7] bg-white gap-1 text-xs'>
              <div className='flex flex-col'>{spo2_value}</div>
              <div className='flex flex-col'>{nibp_value}</div>
              <div className='flex flex-col'>{rr_value}</div>
              <div className='flex flex-col'>{hr_value}</div>
              <div className='flex flex-col'>{temp_value}C</div>
            </div> */}
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default VitalSign;