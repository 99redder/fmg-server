/*
======================================
; Title: advert.controller.js
; Author: Red
; Date Created: 05 August 2023
; Last Updated: 05 August 2023
; Description: This code sets up the Advertising controller and Advertising functions
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

// imports / setup
const db = require("../models");
const Advert = db.advertising;
const Op = db.Sequelize.Op;

// sets up the variables and defaults for pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: advertising } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, advertising, totalPages, currentPage };
};

// Create and Save a new Advert
exports.create = (req, res) => {
  // Validate request
  if (!req.body.advertDescription) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const advert = {
    advertDescription: req.body.advertDescription,
    dateCharged: req.body.dateCharged,
    amtCharged: req.body.amtCharged,
    notes: req.body.notes,
    published: req.body.published ? req.body.published : false
  };

  // Save an Advert in the database
  Advert.create(advert)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Advert."
      });
    });
};

// Retrieve all Adverts from the database.
exports.findAll = (req, res) => {
  const { page, size, advertDescription} = req.query;
  var condition = advertDescription ? { advertDescription: { [Op.like]: `%${advertDescription}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Advert.findAndCountAll({ 
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
          err.message || "Some error occurred while retrieving Adverts."
      });
    });
};

// Find a single Advert with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Advert.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Advert with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Advert with id=" + id
      });
    });
};

// Update an Advert by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Advert.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Advert was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Advert with id=${id}. Maybe Advert was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Advert with id=" + id
      });
    });
};

// Delete an Advert with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Advert.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Advert was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Advert with id=${id}. Maybe Advert was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Advert with id=" + id
      });
    });
};

// Delete all Adverts from the database.
exports.deleteAll = (req, res) => {
  if ((!req.body || req.body.confirm !== "DELETE_ALL")) {
    return res.status(400).send({ message: "Confirmation required" });
  }

  Advert.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Adverts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Adverts."
      });
    });
};

// find all published Adverts
exports.findAllPublished = (req, res) => {
  const { page, size} = req.query;
  const { limit, offset } = getPagination(page, size);

  Advert.findAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPaginationData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Adverts."
      });
    });
}
