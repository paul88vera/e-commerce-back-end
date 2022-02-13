const router = require("express").Router();
const { Category, Product, ProductTag, Tag } = require("../../models");
const { sequelize } = require("../../models/Product");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    attributes: { exclude: ["password"] },
    // be sure to include its associated Products
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
      // be sure to include its associated Products
      include: {
        model: Product,
        attributes: [Tag]
      }
  })
    .then(dbCategoryData => {
      res.json(dbCategoryData)
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
    })

});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
