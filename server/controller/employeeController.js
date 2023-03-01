var Sequelize = require("sequelize");
const { Employee, EmployeeStatus, Store } = require("../../models");
var sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Func = require("../functions/functions");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
    const { active, EmployeeStatusId, username } = req.query;

    const Active = active ? { active: active } : null;
    const EmployeeStatusID =
        EmployeeStatusId &&
        (EmployeeStatusId != 0 ? { EmployeeStatusId: EmployeeStatusId } : null);
    const Username =
        username &&
        (username?.length > 0
            ? {
                  [Op.or]: [
                      { username: { [Op.like]: `%${username}%` } },
                      { firstname: { [Op.like]: `%${username}%` } },
                  ],
              }
            : null);
    console.log(username, EmployeeStatusId);
    Employee.findAll({
        include: [
            {
                model: EmployeeStatus,
            },
            {
                model: Store,
            },
        ],

        where: {
            [Op.and]: [Active, EmployeeStatusID, Username],
        },
        order: [["id", "DESC"]],
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: err });
        });
};

const getOne = async (req, res) => {
    const { id } = req.params;
    const data = await Employee.findOne({ where: { id: id } });
    if (data) {
        Employee.findOne({
            where: {
                id: id,
            },
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json({ error: err });
            });
    } else {
        res.send("BU ID boyuncha Employee yok!");
    }
};

const create = async (req, res) => {
    const { password, username, firstname, phone, EmployeeStatusId, StoreId } =
        req.body;
    const exist = await Employee.findOne({
        where: {
            username: username,
        },
    });

    const salt = bcrypt.genSaltSync();
    bcrypt.hash(password, salt, (err, hashpassword) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Error", err: err });
        } else {
            if (exist) {
                let text = "Bu username-de employee onden bar!";
                res.json({
                    msg: text,
                });
            } else {
                Employee.create({
                    username,
                    firstname,
                    phone,
                    EmployeeStatusId,
                    StoreId,
                    password: hashpassword,
                    active: true,
                    deleted: false,
                })
                    .then(async (data) => {
                        jwt.sign(
                            {
                                id: data.id,
                                username: data.username,
                                firstname: data.firstname,
                                phone: data.phone,
                                EmployeeStatusId: data.EmployeeStatusId,
                                StoreId: data.StoreId,
                            },
                            Func.Secret(),
                            (err, token) => {
                                res.status(200).json({
                                    msg: "Suссessfully",
                                    token: token,
                                    id: data.id,
                                    username: data.username,
                                    firstname: data.firstname,
                                    phone: data.phone,
                                    EmployeeStatusId: data.EmployeeStatusId,
                                    StoreId: data.StoreId,
                                });
                            }
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json("create employee:", err);
                    });
            }
        }
    });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    await Employee.findOne({
        where: { username: username },
    })
        .then(async (data) => {
            if (!data.active) {
                res.json({ msg: "Siz DisActive edilen!" });
                return 0;
            }

            if (await bcrypt.compare(password, data.password)) {
                const token = jwt.sign(
                    {
                        id: data.id,
                        username: data.username,
                        firstname: data.firstname,
                        phone: data.phone,
                        EmployeeStatusId: data.EmployeeStatusId,
                        StoreId: data.StoreId,
                    },
                    Func.Secret()
                );

                return res.json({
                    id: data.id,
                    token: token,
                    username: data.username,
                    firstname: data.firstname,
                    phone: data.phone,
                    EmployeeStatusId: data.EmployeeStatusId,
                    StoreId: data.StoreId,
                    login: true,
                });
            } else {
                let text = "Siziň ulanyjy adyňyz ýa-da açar sözüňiz nädogry!";
                res.send({
                    msg: text,
                    login: false,
                });
            }
        })
        .catch((err) => {
            let text = "Hasaba alynmadyk employee!";
            res.send({ login: false, msg: text, err: err });
        });
};

const update = async (req, res) => {
    const { username, firstname, phone, EmployeeStatusId, StoreId, id } =
        req.body;

    const data = await Employee.findOne({ where: { id: id } });
    if (!data) {
        res.json("Bu Id boyuncha Employee yok!");
    } else {
        Employee.update(
            {
                username,
                firstname,
                phone,
                EmployeeStatusId,
                StoreId,
                active: true,
                deleted: false,
            },
            {
                where: {
                    id: id,
                },
            }
        )
            .then(async (data) => {
                res.json("updated");
            })
            .catch((err) => {
                console.log(err);
                res.json("update employee:", err);
            });
    }
};

const forgot = async (req, res) => {
    const {
        password,
        username,
        firstname,
        phone,
        EmployeeStatusId,
        StoreId,
        id,
    } = req.body;

    const data = await Employee.findOne({ where: { username: username } });
    if (!data) {
        res.json("Bu username boyuncha Employee yok!");
    }
    const salt = bcrypt.genSaltSync();
    bcrypt.hash(password, salt, (err, hashpassword) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Error", err: err });
        } else {
            Employee.update(
                {
                    password: hashpassword,
                    username,
                    firstname,
                    phone,
                    EmployeeStatusId,
                    StoreId,
                    active: true,
                    deleted: false,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
                .then(async (data) => {
                    jwt.sign(
                        {
                            id: data.id,
                            username: data.username,
                            firstname: data.firstname,
                            phone: data.phone,
                            EmployeeStatusId: data.EmployeeStatusId,
                            StoreId: data.StoreId,
                        },
                        Func.Secret(),
                        (err, token) => {
                            res.status(200).json({
                                msg: "Suссessfully",
                                token: token,
                                id: data.id,
                                username: data.username,
                                firstname: data.firstname,
                                phone: data.phone,
                                EmployeeStatusId: data.EmployeeStatusId,
                                StoreId: data.StoreId,
                            });
                        }
                    );
                    // res.json("updated")
                })
                .catch((err) => {
                    console.log(err);
                    res.json("forgot employee:", err);
                });
        }
    });
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let data = await Employee.findOne({ where: { id } });
    if (data) {
        Employee.update(
            {
                active: false,
            },
            {
                where: {
                    id,
                },
            }
        )
            .then(() => {
                res.json("DisActived!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu Id Boyuncha Employee yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let data = await Employee.findOne({ where: { id } });
    if (data) {
        Employee.update(
            {
                active: true,
            },
            {
                where: {
                    id,
                },
            }
        )
            .then(() => {
                res.json("Actived!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu Id Boyuncha Employee yok!");
    }
};

const Delete = async (req, res) => {
    const { id } = req.params;
    let data = await Employee.findOne({ where: { id } });
    if (data) {
        Employee.update(
            {
                active: false,
                deleted: true,
            },
            {
                where: {
                    id,
                },
            }
        )
            .then(() => {
                res.json("deleted!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu Id Boyuncha Employee yok!");
    }
};
const Destroy = async (req, res) => {
    const { id } = req.params;
    let data = await Employee.findOne({ where: { id } });
    if (data) {
        Employee.destoy({
            where: {
                id,
            },
        })
            .then(() => {
                res.json("destoyed!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu Id Boyuncha Employee yok!");
    }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.login = login;
exports.update = update;
exports.forgot = forgot;
exports.disActive = disActive;
exports.Active = Active;
exports.Delete = Delete;
exports.Destroy = Destroy;
