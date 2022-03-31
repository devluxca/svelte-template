// ADD HANDLERS TO CONNECT WITH BACKEND

export const creatingTodoHandler = (db) => db.todos.hook('creating', (primKey, obj, transaction) => {
    // MAKE REQUEST TO API AND UPDATE INDEXEDB
})

export const deletingTodoHandler = (db) => db.todos.hook('deleting', (primKey, obj, transaction) => {
    // MAKE REQUEST TO AP AND UPDATE INDEXEDB
})