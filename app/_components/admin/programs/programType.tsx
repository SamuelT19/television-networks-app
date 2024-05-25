import { z } from 'zod';

export const ProgramSchema = z.object({
  id: z.number().positive().optional(),
  title: z.string().min(1).optional(),
  duration: z.number().positive().optional(),
  description: z.string().min(1).optional(),
  channelId: z.number().positive().optional(),
  typeId: z.number().positive().optional(),
  categoryId: z.number().positive().optional(),
  videoUrl: z.string().url().optional(),
});

export type Program = z.infer<typeof ProgramSchema>;

export const validateProgram = (program: Partial<Program>): Record<string, string |number| undefined> => {
  try {
    ProgramSchema.parse(program);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string | undefined> = {};
      error.errors.forEach((err) => {
        if (err.path) {
          validationErrors[err.path[0]] = err.message;
        }
      });
      return validationErrors;
    }
    return {};
  }
};
