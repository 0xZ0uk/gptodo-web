import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        task: z.string(),
        userId: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          task: input.task,
          priority: 4,
          description: input.description,
          userId: input.userId,
          completed: false,
        },
      });
    }),
  createSuggestions: publicProcedure
    .input(z.object({ tasks: z.array(z.string()), taskId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.suggestion.createMany({
        data: input.tasks.map((t) => ({
          taskId: input.taskId,
          name: t,
          completed: false,
        })),
      });
    }),
  completeSuggestion: publicProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.suggestion.update({
        where: {
          id: input.id,
        },
        data: {
          completed: input.completed,
        },
      });
    }),
  getAll: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          suggestions: true,
        },
      });
    }),
});
