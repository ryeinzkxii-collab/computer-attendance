// ==========================================
// 1. COMPUTERS CRUD QUERIES
// ==========================================

// CREATE - Register a new computer terminal/PC
const CREATE_COMPUTER = `INSERT INTO computers ( pc_number, ip_address, mac_address, status, lab_room, specs_description ) VALUES (?, ?, ?, ?, ?, ?) ;`;

// READ - Get all registered computers
const FIND_ALL_COMPUTERS = `SELECT c.id AS computer_id, c.pc_number, c.ip_address, c.mac_address, c.status, c.lab_room, c.specs_description, c.created_at, c.updated_at FROM computers AS c ORDER BY c.id DESC ;`;

// READ - Get single computer by ID
const FIND_COMPUTER_BY_ID = `SELECT c.id AS computer_id, c.pc_number, c.ip_address, c.mac_address, c.status, c.lab_room, c.specs_description, c.created_at, c.updated_at FROM computers AS c WHERE c.id = ? ;`;

// READ - Get computer by PC Number / Label (e.g., 'PC-01')
const FIND_COMPUTER_BY_PC_NUMBER = `SELECT c.id AS computer_id, c.pc_number, c.ip_address, c.mac_address, c.status, c.lab_room, c.specs_description, c.created_at, c.updated_at FROM computers AS c WHERE c.pc_number = ? ;`;

// READ - Get computers filtered by operational status ('available', 'maintenance', 'in_use', 'offline')
const FIND_COMPUTERS_BY_STATUS = `SELECT c.id AS computer_id, c.pc_number, c.ip_address, c.mac_address, c.status, c.lab_room, c.specs_description, c.created_at, c.updated_at FROM computers AS c WHERE c.status = ? ORDER BY c.pc_number ASC ;`;

// UPDATE - Update computer details or specifications
const UPDATE_COMPUTER = `UPDATE computers SET pc_number = ?, ip_address = ?, mac_address = ?, status = ?, lab_room = ?, specs_description = ? WHERE id = ? ;`;

// UPDATE - Quick status update (e.g., mark as under maintenance or in use)
const UPDATE_COMPUTER_STATUS = `UPDATE computers SET status = ? WHERE id = ? ;`;

// DELETE - Remove a computer entry
const DELETE_COMPUTER = `DELETE FROM computers WHERE id = ? ;`;

// ==========================================
// 2. COMPUTER SESSION / USAGE LOG QUERIES
// ==========================================

// READ - Get current active usage logs with student and PC details
const FIND_ACTIVE_COMPUTER_SESSIONS = `
  SELECT 
    c.pc_number,
    c.lab_room,
    s.id AS student_id,
    s.firstname,
    s.lastname,
    al.check_in_time,
    al.date_logged
  FROM attendance_logs AS al
  INNER JOIN students AS s ON al.student_id = s.id
  INNER JOIN computers AS c ON al.computer_id = c.id
  WHERE al.check_out_time IS NULL AND al.date_logged = CURRENT_DATE()
  ORDER BY c.pc_number ASC ;
`;

// READ - Count available vs occupied computers
const COUNT_COMPUTERS_BY_STATUS = `
  SELECT 
    status, 
    COUNT(id) AS total_count 
  FROM computers 
  GROUP BY status ;
`;

// ==========================================
// MODULE EXPORTS
// ==========================================
module.exports = {
  // CRUD
  CREATE_COMPUTER,
  FIND_ALL_COMPUTERS,
  FIND_COMPUTER_BY_ID,
  FIND_COMPUTER_BY_PC_NUMBER,
  FIND_COMPUTERS_BY_STATUS,
  UPDATE_COMPUTER,
  UPDATE_COMPUTER_STATUS,
  DELETE_COMPUTER,

  // Usage & Metrics
  FIND_ACTIVE_COMPUTER_SESSIONS,
  COUNT_COMPUTERS_BY_STATUS,
};
