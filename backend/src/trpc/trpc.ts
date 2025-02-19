// import { initTRPC } from "@trpc/server";
// import { Context } from "./context"; 

// const t = initTRPC.context<Context>().create();


// export const router = t.router;
// export const publicProcedure = t.procedure;
// export const middleware = t.middleware;

// export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
//     if (!ctx.user) {
//       throw new Error("Not authenticated");
//     }
//     return next({
//       ctx: { user: ctx.user },
//     });
//   });
  
import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  loginUser: trpc.procedure.query(() => {

  }),
  getSchedule: trpc.procedure.query(() => {
    const lessons = [{
      id: '1',
      name: "Антикорупція",
      link: "https://meet.google.com/fnm-awwv-ttn",
      time: "11:00",
      homework: "/homework/acd",
      task: "task",
      notes: "/notes",
      DOW: [1,2],
    },
    {
      id: '2',
      name: " Синестетика",
      link: "https://us04web.zoom.us/j/2733973211?pwd=eodpwxtWGRr0yrkjHqgHiS06cAMXbW.1&omn=74308792215",
      time: "17:50",
      homework: "/homework/okn",
      task: "test",
      notes: "/notes",
      DOW: [1],
    },
    {
      id: '3',
      name: "English",
      link: "https://us04web.zoom.us/j/74829472339?pwd=SmhGeUErejY5ZmszSzJnWUh5Nk11QT09",
      time: "9:00",
      homework: "/homework/eng",
      task: "test",
      notes: "/notes",
      DOW: [2],
    },
    {
      id: '4',
      name: "Фортепіано",
      link: "",
      time: "13:40",
      homework: "",
      task: "test",
      notes: "/notes",
      DOW: [2],
    },
    {
      id: '5',
      name: "Критичне мислення",
      link: "https://us05web.zoom.us/j/81124238864?pwd=ljzVw3ypCaY9iFH5bqRN7eikcyF1po.1",
      time: "9:00",
      homework: "/homework/psy",
      task: "te234st",
      notes: "/notes",
      DOW: [3],
    },
    {
      id: '6',
      name: "ЧАП",
      link: "https://us05web.zoom.us/j/84314502009?pwd=aDh6LzVOOWtPOWtjbGI5Qk9DT2Mrdz09",
      time: "12:40",
      homework: "/homework/cap",
      task: "test",
      notes: "/notes",
      DOW: [3],
    },
    {
      id: '7',
      name: "Гармонія",
      link: "https://us05web.zoom.us/j/2294605471?pwd=ZU1CZzMxdEgzVlJDWEE5M29wWjdRZz09",
      time: "14:20",
      homework: "/homework/hmn",
      task: "test",
      notes: "/notes",
      DOW: [3],
    },
    {
      id: '8',
      name: "Пластична виразність",
      link: "https://meet.google.com/bqb-dfje-tgh",
      time: "16.10",
      homework: "",
      task: "",
      notes: "",
      DOW: [3],
    },
    {
      id: '9',
      name: "Виховна година",
      link: "https://us05web.zoom.us/j/7217337276?pwd=QzNFUGVPQ0lkMjBnM2VNV2JrM2lsUT09",
      time: "12:40",
      homework: " ",
      task: "",
      notes: "/notes",
      DOW: [4],
    },
    {
      id: '10',
      name: " Музичний фольлор(лекція) ",
      link: "https://meet.google.com/tdo-xdng-rqv",
      time: "14:20",
      homework: "/homework/cnd",
      task: "te234st",
      notes: "/notes",
      DOW: [4],
    },
    {
      id: '11',
      name: "Оркестр",
      link: "https://meet.google.com/oxz-smzz-sbn",
      time: "10:40",
      homework: "/homework/orc",
      task: "test",
      notes: "/notes",
      DOW: [5],
    },
    {
      id: '12',
      name: "Музичний фольклор(семінар) ",
      link: "https://meet.google.com/tdo-xdng-rqv",
      time: "13:30",
      homework: "/homework/fah",
      task: "test",
      notes: "/notes",
      DOW: [5],
    },

  ]
    return {lessons}
  })
})

export type trpcRouter = typeof trpcRouter