const accountService = require("../services/account-service.js");

// CREATE - Register a new account
const handleCreateAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if account already exists
    const existingAccount = await accountService.findAccountByUsername(username);
    if (existingAccount) {
      return res.status(409).json({
        success: false,
        message: "Username is already taken.",
      });
    }

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

// READ - Get all accounts
const handleFindAllAccounts = async (req, res) => {
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
      message: "Server error while fetching accounts.",
      error: error.message,
    });
  }
};

// READ - Get single account by ID
const handleFindAccountById = async (req, res) => {
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
      message: error.message || "Invalid account ID.",
    });
  }
};

// READ - Get single account by username
const handleFindAccountByUsername = async (req, res) => {
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
      message: error.message || "Invalid username.",
    });
  }
};

// UPDATE - Update account by ID
const handleUpdateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const existingAccount = await accountService.findAccountById(id);
    if (!existingAccount) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    await accountService.updateAccount(id, username, password);

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
const handleDeleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAccount = await accountService.findAccountById(id);
    if (!existingAccount) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    await accountService.deleteAccount(id);

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
  handleCreateAccount,
  handleFindAllAccounts,
  handleFindAccountById,
  handleFindAccountByUsername,
  handleUpdateAccount,
  handleDeleteAccount,
};
