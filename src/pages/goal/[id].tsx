/**
 * @author PT. ESD - Telkom University
 * @copyright © All rights reserved. Dashboard 2023
 */
export {};
// import { Dialog, Menu, Transition } from '@headlessui/react';
// import { useDatePicker } from '@rehookify/datepicker';
// import Tippy from '@tippyjs/react';
// import axios from 'axios';
// import { format } from 'date-fns';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { useEffect, useRef, useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { useTranslation } from 'react-i18next';
// import { BsCheck2 } from 'react-icons/bs';
// import { HiDotsHorizontal } from 'react-icons/hi';
// import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
// import { IoRepeat } from 'react-icons/io5';
// import { MdExpandMore, MdLink } from 'react-icons/md';
// import Moment from 'react-moment';

// import 'tippy.js/dist/tippy.css';

// import clsxm from '@/lib/clsxm';

// import { Calendar } from '@/components/Calendar';
// import Checkbox from '@/components/Checkbox';
// import DangerButton from '@/components/DangerButton';
// import CircleCloseIcon from '@/components/icons/Custom/CircleCloseIcon';
// import PinedIcon from '@/components/icons/Custom/PinedIcon';
// import PrivateIcon from '@/components/icons/Custom/PrivateIcon';
// import PublicIcon from '@/components/icons/Custom/PublicIcon';
// import PushPinIcon from '@/components/icons/Custom/PushPinIcon';
// import ReplyIcon from '@/components/icons/Custom/ReplyIcon';
// import AddUserIcon from '@/components/icons/iconly/AddUserIcon';
// import BoldCameraIcon from '@/components/icons/iconly/Bold/BoldCameraIcon';
// import BoldSendIcon from '@/components/icons/iconly/Bold/BoldSendIcon';
// import CalendarIcon from '@/components/icons/iconly/CalendarIcon';
// import DeleteIcon from '@/components/icons/iconly/DeleteIcon';
// import EditSquareIcon from '@/components/icons/iconly/EditSquareIcon';
// import PlusIcon from '@/components/icons/iconly/PlusIcon';
// import SquarePlusIcon from '@/components/icons/iconly/SquarePlusIcon';
// import TimeCircleIcon from '@/components/icons/iconly/TimeCircleIcon';
// import AddTaskIllustration from '@/components/illustrations/AddTask';
// import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
// import HeadTag from '@/components/layout/HeadTag';
// import Navbar from '@/components/Navbar';
// import PrimaryButton from '@/components/PrimaryButton';
// import ProgressBar from '@/components/ProgressBar';
// import SecondaryButton from '@/components/SecondaryButton';
// import SelectInput from '@/components/SelectInput';
// import Skeleton from '@/components/Skeleton';
// import TaskItem from '@/components/Task/TaskItem';
// import TextAreaInput from '@/components/TextAreaInput';
// import TextInput from '@/components/TextInput';
// import Toast from '@/components/Toast';

// /**
//  * SVGR Support
//  * Caveat: No React Props Type.
//  *
//  * You can override the next-env if the type is important to you
//  * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
//  */

// type UserProps = {
//   id?: string;
//   username?: string;
//   fullname?: string;
//   description?: string;
//   profile_picture?: string;
// };

// type TaskType = {
//   id?: string;
//   url?: string;
//   title?: string;
//   name?: string;
//   description?: string;
//   type?: string;
//   notes?: string;
//   is_pin?: boolean;
//   checked?: boolean;
//   repeat_type?: string;
//   repeat?: string;
//   deadline?: string;
// };

// type GoalMemberProps = {
//   id?: string;
//   name?: string;
//   role?: string;
//   user?: UserProps;
//   is_confirmed?: boolean;
// };

// type TaskMemberProps = {
//   id?: string;
//   task_id?: string;
//   goal_member: {
//     id?: string;
//     is_confirmed?: boolean;
//     role?: string;
//     is_owner?: boolean;
//     user: UserProps;
//   };
// };

// type CommentProps = {
//   id?: string;
//   replies_count: number;
//   content?: string;
//   user?: UserProps;
//   created_at?: string;
//   replies?: CommentProps[];
//   is_show_full_reply: boolean;
// };

// export default function Detail() {
//   const { t: translate } = useTranslation();
//   const router = useRouter();
//   const goalMemberLimit = 5;
//   const { id } = router.query;
//   const [isLoading, setIsLoading] = useState(true);
//   const [isTaskLoading, setIsTaskLoading] = useState(false);
//   const [isCommentLoading, setIsCommentLoading] = useState(false);
//   const [deadlineLoading, setDeadlineLoading] = useState(false);
//   const [loaded, setLoaded] = useState(false);
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
//   const [cookies, setCookie] = useCookies(['access_token', 'token_type']);
//   const [goal, setGoal] = useState({
//     name: '',
//     description: '',
//     is_pin: false,
//     is_public: false,
//     is_template: false,
//     image: null,
//     percentage: 0,
//     tasks_count: 0,
//     total_view: 0,
//     total_vote: 0,
//     completed_tasks_count: 0,
//   });
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     file: null,
//   });

//   const [newTask, setNewTask] = useState('');
//   const [showChangeRepeat, setShowChangeRepeat] = useState(false);
//   const [showLinkRecomendation, setShowLinkRecomendation] = useState(false);
//   const [showTaskDetail, setShowTaskDetail] = useState(false);
//   const [showTaskMember, setShowTaskMember] = useState(false);
//   const [showDeleteTask, setShowDeleteTask] = useState(false);
//   const [showDeleteGoal, setShowDeleteGoal] = useState(false);
//   const [showInviteMember, setShowInviteMember] = useState(false);
//   const [showCommentInput, setShowCommentInput] = useState(false);
//   const [showDeadline, setShowDeadline] = useState(false);
//   const [searchInvite, setSearchInvite] = useState('');
//   const [searchTaskInvite, setSearchTaskInvite] = useState('');
//   const [commentInput, setCommentInput] = useState('');
//   const [taskMember, setTaskMember] = useState<TaskMemberProps[]>([]);
//   const [taskComments, setTaskComments] = useState<CommentProps[]>([]);
//   const [taskDelayedMember, setTaskDelayedMember] = useState<TaskMemberProps[]>(
//     []
//   );
//   const [selectedReplyComment, setSelectedReplyComment] =
//     useState<CommentProps>();
//   const [isMentionReplyComment, setIsMentionReplyComment] = useState(false);

//   const [goalMember, setGoalMember] = useState<GoalMemberProps[]>([]);
//   const [goalMemberRole, setGoalMemberRole] = useState([
//     {
//       label: 'Viewer',
//       value: 'viewer',
//       disabled: false,
//     },
//     {
//       label: 'Editor',
//       value: 'editor',
//       disabled: false,
//     },
//     {
//       label: 'Checker',
//       value: 'checker',
//       disabled: false,
//     },
//   ]);

//   const [selectedDates, onDatesChange] = useState<Date[]>([]);
//   const {
//     data: { calendars, weekDays, time },
//     propGetters: {
//       dayButton,
//       nextMonthButton,
//       previousMonthButton,
//       timeButton,
//     },
//   } = useDatePicker({
//     selectedDates,
//     onDatesChange,
//     calendar: {
//       mode: 'fluid',
//       startDay: 1,
//     },
//   });
//   // const dpState = useDatePickerState({
//   //   selectedDates,
//   //   onDatesChange,
//   //   dates: { toggle: true, mode: 'multiple' },
//   // });
//   // const { calendars, weekDays } = useCalendars(dpState);

//   const { month, year, days } = calendars[0];
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedTask, setSelectedTask] = useState<TaskType>({});
//   const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
//   const [toastData, setToastData] = useState({
//     title: '',
//     interval: 5000,
//     type: 'error',
//     message: '',
//   });
//   const [data, setData] = useState({
//     progress: 30,
//     categories: [
//       {
//         name: 'All',
//         value: 'all',
//       },
//       {
//         name: 'Completed task',
//         value: 'completed',
//       },
//     ],
//   });
//   const [selectedCategory, setSelectedCategory] = useState(
//     router.query.task === 'completed' ? 'completed' : 'all'
//   );
//   const [EditGoalModal, setEditGoalModal] = useState(false);
//   const showEditGoalModal = () => {
//     setEditGoalModal(true);
//     setForm({
//       ...form,
//       title: goal.name,
//       description: goal.description,
//     });
//   };

//   const handleFileChange = (event: any) => {
//     const selectedFiles = event.target.files[0];

//     if (selectedFiles) {
//       setForm({
//         ...form,
//         file: selectedFiles,
//       });
//     }
//   };

//   const updateTitleGoal = (e: any) => {
//     setForm((prev) => {
//       return {
//         ...prev,
//         title: e.target.value,
//       };
//     });
//   };

//   const updateDescriptionGoal = (e: any) => {
//     setForm((prev) => {
//       return {
//         ...prev,
//         description: e.target.value,
//       };
//     });
//   };

//   const submitEditGoal = () => {
//     if (!form.title) {
//       alert('title required');
//       return;
//     }
//     if (!form.description) {
//       alert('description required');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('name', form.title);
//     formData.append('description', form.description);
//     if (form.file) {
//       formData.append('image', form.file);
//     }

//     axios
//       .post(API_URL + `goals/${id}/update`, formData, {
//         headers: headerAuth,
//       })
//       .then((res) => {
//         if ((res.status == 200 || res.status == 201) && res.data.data) {
//           setEditGoalModal(false);
//           setForm({
//             title: '',
//             description: '',
//             file: null,
//           });

//           init();
//         }
//       });
//   };

//   const getFileUrl = () => {
//     if (!form.file) {
//       return '';
//     }
//     return URL.createObjectURL(form.file);
//   };

//   const closeEditGoalModal = () => {
//     setEditGoalModal(false);
//   };
//   const [tasks, setTasks] = useState([
//     {
//       id: '',
//       name: 'Quash Window Shades',
//       deadline: '23, Sept. 2022',
//       is_repeat: true,
//       repeat: 'week',
//       url: '',
//       checked: false,
//       is_pin: false,
//       edit_mode: false,
//       type: '',
//     },
//   ]);

