//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const studentAttendanceService = require("../../../src/services/student_attendances-service.js");

const {
  CREATE_STUDENT_ATTENDANCE,
  FIND_ALL_STUDENT_ATTENDANCES,
  FIND_STUDENT_ATTENDANCE_BY_ID,
  FIND_STUDENT_ATTENDANCES_BY_STUDENT_ID,
  FIND_STUDENT_ATTENDANCES_BY_COMPUTER_ID,
  UPDATE_STUDENT_ATTENDANCE,
  DELETE_STUDENT_ATTENDANCE,
} = require("../../../src/database/queries/student_attendances-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createStudentAttendance", () => {
  it("should create a student attendance successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await studentAttendanceService.createStudentAttendance(
      1,
      2,
      "2026-09-25",
      "08:00:00",
      "10:00:00",
      "Research",
    );

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_STUDENT_ATTENDANCE, [
      1,
      2,
      "2026-09-25",
      "08:00:00",
      "10:00:00",
      "Research",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when student ID is missing", async () => {
    await expect(
      studentAttendanceService.createStudentAttendance(null, 2, "2026-09-25", "08:00:00", "10:00:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      studentAttendanceService.createStudentAttendance(1, null, "2026-09-25", "08:00:00", "10:00:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when attendance date is missing", async () => {
    await expect(
      studentAttendanceService.createStudentAttendance(1, 2, null, "08:00:00", "10:00:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when time in is missing", async () => {
    await expect(
      studentAttendanceService.createStudentAttendance(1, 2, "2026-09-25", null, "10:00:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when purpose is missing", async () => {
    await expect(
      studentAttendanceService.createStudentAttendance(1, 2, "2026-09-25", "08:00:00", "10:00:00", null),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllStudentAttendances", () => {
  it("should return all student attendances", async () => {
    const mockRows = [
      {
        attendance_id: 1,
        student_id: 1,
        computer_id: 2,
        attendance_date: "2026-09-25",
        time_in: "08:00:00",
        time_out: "10:00:00",
        purpose: "Research",
      },
      {
        attendance_id: 2,
        student_id: 2,
        computer_id: 3,
        attendance_date: "2026-09-25",
        time_in: "09:00:00",
        time_out: "11:00:00",
        purpose: "Assignment",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await studentAttendanceService.findAllStudentAttendances();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_STUDENT_ATTENDANCES);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no student attendances exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await studentAttendanceService.findAllStudentAttendances();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_STUDENT_ATTENDANCES);

    expect(result).toEqual([]);
  });
});

describe("findStudentAttendanceById", () => {
  it("should return a student attendance by ID", async () => {
    const mockAttendance = {
      attendance_id: 1,
      student_id: 1,
      computer_id: 2,
      attendance_date: "2026-09-25",
      time_in: "08:00:00",
      time_out: "10:00:00",
      purpose: "Research",
    };

    mockDb.query.mockResolvedValueOnce([[mockAttendance]]);

    const result = await studentAttendanceService.findStudentAttendanceById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STUDENT_ATTENDANCE_BY_ID, [1]);

    expect(result).toEqual(mockAttendance);
  });

  it("should return null when the student attendance does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await studentAttendanceService.findStudentAttendanceById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STUDENT_ATTENDANCE_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(studentAttendanceService.findStudentAttendanceById()).rejects.toThrow("Attendance ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findStudentAttendancesByStudentId", () => {
  it("should return attendances by student ID", async () => {
    const mockRows = [
      {
        attendance_id: 1,
        student_id: 1,
        computer_id: 2,
        attendance_date: "2026-09-25",
        time_in: "08:00:00",
        time_out: "10:00:00",
        purpose: "Research",
      },
      {
        attendance_id: 2,
        student_id: 1,
        computer_id: 3,
        attendance_date: "2026-09-24",
        time_in: "13:00:00",
        time_out: "15:00:00",
        purpose: "Assignment",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await studentAttendanceService.findStudentAttendancesByStudentId(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STUDENT_ATTENDANCES_BY_STUDENT_ID, [1]);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no attendances exist for the student", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await studentAttendanceService.findStudentAttendancesByStudentId(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STUDENT_ATTENDANCES_BY_STUDENT_ID, [999]);

    expect(result).toEqual([]);
  });

  it("should throw an error when student ID is missing", async () => {
    await expect(studentAttendanceService.findStudentAttendancesByStudentId()).rejects.toThrow(
      "Student ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findStudentAttendancesByComputerId", () => {
  it("should return attendances by computer ID", async () => {
    const mockRows = [
      {
        attendance_id: 1,
        student_id: 1,
        computer_id: 2,
        attendance_date: "2026-09-25",
        time_in: "08:00:00",
        time_out: "10:00:00",
        purpose: "Research",
      },
      {
        attendance_id: 2,
        student_id: 3,
        computer_id: 2,
        attendance_date: "2026-09-24",
        time_in: "13:00:00",
        time_out: "15:00:00",
        purpose: "Assignment",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await studentAttendanceService.findStudentAttendancesByComputerId(2);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STUDENT_ATTENDANCES_BY_COMPUTER_ID, [2]);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no attendances exist for the computer", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await studentAttendanceService.findStudentAttendancesByComputerId(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STUDENT_ATTENDANCES_BY_COMPUTER_ID, [999]);

    expect(result).toEqual([]);
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(studentAttendanceService.findStudentAttendancesByComputerId()).rejects.toThrow(
      "Computer ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateStudentAttendance", () => {
  it("should update a student attendance successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await studentAttendanceService.updateStudentAttendance(
      1,
      1,
      2,
      "2026-09-25",
      "08:00:00",
      "10:00:00",
      "Research",
    );

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_STUDENT_ATTENDANCE, [
      1,
      2,
      "2026-09-25",
      "08:00:00",
      "10:00:00",
      "Research",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      studentAttendanceService.updateStudentAttendance(null, 1, 2, "2026-09-25", "08:00:00", "10:00:00", "Research"),
    ).rejects.toThrow("Attendance ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when student ID is missing", async () => {
    await expect(
      studentAttendanceService.updateStudentAttendance(1, null, 2, "2026-09-25", "08:00:00", "10:00:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      studentAttendanceService.updateStudentAttendance(1, 1, null, "2026-09-25", "08:00:00", "10:00:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when attendance date is missing", async () => {
    await expect(
      studentAttendanceService.updateStudentAttendance(1, 1, 2, null, "08:00:00", "10:00:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when time in is missing", async () => {
    await expect(
      studentAttendanceService.updateStudentAttendance(1, 1, 2, "2026-09-25", null, "10:00:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when purpose is missing", async () => {
    await expect(
      studentAttendanceService.updateStudentAttendance(1, 1, 2, "2026-09-25", "08:00:00", "10:00:00", null),
    ).rejects.toThrow("Student ID, computer ID, attendance date, time in, and purpose are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteStudentAttendance", () => {
  it("should delete a student attendance successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await studentAttendanceService.deleteStudentAttendance(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_STUDENT_ATTENDANCE, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(studentAttendanceService.deleteStudentAttendance()).rejects.toThrow("Attendance ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no attendance was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await studentAttendanceService.deleteStudentAttendance(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_STUDENT_ATTENDANCE, [999]);

    expect(result).toEqual(mockResult);
  });
});
