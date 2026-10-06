const studentAttendanceService = require("../services/student_attendances-service.js");

// CREATE - Record new student attendance
const createStudentAttendance = async (req, res) => {
  try {
    const { student_id, computer_id, attendance_date, time_in, time_out, purpose } = req.body;

    const result = await studentAttendanceService.createStudentAttendance(
      student_id,
      computer_id,
      attendance_date,
      time_in,
      time_out,
      purpose,
    );

    return res.status(201).json({
      success: true,
      message: "Attendance record created successfully.",
      data: {
        id: result.insertId,
        student_id,
        computer_id,
        attendance_date,
        time_in,
        time_out,
        purpose,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create attendance record.",
    });
  }
};

// READ - Get all attendance records
const findAllStudentAttendances = async (req, res) => {
  try {
    const attendances = await studentAttendanceService.findAllStudentAttendances();

    return res.status(200).json({
      success: true,
      count: attendances.length,
      data: attendances,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch attendance records.",
    });
  }
};

// READ - Get single attendance record by ID
const findStudentAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await studentAttendanceService.findStudentAttendanceById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve attendance record.",
    });
  }
};

// READ - Get all attendance records for a specific student ID
const findStudentAttendancesByStudentId = async (req, res) => {
  try {
    const { student_id } = req.params;

    const attendances = await studentAttendanceService.findStudentAttendancesByStudentId(student_id);

    return res.status(200).json({
      success: true,
      count: attendances.length,
      data: attendances,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve student attendance history.",
    });
  }
};

// READ - Get all attendance records for a specific computer ID
const findStudentAttendancesByComputerId = async (req, res) => {
  try {
    const { computer_id } = req.params;

    const attendances = await studentAttendanceService.findStudentAttendancesByComputerId(computer_id);

    return res.status(200).json({
      success: true,
      count: attendances.length,
      data: attendances,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve computer attendance history.",
    });
  }
};

// UPDATE - Update attendance record by ID
const updateStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, computer_id, attendance_date, time_in, time_out, purpose } = req.body;

    const result = await studentAttendanceService.updateStudentAttendance(
      id,
      student_id,
      computer_id,
      attendance_date,
      time_in,
      time_out,
      purpose,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found or no changes made.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance record updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update attendance record.",
    });
  }
};

// DELETE - Delete attendance record by ID
const deleteStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentAttendanceService.deleteStudentAttendance(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance record deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete attendance record.",
    });
  }
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