//   const access_token = cookies['access_token'];
//   const token_type = cookies['token_type'];
//   const headerAuth = {
//     Authorization: token_type + ' ' + access_token,
//   };

//   const input_new_task = useRef<HTMLInputElement>(null);
//   const input_comment = useRef<HTMLInputElement>(null);
//   const checkHandle = (data: any, index: number, e: any) => {
//     const tmp_task = [...tasks];
//     tmp_task[index].checked = e.target.checked;
//     setTasks(tmp_task);

//     axios
//       .post(
//         API_URL +
//           'tasks/' +
//           tmp_task[index].id +
//           (tmp_task[index].checked ? '/complete' : '/uncomplete'),
//         {},
//         {
//           headers: headerAuth,
//         }
//       )
//       .then(() => {
//         init();
//       });
//   };

//   const onChangeNewTask = (e: any) => {
//     setNewTask(e.target.value);
//   };

//   const onToggleGoalType = async () => {
//     if (!goal) {
//       return false;
//     }

//     await axios.post(
//       API_URL + 'goals/' + id + `/${goal.is_public ? 'private' : 'public'}`,
//       {},
//       {
//         headers: headerAuth,
//       }
//     );

//     init();
//   };

//   const renderAdditional = () => {
//     return (
//       <div className='mt-2 flex w-full gap-1 pl-20'>
//         {!isLoading && (
//           <h6 className='flex-auto text-sm'>{goal?.description}</h6>
//         )}
//         {isLoading && (
//           <div className='w-96 flex-auto'>
//             <Skeleton className='h-8 w-full'></Skeleton>
//           </div>
//         )}
//         {!isLoading && !goal?.is_public && (
//           <div
//             onClick={() => onToggleGoalType()}
//             className='flex h-8 flex-none cursor-pointer items-center gap-1 rounded-full border border-[#D9D9D9] bg-[#E3F3FB] pl-2 pr-3'
//           >
//             <PrivateIcon no_background={true} className='h-6 w-6' />
//             <h6 className='flex-none text-xs'>Private to you</h6>
//           </div>
//         )}
//         {!isLoading && goal?.is_public && (
//           <div
//             onClick={() => onToggleGoalType()}
//             className='flex h-8 flex-none cursor-pointer items-center gap-1 rounded-full border border-[#D9D9D9] bg-[#F5FBE3] pl-2 pr-3'
//           >
//             <PublicIcon no_background={true} className='h-6 w-6' />
//             <h6 className='flex-none text-xs'>Public for everyone</h6>
//           </div>
//         )}
//         {isLoading && (
//           <div className='w-24 flex-none'>
//             <Skeleton className='h-8 w-full'></Skeleton>
//           </div>
//         )}
//         {!isLoading &&
//           goalMember.filter((item) => item.is_confirmed).length <= 1 && (
//             <div
//               onClick={() => showInvite()}
//               className='flex h-8 cursor-pointer items-center gap-1 rounded-full border border-[#D9D9D9] bg-white px-3'
//             >
//               <AddUserIcon className='h-5 w-5' />
//               <h6 className='text-xs'>Member</h6>
//             </div>
//           )}
//         {!isLoading &&
//           goalMember.filter((item) => item.is_confirmed).length > 1 && (
//             <div
//               className='z-0 flex cursor-pointer items-center -space-x-4'
//               onClick={() => showInvite()}
//             >
//               {goalMember
//                 .filter((item) => item.is_confirmed)
//                 .slice(0, goalMemberLimit)
//                 .map((item, index) => (
//                   <div key={index}>
//                     <Image
//                       src={
//                         item.user && item.user.profile_picture
//                           ? item.user.profile_picture
//                           : 'https://ui-avatars.com/api/?name=' +
//                             item.user?.fullname
//                       }
//                       alt='notification-photo'
//                       className={clsxm(
//                         'h-8 w-8 flex-none rounded-full border-2 border-white'
//                       )}
//                       width={32}
//                       height={32}
//                     />
//                   </div>
//                 ))}

//               {goalMember.length > 0 &&
//                 goalMember.filter((item) => item.is_confirmed).length >
//                   goalMemberLimit && (
//                   <div className='flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-white bg-primary-green text-xs font-semibold text-white'>
//                     <span>
//                       {goalMember.filter((item) => item.is_confirmed).length -
//                         goalMemberLimit}
//                     </span>
//                     <span>+</span>
//                   </div>
//                 )}
//             </div>
//           )}
//         {isLoading && (
//           <div className='w-48 flex-none'>
//             <Skeleton className='h-8 w-full'></Skeleton>
//           </div>
//         )}
//         {!isLoading && (
//           <div className='flex items-center gap-3'>
//             <ProgressBar value={data.progress} />
//             <h6 className='text-md'>
//               {+parseFloat('' + data.progress).toFixed(0)}%
//             </h6>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const setToast = (
//     title: string,
//     message: string,
//     type: string,
//     interval = 5000
//   ) => {
//     setToastData({
//       title: title,
//       message: message,
//       type: type,
//       interval: interval,
//     });
//     setTimeout(() => {
//       setToastData({
//         title: '',
//         interval: 5000,
//         type: 'error',
//         message: '',
//       });
//     }, interval);
//   };

//   const beforeShowChangeRepeat = (e: any, index: number) => {
//     if (tasks.length == 0) {
//       return false;
//     }
//     setSelectedTask(tasks[index]);
//     setShowChangeRepeat(true);
//   };

//   const closeChangeRepeat = () => {
//     setShowChangeRepeat(false);
//     setTimeout(() => {
//       setSelectedTask({});
//     }, 300);
//   };

//   const beforeShowLinkRecommendation = (e: any, index: number) => {
//     if (tasks.length == 0) {
//       return false;
//     }
//     setSelectedTask(tasks[index]);
//     setShowLinkRecomendation(true);
//   };

//   const closeLinkRecomendation = () => {
//     setShowLinkRecomendation(false);
//     setTimeout(() => {
//       setSelectedTask({});
//     }, 300);
//   };

//   const beforeShowTaskDetail = async (e: any, index: number) => {
//     if (tasks.length == 0) {
//       return false;
//     }
//     await setSelectedTask(tasks[index]);
//     setSelectedTaskIndex(index);
//     setShowTaskDetail(true);
//     getTaskComment(tasks[index].id);
//   };

//   const closeTaskDetail = () => {
//     setShowTaskDetail(false);
//     setTimeout(() => {
//       setCommentInput('');
//       setSelectedTask({});
//     }, 300);
//   };

//   const beforeShowDeleteTask = (e: any, index: number) => {
//     if (tasks.length == 0) {
//       return false;
//     }
//     setSelectedTask(tasks[index]);
//     setShowDeleteTask(true);
//   };

//   const closeDeleteTask = () => {
//     setShowDeleteTask(false);
//     setTimeout(() => {
//       setSelectedTask({});
//     }, 300);
//   };

//   const submitDeleteTask = () => {
//     if (!selectedTask?.id) {
//       return false;
//     }
//     setShowDeleteTask(false);
//     axios
//       .delete(API_URL + 'tasks/' + selectedTask.id, {
//         headers: headerAuth,
//       })
//       .then(async () => {
//         setSelectedTask({});
//         await getTasks();
//       });
//   };

//   const beforeShowDeadline = (e: any, index: number) => {
//     setSelectedTask(tasks[index]);
//     setSelectedTime('');
//     onDatesChange([]);
//     setShowDeadline(true);
//   };

//   const closeChangeDeadline = () => {
//     setShowDeadline(false);
//     setTimeout(() => {
//       setSelectedTask({});
//     }, 300);
//   };

//   const onChangeLinkRecommendation = (e: any) => {
//     // selectedTask.url = e.target.value;
//     setSelectedTask((prevTask) => {
//       return {
//         ...prevTask,
//         url: e.target.value,
//       };
//     });
//   };

//   const updateLinkRecomendation = async () => {
//     if (!selectedTask?.id) {
//       return false;
//     }
//     // if (!selectedTask.url) {
//     //   setToast('Error', `Link Recommendations is Required`, 'error');
//     //   return false;
//     // }
//     if (
//       selectedTask.url &&
//       (!selectedTask.url?.includes('.') ||
//         selectedTask.url[selectedTask.url.length - 1] === '.' ||
//         selectedTask.url[0] === '.')
//     ) {
//       setToast('Error', `Link Recommendations not valid`, 'error');
//       return false;
//     }
//     setShowLinkRecomendation(false);
//     axios
//       .put(
//         API_URL + 'tasks/' + selectedTask.id,
//         {
//           ...selectedTask,
//           title: selectedTask.title || selectedTask.name,
//           type: selectedTask.type || 'task',
//           notes: selectedTask.notes || selectedTask.title || selectedTask.name,
//           recommendation_url: selectedTask.url
//             ? selectedTask.url.includes('http://') ||
//               selectedTask.url.includes('https://')
//               ? selectedTask.url
//               : 'https://' + selectedTask.url
//             : null,
//         },
//         {
//           headers: headerAuth,
//         }
//       )
//       .then(async () => {
//         setSelectedTask({});
//         await getTasks(true);
//       });
//   };

//   const init = async () => {
//     if (router.query.task && router.query.task === 'completed') {
//       await setSelectedCategory('completed');
//     }

//     await getGoalData();
//     await getGoalMember();
//   };

//   const setPin = (value = true) => {
//     if (!id) {
//       return false;
//     }
//     axios
//       .post(
//         API_URL + `goals/${id}/${value ? 'pin' : 'unpin'}`,
//         {},
//         {
//           headers: {
//             Authorization: token_type + ' ' + access_token,
//           },
//         }
//       )
//       .then((res) => {
//         if (res.status == 200) {
//           setGoal((prev) => {
//             return {
//               ...prev,
//               is_pin: value,
//             };
//           });
//         }
//       });
//   };

