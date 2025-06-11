const express = require('express');
const Opinion = require('./opinion.model');
const ArchivedOpinion = require('../archivedOpinion/archivedOpinion.model');
const router = express.Router();

router.post('/post-opinion', async (req, res) => {
  try {
    const { name, comment } = req.body;
    if (!name || !comment) {
      return res.status(400).send({ message: "All Fields Are Required" });
    };
    const newOpinion = new Opinion({
      name, comment
    });
    await newOpinion.save();
    res.status(200).send({
      message: 'Opinion Processed Successfully',
      newOpinion
    });
  } catch (error) {
    console.error("Error posting opinion", error);
    res.status(500).send({ message: "Failed To Post Opinion"});
  };
});

router.get('/total-opinions', async (req, res) => {
  try {
    const opinions = await Opinion.find({}); 
    res.status(200).send({
      opinions 
    });
  } catch (error) {
    console.error("Error getting opinions", error);
    res.status(500).send({ message: "Failed to get opinions" });
  }
});

router.post('/archive-opinion', async (req, res) => {
  try {
    const { id } = req.body;
    const opinion = await Opinion.findById(id);
    if (!opinion) {
      return res.status(404).send({ message: "Opinion Not Found"});
    };
    const archivedOpinion = new ArchivedOpinion({
      name: opinion.name,
      comment: opinion.comment,
    });
    await archivedOpinion.save();
    await Opinion.findByIdAndDelete(id);
    res.status(200).send({
      message: "Opinion archived successfully",
      archivedOpinion
    });
  } catch (error) {
    console.error("Error Archiving Opinion", error);
    res.status(500).send({ message: "Failed To Archive Opinion"});
  };
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const opinion = await Opinion.findByIdAndDelete(id);
    if (opinion) {
      return res.status(200).send({ message: "Opinion Deleted Successfully" });
    } else {
      return res.status(404).send({ message: "Opinion Not Found" });
    };
  } catch (error) {
    res.status(500).send({ message: "Error Deleting Opinion" });
  }
});

module.exports = router;