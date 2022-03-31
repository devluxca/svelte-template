import Dexie from 'dexie'
import { tables } from './tables'

import { creatingTodoHandler } from './handlers/todos'

export const db = new Dexie(process.env.DB_NAME)

db.version(1).stores(tables)

creatingTodoHandler(db)