//   const getGoalData = async () => {
//     if (!id) {
//       return false;
//     }
//     try {
//       setLoaded(true);
//       axios
//         .get(API_URL + `goals/${id}`, {
//           headers: {
//             Authorization: token_type + ' ' + access_token,
//           },
//         })
//         .then((res) => {
//           if (res.status == 200) {
//             setData((prev) => {
//               return {
//                 ...prev,
//                 progress: res.data.data.percentage,
//               };
//             });
//             setGoal(res.data.data);
//             setIsLoading(false);
//           }
//           if (res.status == 404) {
//             router.push('/dashboard');
//           }
//         })
//         .catch(() => {
//           router.push('/dashboard');
//         });
//       await getTasks(
//         true,
//         selectedCategory === 'completed' || router.query.task === 'completed'
//           ? 'filter[is_complete]=true'
//           : ''
//       );
//     } catch (error) {
//       router.push('/dashboard');
//     }
//     return true;
//   };

//   const getTasks = async (forceUpdate = false, filter = '') => {
//     if (forceUpdate) {
//       setIsTaskLoading(true);
//     }
//     const res = await axios.get(
//       API_URL + `goals/${id}/tasks` + (filter ? '?' + filter : ''),
//       {
//         headers: {
//           Authorization: token_type + ' ' + access_token,
//         },
//       }
//     );
//     if (res.status == 200) {
//       const result = await res.data.data.map((item: any) => {
//         return {
//           ...item,
//           id: item.id,
//           name: item.title,
//           deadline: item.due_date,
//           is_repeat: !!item.repeat_type,
//           repeat: item.repeat_type,
//           url: item.recommendation_url,
//           checked: !!item.is_complete,
//           is_pin: !!item.is_pin,
//           edit_mode: false,
//         };
//       });
//       if (forceUpdate) {
//         setTasks([]);
//         setTimeout(() => {
//           setTasks(result);
//           setIsTaskLoading(false);
//           setIsLoading(false);
//         }, 500);
//       } else {
//         setTasks(result);
//         setIsTaskLoading(false);
//         setIsLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     if (!loaded) {
//       init();
//     }
//   });

//   const onKeyPressNewTask = (evt: any) => {
//     if (evt?.code === 'Enter') {
//       addNewTask();
//     }
//   };
//   const addNewTask = () => {
//     if (newTask === '') {
//       return false;
//     }
//     axios
//       .post(
//         API_URL + 'tasks',
//         {
//           goal_id: id,
//           title: newTask,
//           notes: newTask,
//           type: 'task',
//         },
//         {
//           headers: {
//             Authorization: token_type + ' ' + access_token,
//           },
//         }
//       )
//       .then(async () => {
//         await getTasks();
//         setNewTask('');
//       });
//   };

//   const typeNewTask = () => {
//     if (!input_new_task || !input_new_task.current) {
//       return false;
//     }
//     input_new_task.current.focus();
//   };

//   const showDeleteGoalModal = () => {
//     setShowDeleteGoal(true);
//   };

//   const closeDeleteGoal = () => {
//     setShowDeleteGoal(false);
//   };

//   const submitDeleteGoal = () => {
//     if (!id) {
//       return false;
//     }
//     setShowDeleteGoal(false);
//     axios
//       .delete(API_URL + `goals/${id}`, {
//         headers: headerAuth,
//       })
//       .then(() => {
//         router.push('/dashboard');
//       });
//   };

//   const showInvite = () => {
//     setSearchInvite('');
//     setShowInviteMember(true);
//     getGoalMember();
//   };

//   const getGoalMember = () => {
//     if (!id) {
//       return false;
//     }
//     axios
//       .get(API_URL + `goals/${id}/members`, {
//         headers: {
//           Authorization: token_type + ' ' + access_token,
//         },
//       })
//       .then((res) => {
//         if (res.status == 200) {
//           setGoalMember(res.data.data);
//         }
//       });
//   };

//   const closeInvite = () => {
//     setSearchInvite('');
//     setShowInviteMember(false);
//   };

//   const onChangeInviteMember = (e: any) => {
//     setSearchInvite(e.target.value);
//   };

//   const onChangeTaskInviteMember = (e: any) => {
//     setSearchTaskInvite(e.target.value);
//   };

//   const onUpdatePinTask = async (e: any, index: number) => {
//     await axios.post(
//       API_URL +
//         `tasks/${tasks[index].id}/${tasks[index].is_pin ? 'unpin' : 'pin'}`,
//       {},
//       {
//         headers: headerAuth,
//       }
//     );
//     await getTasks(true);
//   };

//   const onUpdateTask = async () => {
//     await getGoalData();
//   };

//   const sendInvite = async () => {
//     const res = await axios.post(
//       API_URL + `goals/${id}/invite-member`,
//       {
//         username_or_email: searchInvite,
//       },
//       {
//         headers: {
//           Authorization: token_type + ' ' + access_token,
//         },
//       }
//     );

//     if (res.status === 200 || res.status === 201) {
//       setToast('Succeed', `${searchInvite} has been invited!`, 'success');
//       setSearchInvite('');
//       getGoalMember();
//     }
//   };

//   const sendTaskInvite = async () => {
//     if (!selectedTask.id) {
//       return false;
//     }
//     const res = await axios.post(
//       API_URL + `tasks/${selectedTask.id}/assign/username`,
//       {
//         username_or_email: searchTaskInvite,
//       },
//       {
//         headers: {
//           Authorization: token_type + ' ' + access_token,
//         },
//       }
//     );

//     if (res.status === 200 || res.status === 201) {
//       setToast('Succeed', `${searchTaskInvite} has been invited!`, 'success');
//       setSearchTaskInvite('');
//       getTasks(true);
//       getTaskMember();
//     }
//   };

//   const updateCheckSeletedTask = (e: any) => {
//     const index = tasks.findIndex((item) => item.id === selectedTask.id);

//     checkHandle(selectedTask, index, e);
//   };

//   const onChangeComment = (e: any) => {
//     setCommentInput(e.target.value);
//   };

//   const onKeyDownComment = (e: any, viaModal = false) => {
//     if (e?.code === 'Enter' && commentInput !== '') {
//       addNewComment(viaModal);
//     }

//     if (
//       e?.code === 'Backspace' &&
//       isMentionReplyComment &&
//       commentInput === ''
//     ) {
//       cancelReplyComment();
//     }
//   };

//   const getTaskComment = async (task_id?: string) => {
//     if (!selectedTask.id && !task_id) {
//       return false;
//     }
//     setIsCommentLoading(true);
//     const res = await axios.get(
//       API_URL + `tasks/${task_id || selectedTask.id}/comments`,
//       {
//         headers: headerAuth,
//       }
//     );
//     setTaskComments(res.data.data);
//     setIsCommentLoading(false);
//   };

//   const addNewComment = async (viaModal = false) => {
//     if (!commentInput || commentInput === '') {
//       setToast('Warning', `Comment is required`, 'warning');
//       return false;
//     }
//     const data = {
//       content: commentInput,
//       task_comment_id:
//         isMentionReplyComment && selectedReplyComment
//           ? selectedReplyComment.id
//           : null,
//     };
//     const res = await axios.post(
//       API_URL + `tasks/${selectedTask.id}/comments`,
//       data,
//       {
//         headers: headerAuth,
//       }
//     );

//     if (res.status === 200 || res.status === 201) {
//       setCommentInput('');
//       if (viaModal) {
//         setShowCommentInput(false);
//       } else {
//         await getTaskComment();
//       }
//     }
//   };

//   const selectPrevTask = () => {
//     if (selectedTaskIndex == 0 || tasks.length === 0) {
//       return false;
//     }
//     const prevIndex = selectedTaskIndex - 1;
//     setSelectedTaskIndex(prevIndex);
//     setSelectedTask(tasks[prevIndex]);
//     getTaskComment(tasks[prevIndex].id);
//   };

//   const selectNextTask = () => {
//     if (selectedTaskIndex == tasks.length - 1 || tasks.length === 0) {
//       return false;
//     }
//     const nextIndex = selectedTaskIndex + 1;
//     setSelectedTaskIndex(nextIndex);
//     setSelectedTask(tasks[nextIndex]);
//     getTaskComment(tasks[nextIndex].id);
//   };

//   const chooseTime = (time: any, close: any) => {
//     setSelectedTime(time.time);
//     timeButton(time);
//     close();
//   };

//   const cancelChangeDeadline = () => {
//     setSelectedTime('');
//     setSelectedTask({});
//     setShowDeadline(false);
//   };

//   const submitDeadline = async () => {
//     if (!selectedTask.id) {
//       return false;
//     }
//     if (selectedDates.length <= 0) {
//       setToast('Error', `Due Date is required`, 'error');
//       return false;
//     }

//     if (!selectedTime || selectedTime === '') {
//       setToast('Error', `Due Time is required`, 'error');
//       return false;
//     }

//     setDeadlineLoading(true);
//     const dueDate =
//       format(selectedDates[0], 'yyyy-MM-dd') + ' ' + selectedTime + ':00';

//     await axios.put(
//       API_URL + 'tasks/' + selectedTask.id,
//       {
//         ...selectedTask,
//         title: selectedTask.title || selectedTask.name,
//         type: selectedTask.type || 'task',
//         notes: selectedTask.notes || selectedTask.title || selectedTask.name,
//         recommendation_url: selectedTask.url,
//         due_date: dueDate,
//       },
//       {
//         headers: headerAuth,
//       }
//     );
//     setSelectedTime('');
//     setShowDeadline(false);
//     setDeadlineLoading(false);
//     setSelectedTask({});
//     onDatesChange([]);
//     await getTasks(true);
//   };

//   const onChangeMemberRole = async (
//     member: GoalMemberProps,
//     role: string,
//     closeEvent: any
//   ) => {
//     const res = await axios.post(
//       API_URL + `goal-members/${member.id}/set-role`,
//       {
//         role: role,
//       },
//       {
//         headers: headerAuth,
//       }
//     );
//     if (res.status == 200 || res.status == 201) {
//       getGoalMember();
//     }

//     closeEvent();
//   };

//   const onChangeRepeatTask = async (e: any) => {
//     if (!selectedTask.id) {
//       return false;
//     }
//     await setSelectedTask((prev) => ({
//       ...prev,
//       repeat_type: e.target.value,
//     }));

