// ==========================================
// 1. ATTENDANCE LOGS QUERIES
// ==========================================
// CREATE - Record student check-in/check-out
const CREATE_ATTENDANCE_LOG = `INSERT INTO attendance_logs ( student_id, grade_section_id, check_in_time, check_out_time, status, date_logged ) VALUES (?, ?, ?, ?, ?, ?) ;`;

// READ - Get all attendance logs
const FIND_ALL_ATTENDANCE_LOGS = `SELECT al.id AS attendance_log_id, al.student_id, al.grade_section_id, al.check_in_time, al.check_out_time, al.status, al.date_logged, al.created_at, al.updated_at FROM attendance_logs AS al ORDER BY al.id DESC ;`;

// READ - Get attendance log by ID
const FIND_ATTENDANCE_LOG_BY_ID = `SELECT al.id AS attendance_log_id, al.student_id, al.grade_section_id, al.check_in_time, al.check_out_time, al.status, al.date_logged, al.created_at, al.updated_at FROM attendance_logs AS al WHERE al.id = ? ;`;

// READ - Get attendance logs by Student ID
const FIND_ATTENDANCE_LOGS_BY_STUDENT = `SELECT al.id AS attendance_log_id, al.student_id, al.grade_section_id, al.check_in_time, al.check_out_time, al.status, al.date_logged, al.created_at, al.updated_at FROM attendance_logs AS al WHERE al.student_id = ? ORDER BY al.date_logged DESC ;`;

// READ - Get attendance logs by Date and Grade Section
const FIND_ATTENDANCE_BY_DATE_AND_SECTION = `SELECT al.id AS attendance_log_id, al.student_id, al.grade_section_id, al.check_in_time, al.check_out_time, al.status, al.date_logged, al.created_at, al.updated_at FROM attendance_logs AS al WHERE al.date_logged = ? AND al.grade_section_id = ? ORDER BY al.check_in_time ASC ;`;

// UPDATE - Update attendance record/status
const UPDATE_ATTENDANCE_LOG = `UPDATE attendance_logs SET student_id = ?, grade_section_id = ?, check_in_time = ?, check_out_time = ?, status = ?, date_logged = ? WHERE id = ? ;`;

// DELETE - Remove an attendance entry
const DELETE_ATTENDANCE_LOG = `DELETE FROM attendance_logs WHERE id = ? ;`;

// ==========================================
// 2. ATTENDANCE RELATIONAL / JOIN QUERIES
// ==========================================
// READ - Get full attendance details with student name and grade/section
const FIND_ATTENDANCE_WITH_STUDENT_DETAILS = `
  SELECT 
    al.id AS attendance_log_id,
    s.id AS student_id,
    s.firstname,
    s.lastname,
    s.contact_no,
    gs.grade_level,
    gs.section,
    al.check_in_time,
    al.check_out_time,
    al.status,
    al.date_logged
  FROM attendance_logs AS al
  JOIN students AS s ON al.student_id = s.id
  JOIN grade_sections AS gs ON al.grade_section_id = gs.id
  WHERE al.date_logged = ?
  ORDER BY s.lastname ASC ;
`;

// ==========================================
// 3. ATTENDANCE REPORTS / SUMMARY QUERIES
// ==========================================
// READ - Count attendance status by date range for reports
const COUNT_ATTENDANCE_BY_STATUS = `
  SELECT 
    status, 
    COUNT(id) AS total_count 
  FROM attendance_logs 
  WHERE date_logged BETWEEN ? AND ? 
  GROUP BY status ;
`;

// ==========================================
// MODULE EXPORTS
// ==========================================
module.exports = {
  // CRUD
  CREATE_ATTENDANCE_LOG,
  FIND_ALL_ATTENDANCE_LOGS,
  FIND_ATTENDANCE_LOG_BY_ID,
  FIND_ATTENDANCE_LOGS_BY_STUDENT,
  FIND_ATTENDANCE_BY_DATE_AND_SECTION,
  UPDATE_ATTENDANCE_LOG,
  DELETE_ATTENDANCE_LOG,

  // Relational & Reporting
  FIND_ATTENDANCE_WITH_STUDENT_DETAILS,
  COUNT_ATTENDANCE_BY_STATUS,
};
