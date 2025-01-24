const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const {
  addTodo,
  getAllTodos,
  getById,
  updateTodo,
  deleteTodo,
} = require("../controller/crud-controller");

router.post("/add", authMiddleware, addTodo);
router.get("/getAll", authMiddleware, getAllTodos);
router.get("/getById/:id", authMiddleware, getById);
router.put("/update/:id", authMiddleware, updateTodo);
router.delete("/delete/:id", authMiddleware, deleteTodo);

module.exports = router;