//     const res = await axios.put(
//       API_URL + 'tasks/' + selectedTask.id,
//       {
//         ...selectedTask,
//         repeat_type: e.target.value,
//         repeat: e.target.value,
//       },
//       {
//         headers: headerAuth,
//       }
//     );

//     if (res.status === 200 || res.status === 201) {
//       closeChangeRepeat();
//       setSelectedTask({});
//       await getTasks(true);
//     }
//   };

//   const filterCategory = async (category: any) => {
//     await setSelectedCategory(category.value);
//     await router.replace(`/goal/${id}?task=${category.value}`);
//     getTasks(
//       true,
//       category.value === 'completed' ? 'filter[is_complete]=true' : ''
//     );
//   };

//   const beforeShowTaskMember = (index: number) => {
//     if (tasks.length == 0 || index > tasks.length) {
//       return false;
//     }
//     setSelectedTask(tasks[index]);
//     getTaskMember(tasks[index].id);
//     setShowTaskMember(true);
//   };

//   const getTaskMember = async (task_id = '') => {
//     if (!selectedTask.id && !task_id) {
//       return false;
//     }
//     const res = await axios.get(
//       API_URL + `tasks/${selectedTask.id || task_id}/assigns`,
//       {
//         headers: headerAuth,
//       }
//     );

//     if (res.status === 200 || res.status === 201) {
//       setTaskMember(res.data.data);
//     }
//   };

//   const closeShowTaskMember = () => {
//     setShowTaskMember(false);
//   };

//   const unassignTaskMember = async (user_id?: string) => {
//     if (!selectedTask.id || !user_id) {
//       return false;
//     }

//     const res = await axios.post(
//       API_URL + `tasks/${selectedTask.id}/unassign`,
//       {
//         goal_member_id: user_id,
//         getTaskComment,
//       },
//       {
//         headers: headerAuth,
//       }
//     );

//     if (res.status === 200 || res.status === 201) {
//       getTaskMember();
//     }
//   };

//   const beforeShowCommentInput = (index: number) => {
//     setSelectedTask(tasks[index]);
//     getTaskComment(tasks[index].id);
//     setShowCommentInput(true);
//   };

//   const wantReplyComment = (comment: CommentProps) => {
//     setSelectedReplyComment(comment);
//     setIsMentionReplyComment(true);

//     setTimeout(() => {
//       if (input_comment && input_comment.current) {
//         input_comment.current.focus();
//       }
//     }, 10);

//     console.log(comment);
//   };

//   const deleteComment = async (comment: CommentProps) => {
//     if (!comment.id) {
//       return false;
//     }
//     try {
//       const res = await axios.delete(API_URL + 'task-comments/' + comment.id, {
//         headers: headerAuth,
//       });

//       if (res.status === 200 || res.status === 201) {
//         setToast('Succeed', `Comment deleted!`, 'success');
//         getTaskComment();
//         return;
//       }

//       setToast('Error', res.data, 'error');
//     } catch (error: any) {
//       setToast('Error', error.message, 'error');
//     }
//   };

//   const cancelReplyComment = () => {
//     setIsMentionReplyComment(false);
//     setTimeout(() => {
//       setSelectedReplyComment(undefined);
//     }, 300);
//   };

//   const closeCommentInput = () => {
//     setShowCommentInput(false);
//     setTimeout(() => {
//       setCommentInput('');
//       setSelectedTask({});
//       setIsMentionReplyComment(false);
//       setSelectedReplyComment(undefined);
//     }, 300);
//   };

//   const onShowFullReplies = async (item: CommentProps) => {
//     if (!selectedTask.id || taskComments.length == 0) {
//       return false;
//     }
//     const selectedTaskCommentIndex = taskComments.findIndex(
//       (data) => item.id === data.id
//     );
//     if (
//       selectedTaskCommentIndex === -1 ||
//       selectedTaskCommentIndex >= taskComments.length
//     ) {
//       return false;
//     }

//     const res = await axios.get(
//       API_URL + `tasks/${selectedTask.id}/comments?task_comment_id=${item.id}`,
//       {
//         headers: headerAuth,
//       }
//     );

//     const tmpTaskComments = [...taskComments];
//     tmpTaskComments[selectedTaskCommentIndex].replies = res.data.data;
//     tmpTaskComments[selectedTaskCommentIndex].replies_count =
//       res.data.data.length;
//     tmpTaskComments[selectedTaskCommentIndex].is_show_full_reply = true;

//     setTaskComments(tmpTaskComments);

//     console.log();
//   };
//   return (
//     <>
//       <AuthenticatedLayout>
//         <HeadTag title={goal?.name} />
//         <main className='flex'>
//           <div className='flex flex-auto flex-col pb-16'>
//             <Navbar bottom={renderAdditional()}>
//               <div className='flex items-center gap-3 pl-6 '>
//                 {goal?.image && (
//                   <div className='h-11 w-11'>
//                     <Image
//                       src={BASE_URL + goal?.image}
//                       width={44}
//                       height={44}
//                       alt=''
//                     />
//                   </div>
//                 )}
//                 {!goal?.image && (
//                   <div className='h-11 w-11 rounded-lg bg-gray-200'>
//                     {goal?.image}
//                   </div>
//                 )}
//                 <div className='flex flex-col'>
//                   <div className='flex items-center gap-1'>
//                     {!isLoading && (
//                       <div className='max-w-lg'>
//                         <h6 className='text-3xl font-medium'>{goal?.name}</h6>
//                       </div>
//                     )}
//                     {isLoading && (
//                       <div className='w-96 flex-auto'>
//                         <Skeleton className='h-8 w-full'></Skeleton>
//                       </div>
//                     )}
//                     <div>
//                       <Menu>
//                         {({ open }) => (
//                           <>
//                             <Menu.Button>
//                               <MdExpandMore
//                                 className={clsxm(
//                                   'text-xl transition-all duration-300',
//                                   open ? 'rotate-180' : ''
//                                 )}
//                               />
//                             </Menu.Button>
//                             <Transition
//                               enter='transition duration-100 ease-out'
//                               enterFrom='transform scale-95 opacity-0'
//                               enterTo='transform scale-100 opacity-100'
//                               leave='transition duration-75 ease-out'
//                               leaveFrom='transform scale-100 opacity-100'
//                               leaveTo='transform scale-95 opacity-0'
//                             >
//                               <Menu.Items className='absolute left-0 flex w-56 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white py-2 shadow-md'>
//                                 <Menu.Item>
//                                   {({ active }) => (
//                                     <div
//                                       className={`${
//                                         active && 'bg-gray-100'
//                                       } flex cursor-pointer items-center gap-2 p-2 px-4`}
//                                       onClick={() => setPin(!goal.is_pin)}
//                                     >
//                                       <PushPinIcon className='h-4 w-4' />
//                                       <span className='text-sm'>
//                                         {goal.is_pin
//                                           ? 'Unpin goals'
//                                           : 'Pin goals'}
//                                       </span>
//                                     </div>
//                                   )}
//                                 </Menu.Item>
//                                 <Menu.Item>
//                                   {({ active }) => (
//                                     <a
//                                       onClick={() => showEditGoalModal()}
//                                       className={`${
//                                         active && 'bg-gray-100'
//                                       } flex items-center gap-2 p-2 px-4`}
//                                       href='#'
//                                     >
//                                       <EditSquareIcon className='h-4 w-4' />
//                                       <span className='text-sm'>
//                                         Edit goals
//                                       </span>
//                                     </a>
//                                   )}
//                                 </Menu.Item>
//                                 <Menu.Item>
//                                   {({ active }) => (
//                                     <div
//                                       className={`${
//                                         active && 'bg-gray-100'
//                                       } flex cursor-pointer items-center gap-2 p-2 px-4`}
//                                       onClick={() => typeNewTask()}
//                                     >
//                                       <SquarePlusIcon className='h-4 w-4' />
//                                       <span className='text-sm'>Add tasks</span>
//                                     </div>
//                                   )}
//                                 </Menu.Item>
//                                 <Menu.Item>
//                                   {({ active }) => (
//                                     <div
//                                       className={`${
//                                         active && 'bg-gray-100'
//                                       } flex cursor-pointer items-center gap-2 p-2 px-4`}
//                                       onClick={() => showInvite()}
//                                     >
//                                       <AddUserIcon className='h-4 w-4' />
//                                       <span className='text-sm'>
//                                         Add member goals
//                                       </span>
//                                     </div>
//                                   )}
//                                 </Menu.Item>
//                                 <Menu.Item>
//                                   {({ active }) => (
//                                     <div
//                                       className={`${
//                                         active && 'bg-gray-100'
//                                       } flex cursor-pointer items-center gap-2 p-2 px-4 text-danger`}
//                                       onClick={() => showDeleteGoalModal()}
//                                     >
//                                       <DeleteIcon className='h-4 w-4' />
//                                       <span className='text-sm'>
//                                         Delete goals
//                                       </span>
//                                     </div>
//                                   )}
//                                 </Menu.Item>
//                               </Menu.Items>
//                             </Transition>
//                           </>
//                         )}
//                       </Menu>
//                     </div>
//                     <div>
//                       {goal?.is_pin && <PinedIcon className='h-7 w-7' />}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Navbar>
//             <div className='mt-3 flex flex-col gap-3 pl-4'>
//               <div className='flex w-full pl-4 pr-12'>
//                 <div className=''>
//                   <Menu>
//                     {({ open }) => (
//                       <>
//                         <Menu.Button>
//                           <div className='flex items-center gap-3'>
//                             <h6 className='font-medium'>
//                               {
//                                 data?.categories?.find(
//                                   (item) => item.value === selectedCategory
//                                 )?.name
//                               }
//                             </h6>
//                             <span>
//                               <MdExpandMore
//                                 className={clsxm(
//                                   'transition-all duration-300',
//                                   open ? 'rotate-180' : ''
//                                 )}
//                               />
//                             </span>
//                           </div>
//                         </Menu.Button>
//                         <Menu.Items className='absolute flex w-48 flex-col gap-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md'>
//                           {data?.categories?.map((elem, key) => {
//                             return (
//                               <Menu.Item key={key}>
//                                 {({ active }) => (
//                                   <div
//                                     className={`${
//                                       active && 'bg-gray-100'
//                                     } flex cursor-pointer items-center gap-3 py-2 px-3`}
//                                     onClick={() => filterCategory(elem)}
//                                   >
//                                     <div className='flex-auto'>{elem.name}</div>
//                                     {selectedCategory === elem.value && (
//                                       <BsCheck2 className='text-md font-normal' />
//                                     )}
//                                   </div>
//                                 )}
//                               </Menu.Item>
//                             );
//                           })}
//                         </Menu.Items>
//                       </>
//                     )}
//                   </Menu>
//                 </div>
//                 <div className='flex-auto'></div>
//                 <div>
//                   <PrimaryButton
//                     size='mini'
//                     onClick={() => typeNewTask()}
//                     rounded={true}
//                   >
//                     <div className='flex items-center'>
//                       <span>
//                         <PlusIcon className='h-6 w-6' />
//                       </span>{' '}
//                       Add new tasks
//                     </div>
//                   </PrimaryButton>
//                 </div>
//               </div>
//               <div className='list-task flex flex-col gap-3'>
//                 {!isLoading &&
//                   !isTaskLoading &&
//                   tasks &&
//                   tasks.length > 0 &&
//                   tasks?.map((elem, index) => (
//                     <TaskItem
//                       id={elem.id}
//                       key={index}
//                       title={elem.name}
//                       is_checked={elem.checked}
//                       type={elem.type}
//                       is_pin={elem.is_pin}
//                       deadline={elem.deadline || ''}
//                       repeat={elem.repeat || ''}
//                       url={elem.url || ''}
//                       onChangeCheck={(e) => checkHandle(elem, index, e)}
//                       onWantChangeRepeat={(e) =>
//                         beforeShowChangeRepeat(e, index)
//                       }
//                       onWantChangeLinkRecommendation={(e) =>
//                         beforeShowLinkRecommendation(e, index)
//                       }
//                       onWantShowTaskDetail={(e) =>
//                         beforeShowTaskDetail(e, index)
//                       }
//                       onWantChangeDeadline={(e) => beforeShowDeadline(e, index)}
//                       onWantDelete={(e) => beforeShowDeleteTask(e, index)}
//                       onWantAssignMember={() => beforeShowTaskMember(index)}
//                       onWantComment={() => beforeShowCommentInput(index)}
//                       onUpdatePinTask={(e) => onUpdatePinTask(e, index)}
//                       onUpdateTask={() => onUpdateTask()}
//                     />
//                   ))}
//               </div>
//               <Transition
//                 show={isLoading || isTaskLoading}
//                 enter='transition duration-100 ease-out'
//                 enterFrom='transform scale-95 opacity-0'
//                 enterTo='transform scale-100 opacity-100'
//                 leave='transition duration-75 ease-out'
//                 leaveFrom='transform scale-100 opacity-100'
//                 leaveTo='transform scale-95 opacity-0'
//               >
//                 <div className='w-96 flex-auto'>
//                   <Skeleton className='h-8 w-full'></Skeleton>
//                 </div>
//               </Transition>
//               <div
//                 className={clsxm(
//                   'group flex items-center gap-2 py-2 pl-3 focus:bg-gray-recommend_task/15',
//                   newTask ? 'bg-gray-recommend_task/15' : ''
//                 )}
//               >
//                 <div
//                   className={clsxm(
//                     newTask
//                       ? 'rounded-full bg-primary-green text-white'
//                       : 'text-gray-border',
//                     'h-8 w-8 transition-all duration-300'
//                   )}
//                 >
//                   <PlusIcon className='' />
//                 </div>
//                 <input
//                   type='text'
//                   ref={input_new_task}
//                   value={newTask}
//                   onChange={onChangeNewTask}
//                   onKeyDown={onKeyPressNewTask}
//                   placeholder='Add new task'
//                   className='mr-4 w-full border-none bg-transparent pl-0 placeholder:text-gray-border focus:border-none focus:outline-none focus:ring-0'
//                 />
//               </div>
//             </div>
//             <Transition
//               show={
//                 tasks.length == 0 &&
//                 !newTask &&
//                 !isLoading &&
//                 !isTaskLoading &&
//                 loaded
//               }
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//             >
//               <div className='mt-2 flex w-full flex-col items-center justify-center'>
//                 <AddTaskIllustration className='h-[280px]' />
//                 <h6 className='mt-3 text-lg font-medium'>Tambahkan task</h6>
//                 <h6 className='text-md max-w-md text-center text-gray-username'>
//                   Yuk tambahkan task baru di Goal ini!
//                 </h6>
//               </div>
//             </Transition>

