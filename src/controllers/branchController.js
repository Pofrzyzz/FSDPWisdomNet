const branchModel = require('../models/branchModel');

const fetchBranches = async (req, res) => {
  try {
    const branches = await branchModel.getAllBranches();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching branches' });
  }
};

module.exports = { fetchBranches };
