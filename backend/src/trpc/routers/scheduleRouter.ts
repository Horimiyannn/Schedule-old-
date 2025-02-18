//показувати кожному юзеру свій розклад
//змінювати розклад
//видаляти розклад

// import { protectedProcedure, router } from "../trpc";
// import z from "zod"

// export const scheduleRouter = router({
//   getUserSchedule: protectedProcedure.query(async ({ ctx }) => {
//     const schedule = await ctx.prisma.lesson.findMany({
//       where: { userId: ctx.user.id },
//       include: { times: true },
//     });

//     return schedule;
//   }),
//   updateLesson: protectedProcedure
//     .input(
//       z.object({
//         lessonId: z.string(),
//         name: z.string().optional(),
//         link: z.string().optional(),
//         notes: z.string().optional(),
//       })
//     )
//     .mutation(async ({ ctx, input }) => {
      
//       const lesson = await ctx.prisma.lesson.findUnique({
//         where: { id: input.lessonId },
//       });

//       if (!lesson) {
//         throw new Error("Lesson not found");
//       }

//       if (lesson.userId !== ctx.user.id) {
//         throw new Error("You can only update your own lessons");
//       }

      
//       const updatedLesson = await ctx.prisma.lesson.update({
//         where: { id: input.lessonId },
//         data: {
//           name: input.name ?? lesson.name,
//           link: input.link ?? lesson.link,
//           notes: input.notes ?? lesson.notes,
//         },
//       });

//       return updatedLesson;
//     }),
//     deleteLesson: protectedProcedure
//     .input(z.string()) // Вхідне значення: тільки `lessonId`
//     .mutation(async ({ ctx, input }) => {
      
//       const lesson = await ctx.prisma.lesson.findUnique({
//         where: { id: input },
//       });

//       if (!lesson) {
//         throw new Error("Lesson not found");
//       }

//       if (lesson.userId !== ctx.user.id) {
//         throw new Error("You can only delete your own lessons");
//       }

//       // Видаляємо урок
//       await ctx.prisma.lesson.delete({
//         where: { id: input },
//       });

//       return { message: "Lesson deleted successfully" };
//     }),
// });