//             <Transition
//               show={showDeadline}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog
//                 onClose={() => closeChangeDeadline()}
//                 className='relative z-50'
//               >
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full rounded-lg bg-white px-8 pt-4 pb-8 md:w-96'>
//                     <Dialog.Title className='text-lg font-bold'>
//                       Due Date Task
//                     </Dialog.Title>
//                     <div className='mt-3 flex w-full max-w-xl flex-col'>
//                       <section>
//                         <div>
//                           <div className='flex items-center gap-3 py-2'>
//                             <div {...previousMonthButton()}>
//                               <HiChevronLeft></HiChevronLeft>
//                             </div>
//                             <p className='flex-auto text-center text-lg font-semibold text-[#333333]'>
//                               {month} {year}
//                             </p>
//                             <div {...nextMonthButton()}>
//                               <HiChevronRight></HiChevronRight>
//                             </div>
//                           </div>
//                           <Calendar className='mx-auto grid grid-cols-7 justify-center gap-3 text-center font-semibold'>
//                             {weekDays.map((day) => (
//                               <div
//                                 className={clsxm(
//                                   'p-2 font-semibold text-[#666666]'
//                                 )}
//                                 key={`${month}-${day}`}
//                               >
//                                 {day.substring(0, 2)}
//                               </div>
//                             ))}
//                           </Calendar>
//                         </div>
//                         <Calendar className='mx-auto items-center text-center'>
//                           {days.map((dpDay) => (
//                             <div key={dpDay.$date.toString()}>
//                               <button
//                                 className={clsxm(
//                                   !dpDay.inCurrentMonth
//                                     ? 'opacity-50'
//                                     : 'opacity-100',
//                                   dpDay.now && !dpDay.selected
//                                     ? 'aspect-square rounded-full border border-primary-green text-primary-green'
//                                     : '',
//                                   dpDay.selected
//                                     ? 'aspect-square rounded-full bg-primary-green text-white'
//                                     : '',
//                                   'h-8 w-8 p-1 text-center'
//                                 )}
//                                 {...dayButton(dpDay)}
//                               >
//                                 {dpDay.day}
//                               </button>
//                             </div>
//                           ))}
//                         </Calendar>
//                         <div className='relative mt-3'>
//                           <Menu>
//                             {() => (
//                               <>
//                                 <Menu.Button className='flex w-full items-center rounded-md py-2 px-3'>
//                                   <div className='flex items-center gap-3 text-gray-mark_notification/58'>
//                                     <TimeCircleIcon className='h-8 w-8'></TimeCircleIcon>
//                                     {!selectedTime && (
//                                       <div className='flex-auto'>
//                                         <h6>Time</h6>
//                                       </div>
//                                     )}
//                                     {selectedTime && (
//                                       <div className='flex-auto text-left text-gray-message_notification'>
//                                         {selectedTime}
//                                       </div>
//                                     )}
//                                   </div>
//                                 </Menu.Button>
//                                 <Menu.Items className='absolute top-8 flex max-h-36 w-full flex-col overflow-hidden overflow-y-auto rounded-md bg-white p-2 shadow-xl'>
//                                   {time.map((t) => (
//                                     <Menu.Item key={t.$date.toString()}>
//                                       {({ close }) => (
//                                         <div
//                                           className='cursor-pointer rounded-md p-2 hover:bg-primary-green hover:text-white'
//                                           onClick={() => chooseTime(t, close)}
//                                         >
//                                           <div>{t.time}</div>
//                                         </div>
//                                       )}
//                                     </Menu.Item>
//                                   ))}
//                                 </Menu.Items>
//                               </>
//                             )}
//                           </Menu>
//                           {/* <SelectInput selectClassName='py-3'>
//                             {time.map((t) => (
//                               <option
//                                 key={t.$date.toString()}
//                                 {...timeButton(t)}
//                               >
//                                 <div>{t.time}</div>
//                               </option>
//                             ))}
//                           </SelectInput> */}
//                         </div>
//                       </section>
//                       <section>
//                         <div className='mt-2 flex w-full flex-row-reverse items-center gap-3'>
//                           <PrimaryButton
//                             is_loading={deadlineLoading}
//                             onClick={() => submitDeadline()}
//                           >
//                             Save
//                           </PrimaryButton>
//                           <SecondaryButton
//                             onClick={() => cancelChangeDeadline()}
//                           >
//                             Cancel
//                           </SecondaryButton>
//                         </div>
//                       </section>
//                     </div>
//                     <div
//                       onClick={() => cancelChangeDeadline()}
//                       className='absolute -top-3 -right-3 cursor-pointer'
//                     >
//                       <CircleCloseIcon className='h-8 w-8' />
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>
//             <Transition
//               show={showChangeRepeat}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog
//                 onClose={() => closeChangeRepeat()}
//                 className='relative z-50'
//               >
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white px-8 pt-4 pb-8'>
//                     <Dialog.Title className='text-lg font-bold'>
//                       Repeat Task
//                     </Dialog.Title>
//                     <div className='mt-3 flex w-full max-w-xl flex-col'>
//                       <SelectInput
//                         selectClassName='capitalize'
//                         onChange={(e) => onChangeRepeatTask(e)}
//                         value={selectedTask?.repeat_type || 'never'}
//                       >
//                         <option className='capitalize' value='never'>
//                           {translate('never')}
//                         </option>
//                         <option className='capitalize' value='day'>
//                           {translate('every day')}
//                         </option>
//                         <option className='capitalize' value='week'>
//                           {translate('every week')}
//                         </option>
//                         <option className='capitalize' value='month'>
//                           {translate('every month')}
//                         </option>
//                         <option className='capitalize' value='year'>
//                           {translate('every year')}
//                         </option>
//                       </SelectInput>
//                     </div>
//                     <div
//                       onClick={closeChangeRepeat}
//                       className='absolute -top-3 -right-3 cursor-pointer'
//                     >
//                       <CircleCloseIcon className='h-8 w-8' />
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>

