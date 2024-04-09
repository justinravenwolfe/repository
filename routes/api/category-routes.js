const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [{
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: { attributes: [] } // Exclude attributes from ProductTag model
      }]
    }]
  })
    .then(categories => res.status(200).json(categories))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [{
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: { attributes: [] } // Exclude attributes from ProductTag model
      }]
    }]
  })
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.status(200).json(category);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(category => res.status(200).json(category))
  .catch(err => res.status(400).json(err)); 
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {id: req.params.id}
  })
  .then(category => {
    if(!category[0]){
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.status(200).json({message: 'Updated Successfully'});
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}
  }).then(category => {
    if(!category){
      res.status(404).json({message: 'category not found'});
      return;
    }
    res.status(200).json({message: 'Deleted Successfully'});
  })
  .catch(err => res.status(500).json(err))
});

module.exports = router;
