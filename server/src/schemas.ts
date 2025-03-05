import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().default('Untitled'),
  content: z.string().default('')
})

export const editNoteSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string()
})

export const deleteNoteSchema = z.coerce.number()