//             <Transition
//               show={showLinkRecomendation}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog
//                 onClose={() => closeLinkRecomendation()}
//                 className='relative z-50'
//               >
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white px-8 pt-4 pb-8'>
//                     <Dialog.Title className='text-lg font-bold'>
//                       Link recommendations
//                     </Dialog.Title>
//                     <div className='mt-6 flex w-full max-w-xl flex-col'>
//                       <TextInput
//                         value={selectedTask.url} //TODO: fixing for deployment
//                         onChange={onChangeLinkRecommendation}
//                         placeholder='Enter URLs'
//                       ></TextInput>

//                       <div className='mt-6'>
//                         <PrimaryButton
//                           onClick={() => updateLinkRecomendation()}
//                         >
//                           Embed links
//                         </PrimaryButton>
//                       </div>
//                     </div>
//                     <div
//                       onClick={() => closeLinkRecomendation()}
//                       className='absolute -top-3 -right-3 cursor-pointer'
//                     >
//                       <CircleCloseIcon className='h-8 w-8' />
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>

//             <Transition
//               show={showCommentInput}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog
//                 onClose={() => closeCommentInput()}
//                 className='relative z-50'
//               >
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white pt-4 pb-5 lg:max-w-xl'>
//                     <Dialog.Title className='flex items-center justify-between px-8 pb-4 text-lg'>
//                       <div className='text-lg font-medium'>
//                         {selectedTask.name}
//                       </div>
//                     </Dialog.Title>
//                     <div className='w-full border-b border-[#DEE0E0]'></div>
//                     {taskComments.length > 0 && (
//                       <div>
//                         <div className='z-50 flex max-h-48 flex-col gap-2 overflow-y-auto pt-6 md:max-h-80'>
//                           {taskComments.map((item, index) => (
//                             <div key={index}>
//                               <div>
//                                 <div className='group relative cursor-default overflow-visible px-4 py-3 transition-all duration-300 hover:bg-gray-task'>
//                                   <div className='flex items-start gap-3'>
//                                     <Image
//                                       src={
//                                         item.user?.profile_picture ||
//                                         'https://ui-avatars.com/api/?name=' +
//                                           item.user?.fullname
//                                       }
//                                       alt='Picture of the author'
//                                       width={40}
//                                       height={40}
//                                       className='rounded-full'
//                                     />
//                                     <div className='flex w-full flex-col'>
//                                       <div className='flex items-center gap-2'>
//                                         <h6 className='text-md font-avenir font-medium text-dark-navbar'>
//                                           @{item.user?.username}
//                                         </h6>
//                                         <Moment
//                                           className='text-xs text-gray-mark_notification'
//                                           date={item.created_at}
//                                           format='DD, MMM HH:mm'
//                                         />
//                                       </div>
//                                       <h6 className='text-gray-message_notification'>
//                                         {item.content}
//                                       </h6>
//                                       <div className='mt-1 flex'>
//                                         {item?.replies_count > 0 &&
//                                           (item.is_show_full_reply ? (
//                                             <h6
//                                               onClick={() =>
//                                                 onShowFullReplies(item)
//                                               }
//                                               className='cursor-pointer text-sm text-gray-mark_notification'
//                                             >
//                                               Balasan ({item.replies_count})
//                                             </h6>
//                                           ) : (
//                                             <h6
//                                               onClick={() =>
//                                                 onShowFullReplies(item)
//                                               }
//                                               className='cursor-pointer text-sm text-gray-mark_notification'
//                                             >
//                                               Lihat Balasan (
//                                               {item.replies_count})
//                                             </h6>
//                                           ))}
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div className='absolute -top-4 right-1 z-[2000] hidden transition-all duration-300 group-hover:block hover:block'>
//                                     <div className='flex items-center rounded-[10px] border border-[#DEE0E0] bg-white p-1'>
//                                       <Tippy content='Reply'>
//                                         <div
//                                           onClick={() => wantReplyComment(item)}
//                                           className='cursor-pointer rounded-[12px] p-1.5 hover:bg-gray-task'
//                                         >
//                                           <ReplyIcon className='h-4 w-4 text-gray-message_notification' />
//                                         </div>
//                                       </Tippy>
//                                       <Tippy content='Delete'>
//                                         <div
//                                           onClick={() => deleteComment(item)}
//                                           className='cursor-pointer rounded-[12px] p-1.5 hover:bg-gray-task'
//                                         >
//                                           <DeleteIcon className='h-4 w-4 text-gray-message_notification' />
//                                         </div>
//                                       </Tippy>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className='flex flex-col'>
//                                   {item.replies &&
//                                     item.replies.map((reply, indexRep) => (
//                                       <div
//                                         key={indexRep}
//                                         className='group relative cursor-default overflow-visible rounded-md px-4 py-3 pl-16 transition-all duration-300 hover:bg-gray-task'
//                                       >
//                                         <div className='flex items-start gap-3'>
//                                           <Image
//                                             src={
//                                               reply.user?.profile_picture ||
//                                               'https://ui-avatars.com/api/?name=' +
//                                                 reply.user?.fullname
//                                             }
//                                             alt='Picture of the author'
//                                             width={40}
//                                             height={40}
//                                             className='rounded-full'
//                                           />
//                                           <div className='flex w-full flex-col'>
//                                             <div className='flex items-center gap-2'>
//                                               <h6 className='text-md font-avenir font-medium text-dark-navbar'>
//                                                 @{reply.user?.username}
//                                               </h6>
//                                               <Moment
//                                                 className='text-xs text-gray-mark_notification'
//                                                 date={reply.created_at}
//                                                 format='DD, MMM HH:mm'
//                                               />
//                                             </div>
//                                             <h6 className='text-gray-message_notification'>
//                                               {reply.content}
//                                             </h6>
//                                           </div>
//                                         </div>
//                                         <div className='absolute -top-4 right-1 z-[2000] hidden transition-all duration-300 group-hover:block hover:block'>
//                                           <div className='flex items-center rounded-[10px] border border-[#DEE0E0] bg-white p-1'>
//                                             {/* <Tippy content='Reply'>
//                                               <div
//                                                 onClick={() =>
//                                                   wantReplyComment(reply)
//                                                 }
//                                                 className='cursor-pointer rounded-[12px] p-1.5 hover:bg-gray-task'
//                                               >
//                                                 <ReplyIcon className='h-4 w-4 text-gray-message_notification' />
//                                               </div>
//                                             </Tippy> */}
//                                             <Tippy content='Delete'>
//                                               <div
//                                                 onClick={() =>
//                                                   deleteComment(reply)
//                                                 }
//                                                 className='cursor-pointer rounded-[12px] p-1.5 hover:bg-gray-task'
//                                               >
//                                                 <DeleteIcon className='h-4 w-4 text-gray-message_notification' />
//                                               </div>
//                                             </Tippy>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     ))}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                         <div className='w-full border-b border-[#DEE0E0]'></div>
//                       </div>
//                     )}
//                     <div className='flex w-full max-w-xl items-center gap-4 px-6 pt-3'>
//                       <div className='flex flex-auto items-center'>
//                         {isMentionReplyComment && (
//                           <div>
//                             <span className='font-medium'>
//                               @{selectedReplyComment?.user?.username}
//                             </span>
//                           </div>
//                         )}
//                         <input
//                           type='text'
//                           ref={input_comment}
//                           value={commentInput}
//                           onChange={(e) => onChangeComment(e)}
//                           onKeyDown={(e) => onKeyDownComment(e, false)}
//                           placeholder={
//                             isMentionReplyComment
//                               ? ''
//                               : "Type '@' to mention or add a comment..."
//                           }
//                           className='w-full flex-auto border-none focus:border-none focus:ring-0'
//                         />
//                       </div>
//                       <div>
//                         <BoldSendIcon
//                           className='h-6 w-6 cursor-pointer text-primary-green'
//                           onClick={() => addNewComment()}
//                         ></BoldSendIcon>
//                       </div>
//                     </div>
//                     <div
//                       onClick={() => closeCommentInput()}
//                       className='absolute -top-3 -right-3 cursor-pointer'
//                     >
//                       <CircleCloseIcon className='h-8 w-8' />
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>

//             <Transition
//               show={showTaskDetail}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog
//                 onClose={() => closeTaskDetail()}
//                 className='relative z-50'
//               >
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white pt-4 pb-8 lg:max-w-xl'>
//                     <Dialog.Title className='flex items-center justify-between px-8 pb-[20px] text-lg'>
//                       <div className='text-lg font-medium'>{goal.name}</div>
//                       <div className='flex gap-[25px]'>
//                         <IoIosArrowUp
//                           className={clsxm(
//                             'cursor-pointer',
//                             selectedTaskIndex > 0
//                               ? 'text-primary-green'
//                               : 'text-gray-message_notification/58'
//                           )}
//                           onClick={selectPrevTask}
//                         />
//                         <IoIosArrowDown
//                           className={clsxm(
//                             'cursor-pointer',
//                             selectedTaskIndex < tasks.length - 1
//                               ? 'text-primary-green'
//                               : 'text-gray-message_notification/58'
//                           )}
//                           onClick={selectNextTask}
//                         />
//                         <HiDotsHorizontal className='text-[#B7B7B7]' />
//                       </div>
//                     </Dialog.Title>
//                     <div className='w-full border-b border-[#DEE0E0]'></div>
//                     <div className='flex w-full max-w-xl items-start gap-6 px-8 pt-6'>
//                       <Checkbox
//                         checked={selectedTask.checked}
//                         onChange={(e) => updateCheckSeletedTask(e)}
//                         checkClassName='w-6 h-6 border-primary-green mt-2 rounded-md border-2 cursor-pointer'
//                       />

