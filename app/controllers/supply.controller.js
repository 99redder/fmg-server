/*
======================================
; Title: supply.controller.js
; Author: Chris Gorham
; Date Created: 12 July 2023
; Last Updated: 31 July 2023
; Description: This code sets up the Supply controller and Supply functions
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

// imports / setup
const db = require("../models");
const Supply = db.supplies;
const Op = db.Sequelize.Op;

// sets up the variables and defaults for pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: supplies } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, supplies, totalPages, currentPage };
};

// Create and Save a new Supply
exports.create = (req, res) => {
  // Validate request
  if (!req.body.itemName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const supply = {
    itemName: req.body.itemName,
    purchaseDate: req.body.purchaseDate,
    itemCost: req.body.itemCost,
    itemTax: req.body.itemTax,
    itemTotalCost: req.body.itemTotalCost,
    notes: req.body.notes,
    published: req.body.published ? req.body.published : false
  };

  Supply.create(supply)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Supply."
      });
    });
};

// Retrieve all Supplies from the database.
exports.findAll = (req, res) => {
  const { page, size, itemName} = req.query;
  var condition = itemName ? { itemName: { [Op.like]: `%${itemName}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Supply.findAndCountAll({ 
    where: condition, limit, offset,
    order: [['ID', 'DESC']] // Sort by ID in descending order
  })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Supplies."
      });
    });
};

// Find a single Supply with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Supply.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Supply with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Supply with id=" + id
      });
    });
};

// Update a Supply by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Supply.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Supply was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Supply with id=${id}. Maybe Supply was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Supply with id=" + id
      });
    });
};

// Delete a Supply with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Supply.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Supply was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Supply with id=${id}. Maybe Supply was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Supply with id=" + id
      });
    });
};

// Delete all Supplies from the database.
exports.deleteAll = (req, res) => {
  Supply.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Supplies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Supplies."
      });
    });
};

// find all published Supplies
exports.findAllPublished = (req, res) => {
  Supply.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Supplies."
      });
    });
};