import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const lessons = [
   {
    name: "Оркестрова практика",
    link: "https://meet.google.com/oxz-smzz-sbn",
    time: "16:10",
    user: {
      connect: {
        id: "User1"
      }
    }
   }
    // // Add other lessons here
  ];

  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: lesson,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
