import { z } from 'zod';

export const ProgramSchema = z.object({
  id: z.string(),
  title: z.string().nonempty(),
  duration: z.number().positive(),
  description: z.string().nonempty(),
  channelId: z.string().nonempty(),
  typeId: z.string().nonempty(),
  categoryId: z.number().positive(),
  videoUrl: z.string().url(),
});

export type Program = z.infer<typeof ProgramSchema>;

export const validateProgram = (program: Partial<Program>): Record<string, string | undefined> => {
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
