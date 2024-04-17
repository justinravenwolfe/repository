const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: { attributes: [] } // Exclude attributes from ProductTag model
      }
    ]
  })
    .then(products => res.status(200).json(products))
    .catch(err => res.status(500).json(err));
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: { attributes: [] } // Exclude attributes from ProductTag model
      }
    ]
  })
    .then(product => {
      if (!product) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.status(200).json(product);
    })
    .catch(err => res.status(500).json(err));
});

// delete one product
router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: { id: req.params.id }
  })
    .then(product => {
      if (!product) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch(err => res.status(500).json(err));
});
router.post('/', (req, res) => {
  Product.create(req.body)
  .then(tag => res.status(200).json(tag))
  .catch(err => res.status(400).json(err))
});
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Product.update(req.body, {
    where: {id: req.params.id}
  })
  .then(tag => {
    if(!tag[0]){
      res.status(404).json({message: 'Product not found'});
      return;
    }
    res.status(200).json({message: 'Product successfully updating'})
  }).catch(err => res.status(400).json(err));
});

module.exports = router;
