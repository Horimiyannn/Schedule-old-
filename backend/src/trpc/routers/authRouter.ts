//регістрація
//авторизація
//логаут



import { Jwt } from "jsonwebtoken";




// import { TRPCError } from '@trpc/server';
// import jwt from 'jsonwebtoken';
// import { createRouter } from '../createRouter';

// export const authRouter = createRouter()
//   .mutation('login', async ({ input, ctx }) => {
//     const { email, password } = input;
    
//     // Перевірка користувача в базі даних
//     const user = await ctx.prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user || user.password !== password) {
//       throw new TRPCError({
//         code: 'UNAUTHORIZED',
//         message: 'Invalid email or password',
//       });
//     }

//     // Генерація JWT токену
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
//       expiresIn: '1w', // Термін дії токену
//     });

//     // Відправлення токену в cookie
//     ctx.res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`);

//     return { message: 'Logged in successfully' };
//   });

