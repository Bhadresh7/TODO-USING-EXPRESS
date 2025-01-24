const { default: mongoose } = require("mongoose");
const Todo = require("../model/Todo");
//add todo
const addTodo = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { title, description } = req.body;

    // Validate that both fields are present
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: `${!title ? "Title" : "Description"} is required`,
      });
    }

    // Create a new todo document
    const todo = await Todo.create(req.body);
    return res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all todo
const getAllTodos = async (_, res) => {
  try {
    const data = await Todo.find();

    if (data.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Todos found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

//get todo by id
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Todo.findById(id);
    if (!data) {
      return res.status(200).json({
        success: true,
        message: `User not found with id ${id}`,
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "User found ",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//update to using id
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: `${!title ? "Title" : "Description"} is required`,
      });
    }
    const data = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//deleted to by id
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await Todo.findOneAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: `Todo not found with the id ${id}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addTodo, getAllTodos, getById, updateTodo, deleteTodo };
