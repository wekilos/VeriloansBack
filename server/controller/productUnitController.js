var Sequelize = require("sequelize");
const { ProductUnit } = require("../../models");
const Op = Sequelize.Op;

const getAll = async (req, res) => {
    ProductUnit.findAll({
        where: {
            active: true,
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
    const data = await ProductUnit.findOne({ where: { id: id } });
    if (data) {
        ProductUnit.findOne({
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
        res.send("BU ID boyuncha ProductUnit yok!");
    }
};

const create = async (req, res) => {
    const { title } = req.body;
    const exist = await ProductUnit.findOne({
        where: {
            title: title,
        },
    });
    if (!exist) {
        ProductUnit.create({
            title,
            active: true,
            deleted: false,
        })
            .then(async (data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json("create ProductUnit:", err);
            });
    } else {
        res.json("BU at boyuncha ProductUnit status bar");
    }
};

const update = async (req, res) => {
    const { title, id } = req.body;
    const exist = await ProductUnit.findOne({
        where: {
            id: id,
        },
    });
    if (exist) {
        ProductUnit.update(
            {
                title,
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
                res.json("update ProductUnit:", err);
            });
    } else {
        res.json("BU id boyuncha ProductUnit  yok!");
    }
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let data = await ProductUnit.findOne({ where: { id } });
    if (data) {
        ProductUnit.update(
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
        res.json("Bu Id Boyuncha ProductUnit yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let data = await ProductUnit.findOne({ where: { id } });
    if (data) {
        ProductUnit.update(
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
        res.json("Bu Id Boyuncha ProductUnit yok!");
    }
};

const Delete = async (req, res) => {
    const { id } = req.params;
    let data = await ProductUnit.findOne({ where: { id } });
    if (data) {
        ProductUnit.update(
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
        res.json("Bu Id Boyuncha ProductUnit yok!");
    }
};
const Destroy = async (req, res) => {
    const { id } = req.params;
    let data = await ProductUnit.findOne({ where: { id } });
    if (data) {
        ProductUnit.destoy({
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
        res.json("Bu Id Boyuncha ProductUnit yok!");
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
