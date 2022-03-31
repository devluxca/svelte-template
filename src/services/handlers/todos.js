// ADD HANDLERS TO CONNECT WITH BACKEND

export const creatingTodoHandler = (db) => db.todos.hook('creating', (primKey, obj, transaction) => {
    // MAKE REQUEST TO API AND UPDATE INDEXEDB
})