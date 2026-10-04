const db = require("../config/database.js");

const {
  CREATE_STUDENT_ATTENDANCE,
  FIND_ALL_STUDENT_ATTENDANCES,
  FIND_STUDENT_ATTENDANCE_BY_ID,
  FIND_STUDENT_ATTENDANCES_BY_STUDENT_ID,
  FIND_STUDENT_ATTENDANCES_BY_COMPUTER_ID,
  UPDATE_STUDENT_ATTENDANCE,
  DELETE_STUDENT_ATTENDANCE,
} = require("../database/queries/student_attendances-query.js");

// CREATE
const createStudentAttendance = async (student_id, computer_id, attendance_date, time_in, time_out, purpose) => {
  if (!student_id || !computer_id || !attendance_date || !time_in || !purpose) {
    throw new Error("Student ID, computer ID, attendance date, time in, and purpose are required.");
  }

  const [result] = await db.query(CREATE_STUDENT_ATTENDANCE, [
    student_id,
    computer_id,
    attendance_date,
    time_in,
    time_out,
    purpose,
  ]);

  return result;
};

// READ - Get all student attendances
const findAllStudentAttendances = async () => {
  const [rows] = await db.query(FIND_ALL_STUDENT_ATTENDANCES);

  return rows;
};

// READ - Get student attendance by ID
const findStudentAttendanceById = async (id) => {
  if (!id) {
    throw new Error("Attendance ID is required.");
  }

  const [rows] = await db.query(FIND_STUDENT_ATTENDANCE_BY_ID, [id]);

  return rows[0] || null;
};

// READ - Get attendances by student ID
const findStudentAttendancesByStudentId = async (student_id) => {
  if (!student_id) {
    throw new Error("Student ID is required.");
  }

  const [rows] = await db.query(FIND_STUDENT_ATTENDANCES_BY_STUDENT_ID, [student_id]);

  return rows;
};

// READ - Get attendances by computer ID
const findStudentAttendancesByComputerId = async (computer_id) => {
  if (!computer_id) {
    throw new Error("Computer ID is required.");
  }

  const [rows] = await db.query(FIND_STUDENT_ATTENDANCES_BY_COMPUTER_ID, [computer_id]);

  return rows;
};

// UPDATE
const updateStudentAttendance = async (id, student_id, computer_id, attendance_date, time_in, time_out, purpose) => {
  if (!id) {
    throw new Error("Attendance ID is required.");
  }

  if (!student_id || !computer_id || !attendance_date || !time_in || !purpose) {
    throw new Error("Student ID, computer ID, attendance date, time in, and purpose are required.");
  }

  const [result] = await db.query(UPDATE_STUDENT_ATTENDANCE, [
    student_id,
    computer_id,
    attendance_date,
    time_in,
    time_out,
    purpose,
    id,
  ]);

  return result;
};

// DELETE
const deleteStudentAttendance = async (id) => {
  if (!id) {
    throw new Error("Attendance ID is required.");
  }

  const [result] = await db.query(DELETE_STUDENT_ATTENDANCE, [id]);

  return result;
};

module.exports = {
  createStudentAttendance,
  findAllStudentAttendances,
  findStudentAttendanceById,
  findStudentAttendancesByStudentId,
  findStudentAttendancesByComputerId,
  updateStudentAttendance,
  deleteStudentAttendance,
};
