import Dexie from 'dexie'

export const db = new Dexie('stitches');

db.version(1).stores({
  projects: '++project_id,project_name',
  counters: '++counter_id, project_id, label, stitch_count'
})