import { Hono } from 'hono'
import type { Context, Env } from 'hono';

import { notes } from './db/schema';
import { connectDB } from './db/connect';

import { createNoteSchema, editNoteSchema, deleteNoteSchema } from './schemas';

import { eq } from 'drizzle-orm';

interface AppEnv extends Env {
  Bindings: {
    DB: D1Database
  }
}

const app = new Hono<AppEnv>()

app.get('/notes' , async (c:Context<AppEnv>) => {
  try {
    const db = connectDB(c.env.DB)
    const result = await db.select().from(notes).all()
    console.log(result)

    c.status(200)
    return c.json({
      notes: result
    })
  } catch (e) {
    console.log(e)

    c.status(500)
    return c.json({
      error: 'An error occurred when getting all notes '
    })
  }
})

app.post('/notes' , async (c:Context<AppEnv>) => {
  try {
    const newNote = createNoteSchema.parse(await c.req.json())

    const db = connectDB(c.env.DB)
    const result = await db.insert(notes).values(newNote)
    console.log(result)

    c.status(201)
    return c.json({
      created: result.success
    })
  } catch (e) {
    console.log(e)

    c.status(500)
    return c.json({
      error: 'An error occurred when getting all notes '
    })
  }
})

app.patch('/notes', async(c:Context<AppEnv>) => {
  try {
    const {id, ...editedNote} = editNoteSchema.parse(await c.req.json())

    const db = connectDB(c.env.DB)
    const matchedNotes = await db.select().from(notes).where(eq(notes.id,id))

    if (!matchedNotes.length) {
      c.status(404)
      return c.json({
        error: 'The note to be edited could not be found'
      })
    }

    const updatedNote = await db.update(notes).set(editedNote).where(eq(notes.id,id))
    
    c.status(200)
    return c.json({
      updated: updatedNote.success
    })
  } catch (e) {
    console.log(e)

    c.status(500)
    return c.json({
      error: 'An error occurred when getting all notes '
    })
  }
})

app.delete('/notes', async(c:Context<AppEnv>) => {
  try {
    const { id } = deleteNoteSchema.parse(await c.req.json())

    const db = connectDB(c.env.DB)
    const matchedNotes = await db.select().from(notes).where(eq(notes.id,id))

    if (!matchedNotes.length) {
      c.status(404)
      return c.json({
        error: 'The note to be deleted could not be found'
      })
    }

    const deletedNote = await db.delete(notes).where(eq(notes.id, id))
    
    c.status(200)
    return c.json({
      deleted: deletedNote.success
    })
  } catch (e) {
    console.log(e)

    c.status(500)
    return c.json({
      error: 'An error occurred when getting all notes '
    })
  }
})

export default app;