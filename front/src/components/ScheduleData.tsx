export interface Lesson {
  name: string;
  link: string;
  time: string;
  homework: string;
  task: string;
  notes: string;
}

export interface ScheduleItem {
  day: string;
  lessons: Lesson[];
}

export const scheduleData: ScheduleItem[] = [
  {
    day: "Понеділок",
    lessons: [
      {
        name: "Оркестрова практика",
        link: "https://meet.google.com/oxz-smzz-sbn",
        time: "16:10",
        homework: "/homework/orc",
        task: "test",
        notes: "/notes",
      },
      {
        name: " Синестетика",
        link: "https://us04web.zoom.us/j/2733973211?pwd=eodpwxtWGRr0yrkjHqgHiS06cAMXbW.1&omn=74308792215",
        time: "17:50",
        homework: "/homework/okn",
        task: "test",
        notes: "/notes",
      },
    ],
  },
  {
    day: "Вівторок",
    lessons: [
      {
        name: "English",
        link: "https://us04web.zoom.us/j/74829472339?pwd=SmhGeUErejY5ZmszSzJnWUh5Nk11QT09",
        time: "9:00 ",
        homework: "/homework/eng",
        task: "test",
        notes: "/notes",
      },
      {
        name: "Фортепіано",
        link: "",
        time: "13:40 ",
        homework: "",
        task: "test",
        notes: "/notes",
      },
    ],
  },
  {
    day: "Середа",
    lessons: [
      {
        name: "Критичне мислення",
        link: "https://us05web.zoom.us/j/81124238864?pwd=ljzVw3ypCaY9iFH5bqRN7eikcyF1po.1",
        time: "9:00 ",
        homework: "/homework/psy",
        task: "te234st",
        notes: "/notes",
      },
      // { name: " СОІ ", link: '/soi', time: '11:30', homework:"/homework/soi", task:"test", notes:'/notes'},
      {
        name: "ЧАП",
        link: "https://us05web.zoom.us/j/84314502009?pwd=aDh6LzVOOWtPOWtjbGI5Qk9DT2Mrdz09",
        time: "12:40",
        homework: "/homework/cap",
        task: "test",
        notes: "/notes",
      },
      {
        name: "Гармонія",
        link: "https://us05web.zoom.us/j/2294605471?pwd=ZU1CZzMxdEgzVlJDWEE5M29wWjdRZz09",
        time: "14:20",
        homework: "/homework/hmn",
        task: "test",
        notes: "/notes",
      },
      {
        name: "Пластична виразність",
        link: "https://meet.google.com/bqb-dfje-tgh",
        time: "16.10",
        homework: "",
        task: "",
        notes: "",
      },
    ],
  },
  {
    day: "Четвер",
    lessons: [
      {
        name: "Виховна година",
        link: "https://us05web.zoom.us/j/7217337276?pwd=QzNFUGVPQ0lkMjBnM2VNV2JrM2lsUT09",
        time: "12:40",
        homework: " ",
        task: "",
        notes: "/notes",
      },
      {
        name: " Музичний фольлор(лекція) ",
        link: "https://meet.google.com/tdo-xdng-rqv",
        time: "14:20",
        homework: "/homework/cnd",
        task: "te234st",
        notes: "/notes",
      },
      // { name: "Ансамбль", link:'/ans', time: '16:10', homework:"/homework/ans", task:"test", notes:'/notes'},
    ],
  },
  {
    day: "П'ятниця",
    lessons: [
      {
        name: "Оркестр",
        link: "https://meet.google.com/oxz-smzz-sbn",
        time: "10:40",
        homework: "/homework/orc",
        task: "test",
        notes: "/notes",
      },
      // { name: " Спец ", link: '/fah', time: '13:30', homework:"/homework/fah", task:"test", notes:'/notes'},
      {
        name: "Музичний фольклор(семінар) ",
        link: "https://meet.google.com/tdo-xdng-rqv",
        time: "13:30",
        homework: "/homework/fah",
        task: "test",
        notes: "/notes",
      },
    ],
  },
  { day: "Суббота", lessons: [] },
];
