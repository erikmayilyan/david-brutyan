const express = require('express');
const ArchivedOpinion = require('./archivedOpinion.model');
const router = express.Router();

router.get('/archived-opinions', async (req, res) => {
  try {
    const archived = await ArchivedOpinion.find({});
    res.status(200).send({
      archived
    });
  } catch (error) {
    console.error("Error getting opinions", error);
    res.status(500).send({ message: "Failed to get opinions" });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try { 
    const archived = await ArchivedOpinion.findByIdAndDelete(id);
    if (archived) {
      return res.status(200).send({ message: "Archived Opinion Deleted Successfully!" });
    } else {
      return res.status(404).send({ message: "Archived Opinion Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error Deleting Archived Opinion" });
  }
});

module.exports = router;