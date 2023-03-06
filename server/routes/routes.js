const express = require("express");
// const { verify } = require("crypto");
const Func = require("../functions/functions");
const sequelize = require("../../config/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cache = require("../../config/node-cache");
const path = require("path");

// Controllers
const EmployeeControllers = require("../controller/employeeController");
const EmpStatusControllers = require("../controller/employeeStatusController");
const StoreControllers = require("../controller/storeController");
const ProductUnitControllers = require("../controller/productUnitController");
const ProductControllers = require("../controller/productController");

// // Routes

// Employee Routes
router.get("/employee/all", cache.get, EmployeeControllers.getAll, cache.set);
router.get("/employee/:id", cache.get, EmployeeControllers.getOne, cache.set);
router.post("/employee/create", EmployeeControllers.create);
router.post("/employee/login", EmployeeControllers.login);
router.patch("/employee/update", EmployeeControllers.update);
router.patch("/employee/forgot", EmployeeControllers.forgot);
router.patch("/employee/disActive/:id", EmployeeControllers.disActive);
router.patch("/employee/active/:id", EmployeeControllers.Active);
router.patch("/employee/delete/:id", EmployeeControllers.Delete);
router.delete("/employee/destroy/:id", EmployeeControllers.Destroy);

//EmployeeStatus Routes
router.get(
    "/emp/status/all",
    cache.get,
    EmpStatusControllers.getAll,
    cache.set
);
router.get(
    "/emp/status/:id",
    cache.get,
    EmpStatusControllers.getOne,
    cache.set
);
router.post("/emp/status/create", EmpStatusControllers.create);
router.patch("/emp/status/update", EmpStatusControllers.update);
router.patch("/emp/status/disActive/:id", EmpStatusControllers.disActive);
router.patch("/emp/status/active/:id", EmpStatusControllers.Active);
router.patch("/emp/status/delete/:id", EmpStatusControllers.Delete);
router.delete("/emp/status/destroy/:id", EmpStatusControllers.Destroy);

// Store Routes
router.get("/store/all", cache.get, StoreControllers.getAll, cache.set);
router.get("/store/:id", cache.get, StoreControllers.getOne, cache.set);
router.post("/store/create", StoreControllers.create);
router.patch("/store/update", StoreControllers.update);
router.patch("/store/disActive/:id", StoreControllers.disActive);
router.patch("/store/active/:id", StoreControllers.Active);
router.patch("/store/delete/:id", StoreControllers.Delete);
router.delete("/store/destroy/:id", StoreControllers.Destroy);

// Products Unit Routes
router.get(
    "/pro/unit/all",
    cache.get,
    ProductUnitControllers.getAll,
    cache.set
);
router.get(
    "/pro/unit/:id",
    cache.get,
    ProductUnitControllers.getOne,
    cache.set
);
router.post("/pro/unit/create", ProductUnitControllers.create);
router.patch("/pro/unit/update", ProductUnitControllers.update);
router.patch("/pro/unit/disActive/:id", ProductUnitControllers.disActive);
router.patch("/pro/unit/active/:id", ProductUnitControllers.Active);
router.patch("/pro/unit/delete/:id", ProductUnitControllers.Delete);
router.delete("/pro/unit/destroy/:id", ProductUnitControllers.Destroy);

// Product Routes
router.get("/pro/all", cache.get, ProductControllers.getAll, cache.set);
router.get("/pro/:id", cache.get, ProductControllers.getOne, cache.set);
router.post("/pro/create", ProductControllers.create);
router.patch("/pro/update", ProductControllers.update);
router.patch("/pro/disActive/:id", ProductControllers.disActive);
router.patch("/pro/active/:id", ProductControllers.Active);
router.patch("/pro/delete/:id", ProductControllers.Delete);
router.delete("/pro/destroy/:id", ProductControllers.Destroy);

// For Token

function verifyToken(req, res, next) {
    const bearerHeader =
        req.headers["authorization"] || req.headers["Authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, Func.Secret(), (err, authData) => {
            if (err) {
                res.json("err");
                console.log(err);
            } else {
                req.id = authData.id;
            }
        });
        next();
    } else {
        res.send("<center><h2>This link was not found! :(</h2></center>");
    }
}

module.exports = router;
