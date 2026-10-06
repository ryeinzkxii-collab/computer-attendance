const studentService = require("../services/students-service.js");

// CREATE - Register a new student
const createStudent = async (req, res) => {
  try {
    const { grade_section_id, account_id, lastname, firstname, middlename, contact_no } = req.body;

    const result = await studentService.createStudent(
      grade_section_id,
      account_id,
      lastname,
      firstname,
      middlename,
      contact_no,
    );

    return res.status(201).json({
      success: true,
      message: "Student registered successfully.",
      data: {
        id: result.insertId,
        grade_section_id,
        account_id,
        lastname,
        firstname,
        middlename,
        contact_no,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create student record.",
    });
  }
};

// READ - Get all students
const findAllStudents = async (req, res) => {
  try {
    const students = await studentService.findAllStudents();

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch student records.",
    });
  }
};

// READ - Get student by ID
const findStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentService.findStudentById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve student record.",
    });
  }
};

// READ - Get student by account ID
const findStudentByAccountId = async (req, res) => {
  try {
    const { account_id } = req.params;

    const student = await studentService.findStudentByAccountId(account_id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student record not found for this account.",
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve student record.",
    });
  }
};

// UPDATE - Update student by ID
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade_section_id, account_id, lastname, firstname, middlename, contact_no } = req.body;

    const result = await studentService.updateStudent(
      id,
      grade_section_id,
      account_id,
      lastname,
      firstname,
      middlename,
      contact_no,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Student record not found or no changes made.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student record updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update student record.",
    });
  }
};

// DELETE - Delete student by ID
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentService.deleteStudent(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Student record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student record deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete student record.",
    });
  }
};

module.exports = {
  createStudent,
  findAllStudents,
  findStudentById,
  findStudentByAccountId,
  updateStudent,
  deleteStudent,
};
