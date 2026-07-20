import Dexie from 'dexie'

export const db = new Dexie('notes')
db.version(1).stores({ notes: 'id' })

export const getNotes = () => db.notes.orderBy('id').reverse().toArray()
export const addNote = (id, value) => db.notes.add({ id: Number(id), value })
export const saveNote = (id, value) => db.notes.put({ id: Number(id), value })
export const removeNote = (id) => db.notes.delete(Number(id))
export const deleteAll = () => db.notes.clear()

export async function exportNotes() {
  return JSON.stringify(await getNotes())
}

// Merge import: bulkPut overwrites records whose id already exists and adds
// the rest. Existing notes not present in the file are kept untouched
export async function importNotes(json) {
  const data = JSON.parse(json)
  if (!Array.isArray(data)) throw new Error('Invalid backup file')
  const notes = data
    .filter((n) => n && n.id != null && typeof n.value === 'string')
    .map((n) => ({ id: Number(n.id), value: n.value }))
  await db.notes.bulkPut(notes)
  return notes.length
}
