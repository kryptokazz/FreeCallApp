// routes/common.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// DELETE record by ID
router.delete('/:tableName/:recordId', async (req, res) => {
  const tableName = req.params.tableName;
  const recordId = req.params.recordId;

  try {
    const result = await pool.query(`DELETE FROM ${tableName} WHERE ${tableName}_id = $1`, [recordId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error(`Error deleting ${tableName} by ID`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE record by ID
router.put('/:tableName/:recordId', async (req, res) => {
  const tableName = req.params.tableName;
  const recordId = req.params.recordId;
  const { ...updatedData } = req.body;

  try {
    const columns = Object.keys(updatedData);
    const values = Object.values(updatedData);
    const updateQuery = columns.map((column, index) => `${column} = $${index + 1}`).join(', ');

    const result = await pool.query(`UPDATE ${tableName} SET ${updateQuery} WHERE ${tableName}_id = $${columns.length + 1} RETURNING *`, [
      ...values,
      recordId
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating ${tableName} by ID`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

