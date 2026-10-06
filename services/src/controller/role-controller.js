const roleService = require("../services/role-service.js");

// CREATE - Register a new role
const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await roleService.createRole(name, description);

    return res.status(201).json({
      success: true,
      message: "Role created successfully.",
      data: {
        id: result.insertId,
        name,
        description,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create role.",
    });
  }
};

// READ - Get all roles
const findAllRoles = async (req, res) => {
  try {
    const roles = await roleService.findAllRoles();

    return res.status(200).json({
      success: true,
      count: roles.length,
      data: roles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch roles.",
    });
  }
};

// READ - Get role by ID
const findRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await roleService.findRoleById(id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve role.",
    });
  }
};

// READ - Get role by name
const findRoleByName = async (req, res) => {
  try {
    const { name } = req.params;

    const role = await roleService.findRoleByName(name);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve role.",
    });
  }
};

// UPDATE - Update role by ID
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const result = await roleService.updateRole(id, name, description);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Role not found or no changes made.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update role.",
    });
  }
};

// DELETE - Delete role by ID
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await roleService.deleteRole(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete role.",
    });
  }
};

module.exports = {
  createRole,
  findAllRoles,
  findRoleById,
  findRoleByName,
  updateRole,
  deleteRole,
};