//                       <div className='w-full'>
//                         <h1 className='flex items-start font-sans text-lg font-normal lg:text-xl'>
//                           {selectedTask.name}
//                         </h1>
//                         <p className='mt-6 text-[18px] text-dark/58'>
//                           {selectedTask.description
//                             ? selectedTask.description
//                             : 'No description'}
//                         </p>
//                         <div className='item-center mt-[33px] flex gap-2'>
//                           {selectedTask.deadline && (
//                             <div className='flex items-center gap-1 rounded-full border border-gray-border py-1 px-2'>
//                               <CalendarIcon className='h-4 w-4' />
//                               <h6 className='text-sm'>
//                                 <Moment
//                                   date={selectedTask.deadline}
//                                   format='DD MMM YYYY'
//                                 />
//                               </h6>
//                             </div>
//                           )}
//                           {selectedTask.repeat && (
//                             <div className='flex items-center gap-1 rounded-full border border-gray-border py-1 px-2'>
//                               <IoRepeat />
//                               <h6 className='text-sm'>
//                                 {selectedTask.repeat == 'week'
//                                   ? translate('every week')
//                                   : selectedTask.repeat == 'day'
//                                   ? translate('every day')
//                                   : selectedTask.repeat == 'year'
//                                   ? translate('every year')
//                                   : selectedTask.repeat == 'month'
//                                   ? translate('every month')
//                                   : selectedTask.repeat}
//                               </h6>
//                             </div>
//                           )}
//                           {selectedTask.url && (
//                             <div className='flex items-center gap-1 rounded-full border border-gray-border py-1 px-2'>
//                               <MdLink />
//                               <h6 className='text-sm'>{selectedTask.url}</h6>
//                             </div>
//                           )}
//                         </div>
//                         <div className='mt-6 w-full border-b border-[#DEE0E0]'></div>
//                         {isCommentLoading && (
//                           <div className='mt-3 flex w-full flex-col gap-3'>
//                             <Skeleton className='h-8 w-full'></Skeleton>
//                             <Skeleton className='h-8 w-8'></Skeleton>
//                           </div>
//                         )}
//                         {!isCommentLoading && taskComments.length > 0 && (
//                           <div className='mt-3 flex flex-col gap-1'>
//                             <h6 className='text-sm font-medium text-dark/58'>
//                               Comments ({taskComments.length})
//                             </h6>
//                             <div className='mt-3 flex max-h-48 flex-col gap-4 overflow-y-auto'>
//                               {taskComments.map((item, index) => (
//                                 <div
//                                   key={index}
//                                   className='flex items-start gap-3'
//                                 >
//                                   <Image
//                                     src={
//                                       item.user?.profile_picture ||
//                                       'https://ui-avatars.com/api/?name=' +
//                                         item.user?.fullname
//                                     }
//                                     alt='Picture of the author'
//                                     width={48}
//                                     height={48}
//                                     className='rounded-full'
//                                   />
//                                   <div className='flex flex-col'>
//                                     <div className='flex items-center'>
//                                       <h6 className='text-md font-medium'>
//                                         @{item.user?.username}
//                                       </h6>
//                                       {/* <h6>{item.created_at}</h6> */}
//                                     </div>
//                                     <h6 className='text-gray-message_notification'>
//                                       {item.content}
//                                     </h6>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         <div className='mt-[31px] flex gap-4'>
//                           <Image
//                             src='https://ui-avatars.com/api/?name=John+Doe'
//                             alt='Picture of the author'
//                             width={49}
//                             height={49}
//                             className='rounded-full'
//                           />
//                           <TextInput
//                             value={commentInput}
//                             onChange={(e) => onChangeComment(e)}
//                             onKeyDown={(e) => onKeyDownComment(e)}
//                             placeholder='Comment...'
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       onClick={() => closeTaskDetail()}
//                       className='absolute -top-3 -right-3 cursor-pointer'
//                     >
//                       <CircleCloseIcon className='h-8 w-8' />
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>

//             <Transition
//               show={showDeleteTask}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog
//                 onClose={() => closeDeleteTask()}
//                 className='relative z-50'
//               >
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white px-8 pt-6 pb-8'>
//                     <Dialog.Title className='text-center text-xl font-bold text-gray-message_notification'>
//                       Delete Task
//                     </Dialog.Title>
//                     <div className='mt-6 flex w-full max-w-xl flex-col'>
//                       <h6 className='mt-2 w-full text-center text-gray-message_notification'>
//                         Amet minim mollit non deserunt ullamco est sit aliqua
//                         dolor do amet sint. Velit officia consequat duis enim
//                         velit mollit. Exercitation veniam consequat sunt nostrud
//                         amet.
//                       </h6>
//                       <div className='mt-8 flex w-full items-center justify-center gap-3'>
//                         <div
//                           onClick={() => closeDeleteTask()}
//                           className='cursor-pointer py-2 px-4'
//                         >
//                           <h6>Cancel</h6>
//                         </div>
//                         <div onClick={() => submitDeleteTask()}>
//                           <DangerButton>Delete task</DangerButton>
//                         </div>
//                       </div>
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>
//             <Transition
//               show={showDeleteGoal}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog
//                 onClose={() => closeDeleteGoal()}
//                 className='relative z-50'
//               >
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white px-8 pt-6 pb-8'>
//                     <Dialog.Title className='text-center text-xl font-bold text-gray-message_notification'>
//                       Delete Goals
//                     </Dialog.Title>
//                     <div className='mt-6 flex w-full max-w-xl flex-col'>
//                       <h6 className='mt-2 w-full text-center text-gray-message_notification'>
//                         Amet minim mollit non deserunt ullamco est sit aliqua
//                         dolor do amet sint. Velit officia consequat duis enim
//                         velit mollit. Exercitation veniam consequat sunt nostrud
//                         amet.
//                       </h6>
//                       <div className='mt-8 flex w-full items-center justify-center gap-3'>
//                         <div
//                           onClick={() => closeDeleteGoal()}
//                           className='cursor-pointer py-2 px-4'
//                         >
//                           <h6>Cancel</h6>
//                         </div>
//                         <div onClick={() => submitDeleteGoal()}>
//                           <DangerButton>Delete goals</DangerButton>
//                         </div>
//                       </div>
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>

//             <Transition
//               show={showTaskMember}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog
//                 onClose={() => closeShowTaskMember()}
//                 className='relative z-50'
//               >
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white px-8 pt-4 pb-8'>
//                     <Dialog.Title className='text-lg font-bold'>
//                       Invite to Task
//                     </Dialog.Title>
//                     <div className='mt-6 flex w-full max-w-xl flex-col'>
//                       <TextInput
//                         value={searchTaskInvite} //TODO: fixing for deployment
//                         onChange={onChangeTaskInviteMember}
//                         placeholder='Invite with email and username...'
//                         autoComplete='off'
//                       ></TextInput>

//                       <div className='mt-3'>
//                         <PrimaryButton onClick={() => sendTaskInvite()}>
//                           Send Invites
//                         </PrimaryButton>
//                       </div>
//                       {taskMember &&
//                         taskMember.filter(
//                           (item) => item.goal_member?.is_confirmed
//                         ).length > 0 && (
//                           <div className='mt-4 flex flex-col gap-3'>
//                             <h6 className='text-md font-medium text-gray-message_notification/58'>
//                               Group members(
//                               {
//                                 taskMember.filter(
//                                   (item) => item.goal_member?.is_confirmed
//                                 ).length
//                               }
//                               )
//                             </h6>
//                             <div className='flex flex-col gap-3'>
//                               {taskMember
//                                 .filter(
//                                   (item) => item.goal_member?.is_confirmed
//                                 )
//                                 .map((item, index) => (
//                                   <div
//                                     key={index}
//                                     className='flex items-center gap-3'
//                                   >
//                                     <div className='h-11 w-11 rounded-full bg-primary-green'>
//                                       <Image
//                                         src={
//                                           item.goal_member &&
//                                           item.goal_member.user &&
//                                           item.goal_member.user.profile_picture
//                                             ? item.goal_member.user
//                                                 .profile_picture
//                                             : 'https://ui-avatars.com/api/?name=' +
//                                               item.goal_member.user.fullname
//                                         }
//                                         alt='notification-photo'
//                                         className='h-11 w-11 flex-none rounded-full'
//                                         width={40}
//                                         height={40}
//                                       />
//                                     </div>
//                                     <div className='flex flex-auto flex-col'>
//                                       <div className='text-medium text-md text-gray-message_notification'>
//                                         {item.goal_member.user.fullname}
//                                       </div>
//                                       <h6 className='text-md text-gray-message_notification/58'>
//                                         @{item.goal_member.user.username}
//                                       </h6>
//                                     </div>
//                                     {item.goal_member.role === 'owner' && (
//                                       <div className='text-primary-green'>
//                                         {item.goal_member.role}
//                                       </div>
//                                     )}
//                                     {item.goal_member &&
//                                       item.goal_member.role !== 'owner' &&
//                                       item.goal_member.id && (
//                                         <div
//                                           className='cursor-pointer text-sm font-medium text-gray-message_notification/58'
//                                           onClick={() =>
//                                             unassignTaskMember(
//                                               item.goal_member?.id
//                                             )
//                                           }
//                                         >
//                                           Delete
//                                         </div>
//                                       )}
//                                   </div>
//                                 ))}
//                             </div>
//                           </div>
//                         )}
//                     </div>
//                     <div
//                       onClick={() => closeShowTaskMember()}
//                       className='absolute -top-3 -right-3 cursor-pointer'
//                     >
//                       <CircleCloseIcon className='h-8 w-8' />
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>

