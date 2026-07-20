import 'fake-indexeddb/auto'
import { expect, test, beforeEach } from 'vitest'
import { db, addNote, getNotes, importNotes } from './index.js'

beforeEach(() => db.notes.clear())

test('import merges valid notes and drops junk', async () => {
  await addNote(1, 'keep me')
  const count = await importNotes(
    JSON.stringify([
      { id: 1, value: 'overwritten' },
      { id: 2, value: 'new' },
      { id: 3 },
      null
    ])
  )

  expect(count).toBe(2)
  const notes = (await getNotes()).sort((a, b) => a.id - b.id)
  expect(notes).toEqual([
    { id: 1, value: 'overwritten' },
    { id: 2, value: 'new' }
  ])
})

test('import rejects a file that is not an array', async () => {
  await expect(importNotes('{"id":1}')).rejects.toThrow('Invalid backup file')
})
