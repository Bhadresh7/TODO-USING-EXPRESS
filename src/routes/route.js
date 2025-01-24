const express = require("express");
const router = express.Router();
const {  addTodo, getAllTodos,getById,updateTodo,deleteTodo } = require("../controller/crud-controller");


router.post("/add",addTodo);
router.get("/getAll",getAllTodos)
router.get('/getById/:id',getById)
router.put('/update/:id',updateTodo)
router.delete('/delete/:id',deleteTodo)

module.exports = router;