//             <Transition
//               show={showInviteMember}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog onClose={() => closeInvite()} className='relative z-50'>
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white px-8 pt-4 pb-8'>
//                     <Dialog.Title className='text-lg font-bold'>
//                       Invite to goals
//                     </Dialog.Title>
//                     <div className='mt-6 flex w-full max-w-xl flex-col'>
//                       <TextInput
//                         value={searchInvite} //TODO: fixing for deployment
//                         onChange={onChangeInviteMember}
//                         placeholder='Invite with email and username...'
//                       ></TextInput>

//                       <div className='mt-6'>
//                         <PrimaryButton onClick={() => sendInvite()}>
//                           Send Invites
//                         </PrimaryButton>
//                       </div>
//                       {goalMember &&
//                         goalMember.filter((item) => item.is_confirmed).length >
//                           0 && (
//                           <div className='mt-4 flex flex-col gap-3'>
//                             <h6 className='text-md font-medium text-gray-message_notification/58'>
//                               Member goals(
//                               {
//                                 goalMember.filter((item) => item.is_confirmed)
//                                   .length
//                               }
//                               )
//                             </h6>
//                             <div className='flex flex-col gap-3'>
//                               {goalMember
//                                 .filter((item) => item.is_confirmed)
//                                 .map((item, index) => (
//                                   <div
//                                     key={index}
//                                     className='flex items-center gap-3'
//                                   >
//                                     <div className='h-11 w-11 rounded-full bg-primary-green'>
//                                       <Image
//                                         src={
//                                           item.user && item.user.profile_picture
//                                             ? item.user.profile_picture
//                                             : 'https://ui-avatars.com/api/?name=' +
//                                               item.user?.fullname
//                                         }
//                                         alt='notification-photo'
//                                         className='h-11 w-11 flex-none rounded-full'
//                                         width={40}
//                                         height={40}
//                                       />
//                                     </div>
//                                     <div className='flex flex-auto flex-col'>
//                                       <div className='text-medium text-md text-gray-message_notification'>
//                                         {item.user?.fullname}
//                                       </div>
//                                       <h6 className='text-md text-gray-message_notification/58'>
//                                         @{item.user?.username}
//                                       </h6>
//                                     </div>
//                                     {item.role === 'owner' && (
//                                       <div className='text-primary-green'>
//                                         {item.role}
//                                       </div>
//                                     )}
//                                     {item.role !== 'owner' && (
//                                       <div className='relative'>
//                                         <Menu>
//                                           {({ open }) => (
//                                             <>
//                                               <Menu.Button className='flex items-center gap-2 p-2'>
//                                                 <div className='capitalize'>
//                                                   {item.role}
//                                                 </div>
//                                                 <MdExpandMore
//                                                   className={clsxm(
//                                                     'text-xl transition-all duration-300',
//                                                     open ? 'rotate-180' : ''
//                                                   )}
//                                                 />
//                                               </Menu.Button>

//                                               <Menu.Items className='absolute top-8 flex max-h-36 w-full flex-col gap-2 overflow-hidden overflow-y-auto rounded-md bg-white p-2 shadow-xl'>
//                                                 {goalMemberRole.map((role) => (
//                                                   <Menu.Item key={role.value}>
//                                                     {({ close }) => (
//                                                       <div
//                                                         className='cursor-pointer p-2'
//                                                         onClick={() =>
//                                                           onChangeMemberRole(
//                                                             item,
//                                                             role.value,
//                                                             close
//                                                           )
//                                                         }
//                                                       >
//                                                         {role.label}
//                                                       </div>
//                                                     )}
//                                                   </Menu.Item>
//                                                 ))}
//                                               </Menu.Items>
//                                             </>
//                                           )}
//                                         </Menu>
//                                       </div>
//                                     )}
//                                   </div>
//                                 ))}
//                             </div>
//                           </div>
//                         )}
//                       {goalMember &&
//                         goalMember.filter((item) => !item.is_confirmed).length >
//                           0 && (
//                           <div className='mt-4 flex flex-col gap-3'>
//                             <h6 className='text-md font-medium text-gray-message_notification/58'>
//                               Delayed(
//                               {
//                                 goalMember.filter((item) => !item.is_confirmed)
//                                   .length
//                               }
//                               )
//                             </h6>
//                             <div className='flex flex-col gap-3'>
//                               {goalMember
//                                 .filter((item) => !item.is_confirmed)
//                                 .map((item, index) => (
//                                   <div
//                                     key={index}
//                                     className='flex items-center gap-3'
//                                   >
//                                     <div className='h-11 w-11 rounded-full bg-primary-green'>
//                                       <Image
//                                         src={
//                                           item.user && item.user.profile_picture
//                                             ? item.user.profile_picture
//                                             : 'https://ui-avatars.com/api/?name=' +
//                                               item.user?.fullname
//                                         }
//                                         alt='notification-photo'
//                                         className='h-11 w-11 flex-none rounded-full'
//                                         width={40}
//                                         height={40}
//                                       />
//                                     </div>
//                                     <div className='flex flex-auto flex-col'>
//                                       <div className='text-medium text-md text-gray-message_notification'>
//                                         {item.user?.fullname}
//                                       </div>
//                                       <h6 className='text-md text-gray-message_notification/58'>
//                                         @{item.user?.username}
//                                       </h6>
//                                     </div>
//                                     {item.role === 'owner' && (
//                                       <div className='text-primary'>
//                                         {item.role}
//                                       </div>
//                                     )}
//                                     {item.role !== 'owner' && (
//                                       <div className='relative'>
//                                         <Menu>
//                                           {({ open }) => (
//                                             <>
//                                               <Menu.Button className='flex items-center gap-2 p-2'>
//                                                 <div className='capitalize'>
//                                                   {item.role}
//                                                 </div>
//                                                 <MdExpandMore
//                                                   className={clsxm(
//                                                     'text-xl transition-all duration-300',
//                                                     open ? 'rotate-180' : ''
//                                                   )}
//                                                 />
//                                               </Menu.Button>

//                                               <Menu.Items className='absolute top-8 flex max-h-36 w-full flex-col gap-2 overflow-hidden overflow-y-auto rounded-md bg-white p-2 shadow-xl'>
//                                                 {goalMemberRole.map((role) => (
//                                                   <Menu.Item key={role.value}>
//                                                     {({ close }) => (
//                                                       <div
//                                                         className='cursor-pointer p-2'
//                                                         onClick={() =>
//                                                           onChangeMemberRole(
//                                                             item,
//                                                             role.value,
//                                                             close
//                                                           )
//                                                         }
//                                                       >
//                                                         {role.label}
//                                                       </div>
//                                                     )}
//                                                   </Menu.Item>
//                                                 ))}
//                                               </Menu.Items>
//                                             </>
//                                           )}
//                                         </Menu>
//                                       </div>
//                                     )}
//                                   </div>
//                                 ))}
//                             </div>
//                           </div>
//                         )}
//                     </div>
//                     <div
//                       onClick={() => closeInvite()}
//                       className='absolute -top-3 -right-3 cursor-pointer'
//                     >
//                       <CircleCloseIcon className='h-8 w-8' />
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>
//           </div>
//           <div className=''>
//             <Transition
//               show={EditGoalModal}
//               enter='transition duration-100 ease-out'
//               enterFrom='transform scale-95 opacity-0'
//               enterTo='transform scale-100 opacity-100'
//               leave='transition duration-75 ease-out'
//               leaveFrom='transform scale-100 opacity-100'
//               leaveTo='transform scale-95 opacity-0'
//               as='div'
//             >
//               <Dialog
//                 onClose={() => closeEditGoalModal()}
//                 className='relative z-50'
//               >
//                 {/* The backdrop, rendered as a fixed sibling to the panel container */}
//                 <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

//                 {/* Full-screen container to center the panel */}
//                 <div className='fixed inset-0 flex items-center justify-center p-4'>
//                   {/* The actual dialog panel  */}
//                   <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white px-8 pt-4 pb-8'>
//                     <Dialog.Title className='text-center text-lg font-bold'>
//                       Edit Goals
//                     </Dialog.Title>
//                     <div className='mt-6 flex w-full max-w-xl flex-col items-center justify-center'>
//                       <div>
//                         <input
//                           type='file'
//                           id='File'
//                           onChange={handleFileChange}
//                           accept='image/*'
//                           hidden
//                         />
//                         <label
//                           htmlFor='File'
//                           className='flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-username bg-light-gray text-base text-[#11121294]'
//                         >
//                           {form.file && (
//                             <div>
//                               <Image
//                                 src={getFileUrl()}
//                                 alt='goal photo'
//                                 width='60'
//                                 height='60'
//                                 style={{
//                                   objectFit: 'cover',
//                                 }}
//                               />
//                             </div>
//                           )}
//                           {!form.file && (
//                             <BoldCameraIcon className='h-7 w-7 text-gray-username' />
//                           )}
//                         </label>
//                       </div>

//                       <div className='mt-3 flex w-full flex-col gap-1 font-medium'>
//                         <label className='text-md'>Title Goal</label>
//                         <TextInput
//                           type='text'
//                           value={form.title}
//                           onChange={updateTitleGoal}
//                         ></TextInput>
//                       </div>
//                       <div className='mt-3 flex w-full flex-col gap-1 font-medium'>
//                         <label className='text-md'>Goal description</label>
//                         <TextAreaInput
//                           type='text'
//                           value={form.description}
//                           onChange={updateDescriptionGoal}
//                         ></TextAreaInput>
//                       </div>
//                       <div className='mt-3 w-full'>
//                         <PrimaryButton
//                           onClick={() => submitEditGoal()}
//                           btnClassName='w-full'
//                         >
//                           Save Goal Changes
//                         </PrimaryButton>
//                       </div>
//                     </div>
//                     <div
//                       onClick={() => closeEditGoalModal()}
//                       className='absolute -top-3 -right-3 cursor-pointer'
//                     >
//                       <CircleCloseIcon className='h-8 w-8' />
//                     </div>
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </Transition>
//           </div>
//           {toastData && toastData.title !== '' && toastData.type && (
//             <Toast
//               toastMessage={toastData.message}
//               type={toastData.type}
//               toastTitle={toastData.title}
//               interval={toastData.interval}
//             />
//           )}
//         </main>
//       </AuthenticatedLayout>
//     </>
//   );
// }
