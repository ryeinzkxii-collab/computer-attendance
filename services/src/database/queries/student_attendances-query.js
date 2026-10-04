// CREATE
const CREATE_STUDENT_ATTENDANCE = `
  INSERT INTO student_attendances (
    student_id,
    computer_id,
    attendance_date,
    time_in,
    time_out,
    purpose
  )
  VALUES (?, ?, ?, ?, ?, ?)
`;

// READ - Get all student attendances
const FIND_ALL_STUDENT_ATTENDANCES = `
  SELECT
    sa.id AS attendance_id,
    sa.student_id,
    sa.computer_id,
    sa.attendance_date,
    sa.time_in,
    sa.time_out,
    sa.purpose,
    sa.created_at,
    sa.updated_at
  FROM student_attendances AS sa
  ORDER BY sa.id DESC
`;

// READ - Get student attendance by ID
const FIND_STUDENT_ATTENDANCE_BY_ID = `
  SELECT
    sa.id AS attendance_id,
    sa.student_id,
    sa.computer_id,
    sa.attendance_date,
    sa.time_in,
    sa.time_out,
    sa.purpose,
    sa.created_at,
    sa.updated_at
  FROM student_attendances AS sa
  WHERE sa.id = ?
`;

// READ - Get attendances by student ID
const FIND_STUDENT_ATTENDANCES_BY_STUDENT_ID = `
  SELECT
    sa.id AS attendance_id,
    sa.student_id,
    sa.computer_id,
    sa.attendance_date,
    sa.time_in,
    sa.time_out,
    sa.purpose,
    sa.created_at,
    sa.updated_at
  FROM student_attendances AS sa
  WHERE sa.student_id = ?
  ORDER BY sa.id DESC
`;

// READ - Get attendances by computer ID
const FIND_STUDENT_ATTENDANCES_BY_COMPUTER_ID = `
  SELECT
    sa.id AS attendance_id,
    sa.student_id,
    sa.computer_id,
    sa.attendance_date,
    sa.time_in,
    sa.time_out,
    sa.purpose,
    sa.created_at,
    sa.updated_at
  FROM student_attendances AS sa
  WHERE sa.computer_id = ?
  ORDER BY sa.id DESC
`;

// UPDATE
const UPDATE_STUDENT_ATTENDANCE = `
  UPDATE student_attendances AS sa
  SET
    sa.student_id = ?,
    sa.computer_id = ?,
    sa.attendance_date = ?,
    sa.time_in = ?,
    sa.time_out = ?,
    sa.purpose = ?
  WHERE sa.id = ?
`;

// DELETE
const DELETE_STUDENT_ATTENDANCE = `
  DELETE FROM student_attendances
  WHERE id = ?
`;

module.exports = {
  CREATE_STUDENT_ATTENDANCE,
  FIND_ALL_STUDENT_ATTENDANCES,
  FIND_STUDENT_ATTENDANCE_BY_ID,
  FIND_STUDENT_ATTENDANCES_BY_STUDENT_ID,
  FIND_STUDENT_ATTENDANCES_BY_COMPUTER_ID,
  UPDATE_STUDENT_ATTENDANCE,
  DELETE_STUDENT_ATTENDANCE,
};
