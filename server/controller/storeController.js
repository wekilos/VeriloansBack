var Sequelize = require("sequelize");
const { Employee, EmployeeStatus, Store } = require("../../models");
const Op = Sequelize.Op;

const getAll = async (req, res) => {
    const { active, fullName } = req.query;

    const Active = active ? { active: active } : null;
    const FullName =
        fullName &&
        (fullName?.length > 0
            ? {
                  [Op.or]: [
                      { title: { [Op.like]: `%${fullName}%` } },
                      { code: { [Op.like]: `%${fullName}%` } },
                  ],
              }
            : null);
    Store.findAll({
        include: [
            {
                model: Employee,
                attributes: ["id", "username", "firstname", "phone"],
                include: [
                    {
                        model: EmployeeStatus,
                        attributes: ["id", "title"],
                    },
                ],
            },
        ],
        where: {
            [Op.and]: [FullName, Active, { deleted: false }],
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
    const data = await Store.findOne({ where: { id: id } });
    if (data) {
        Store.findOne({
            include: [
                {
                    model: Employee,
                    attributes: ["id", "username", "firstname", "phone"],
                    include: [
                        {
                            model: EmployeeStatus,
                            attributes: ["id", "title"],
                        },
                    ],
                },
            ],
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
        res.send("BU ID boyuncha Store yok!");
    }
};

const create = async (req, res) => {
    const { title, code, address, phone } = req.body;
    console.log(req.body);
    const exist = await Store.findOne({
        where: {
            code: code,
        },
    });
    if (!exist) {
        Store.create({
            title,
            code,
            address,
            phone,
            active: true,
            deleted: false,
        })
            .then(async (data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json("create store:", err);
            });
    } else {
        res.json("BU code boyuncha store status bar");
    }
};

const update = async (req, res) => {
    const { title, code, address, phone, id } = req.body;
    const exist = await Store.findOne({
        where: {
            id: id,
        },
    });
    if (exist) {
        Store.update(
            {
                title,
                code,
                address,
                phone,
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
                res.json("Üýtgedildi!");
            })
            .catch((err) => {
                console.log(err);
                res.json("update store:", err);
            });
    } else {
        res.json("BU id boyuncha Store status yok!");
    }
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let data = await Store.findOne({ where: { id } });
    if (data) {
        Store.update(
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
        res.json("Bu Id Boyuncha Store yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let data = await Store.findOne({ where: { id } });
    if (data) {
        Store.update(
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
        res.json("Bu Id Boyuncha Store yok!");
    }
};

const Delete = async (req, res) => {
    const { id } = req.params;
    let data = await Store.findOne({ where: { id } });
    if (data) {
        Store.update(
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
        res.json("Bu Id Boyuncha Store yok!");
    }
};
const Destroy = async (req, res) => {
    const { id } = req.params;
    let data = await Store.findOne({ where: { id } });
    if (data) {
        Store.destoy({
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
        res.json("Bu Id Boyuncha Store yok!");
    }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.disActive = disActive;
exports.Active = Active;
exports.Delete = Delete;
exports.Destroy = Destroy;
