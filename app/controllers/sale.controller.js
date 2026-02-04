/*
======================================
; Title: sale.controller.js
; Author: Red
; Date Created: 12 July 2023
; Last Updated: 31 July 2023
; Description: This code sets up the Sale controller and Sale functions
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

// imports / setup
const db = require("../models");
const Sale = db.sales;
const Op = db.Sequelize.Op;

// sets up the variables and defaults for pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: sales } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, sales, totalPages, currentPage };
};

// Create and Save a new Sale
exports.create = (req, res) => {
  // Validate request
  if (!req.body.itemDescription) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const sale = {
    itemDescription: req.body.itemDescription,
    salesDate: req.body.salesDate,
    salesPrice: req.body.salesPrice,
    etsyTransactionFee: req.body.etsyTransactionFee,
    etsyMarketingFee: req.body.etsyMarketingFee,
    etsyProcessingFee: req.body.etsyProcessingFee,
    etsyListingFee: req.body.etsyListingFee,
    etsyShippingFee: req.body.etsyShippingFee,
    shippingCost: req.body.shippingCost,
    customBoxCost: req.body.customBoxCost,
    oldMaterialOffset: req.body.oldMaterialOffset,
    notes: req.body.notes,
    published: req.body.published ? req.body.published : false
  };

  // Save a Sale in the database
  Sale.create(sale)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sale."
      });
    });
};

// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
  const { page, size, itemDescription} = req.query;
  var condition = itemDescription ? { itemDescription: { [Op.like]: `%${itemDescription}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Sale.findAndCountAll({ 
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
          err.message || "Some error occurred while retrieving Sales."
      });
    });
};

// Find a single Sale with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sale.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Sale with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sale with id=" + id
      });
    });
};

// Update a Sale by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Sale.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sale with id=${id}. Maybe Sale was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sale with id=" + id
      });
    });
};

// Delete a Sale with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sale.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Sale with id=${id}. Maybe Sale was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sale with id=" + id
      });
    });
};

// Delete all Sales from the database.
exports.deleteAll = (req, res) => {
  Sale.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Sales were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sales."
      });
    });
};

// find all published Sales
exports.findAllPublished = (req, res) => {
  const { page, size} = req.query;
  const { limit, offset } = getPagination(page, size);

  Sale.findAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPaginationData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sales."
      });
    });
};


// find total of all salesPrice (this is a test)
exports.totalSales = (res) => {
  
  Sale.findAll({
  attributes: [sequelize.fn('sum', sequelize.col('salesPrice')), totalSales],
  raw: true, }).then(res.send(this.totalSales));
  }