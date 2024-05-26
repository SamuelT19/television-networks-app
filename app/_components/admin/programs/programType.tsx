import { z } from 'zod';

export const ProgramSchema = z.object({
  id:z.number().positive(),
  title: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(1),
  channelId: z.number().positive(),
  typeId: z.number().positive(),
  categoryId: z.number().positive(),
  videoUrl: z.string().url(),
  categoryName:z.string().optional(),
  typeName:z.string().optional(),
  channelName:z.string().optional(),
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
