var Sequelize = require("sequelize");
const { ProductUnit, Product } = require("../../models");
const Op = Sequelize.Op;

const getAll = async (req, res) => {
    const { active, name, code, deleted } = req.query;
    const Active = active ? { active: active } : { active: true };
    const Deleted = deleted ? { deleted: deleted } : { deleted: false };
    const Name =
        name &&
        (name?.length > 0
            ? {
                  [Op.or]: [{ name: { [Op.like]: `%${name}%` } }],
              }
            : null);
    const Code =
        code &&
        (code?.length > 0
            ? {
                  [Op.or]: [{ code: { [Op.like]: `%${code}%` } }],
              }
            : null);

    Product.findAll({
        include: [{ model: ProductUnit }],

        where: {
            [Op.and]: [Active, Name, Code, Deleted],
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
    const data = await Product.findOne({ where: { id: id } });
    if (data) {
        Product.findOne({
            include: [{ model: ProductUnit }],
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
        res.send("BU ID boyuncha Product yok!");
    }
};

const create = async (req, res) => {
    const { name, code, price, credit_precentage, discount, ProductUnitId } =
        req.body;

    Product.create({
        name,
        code,
        price,
        credit_precentage,
        discount,
        ProductUnitId,
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
};

const update = async (req, res) => {
    const {
        name,
        code,
        price,
        credit_precentage,
        discount,
        ProductUnitId,
        id,
    } = req.body;
    const exist = await Product.findOne({
        where: {
            id: id,
        },
    });
    if (exist) {
        Product.update(
            {
                name,
                code,
                price,
                credit_precentage,
                discount,
                ProductUnitId,
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
                res.json("update Product:", err);
            });
    } else {
        res.json("BU id boyuncha Product  yok!");
    }
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let data = await Product.findOne({ where: { id } });
    if (data) {
        Product.update(
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
        res.json("Bu Id Boyuncha Product yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let data = await Product.findOne({ where: { id } });
    if (data) {
        Product.update(
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
        res.json("Bu Id Boyuncha Product yok!");
    }
};

const Delete = async (req, res) => {
    const { id } = req.params;
    let data = await Product.findOne({ where: { id } });
    if (data) {
        Product.update(
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
        res.json("Bu Id Boyuncha Product yok!");
    }
};
const Destroy = async (req, res) => {
    const { id } = req.params;
    let data = await Product.findOne({ where: { id } });
    if (data) {
        Product.destroy({
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
        res.json("Bu Id Boyuncha Product yok!");
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
