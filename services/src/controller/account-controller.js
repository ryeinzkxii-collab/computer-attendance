const accountService = require("../services/account-service.js");

// CREATE - Register a new account
const createAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await accountService.createAccount(username, password);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: {
        id: result.insertId,
        username,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create account.",
    });
  }
};

// READ - Get all registered accounts
const findAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.findAllAccounts();

    return res.status(200).json({
      success: true,
      count: accounts.length,
      data: accounts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch accounts.",
    });
  }
};

// READ - Get account by ID
const findAccountById = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await accountService.findAccountById(id);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve account.",
    });
  }
};

// READ - Get account by username
const findAccountByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const account = await accountService.findAccountByUsername(username);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve account.",
    });
  }
};

// UPDATE - Update account by ID
const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const result = await accountService.updateAccount(id, username, password);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Account not found or no changes made.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update account.",
    });
  }
};

// DELETE - Delete account by ID
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await accountService.deleteAccount(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete account.",
    });
  }
};

module.exports = {
  createAccount,
  findAllAccounts,
  findAccountById,
  findAccountByUsername,
  updateAccount,
  deleteAccount,
};
