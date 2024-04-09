const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include:[{
      model: Product,
      attributes: ['id', 'product_name', 'price','stock'],
      through: {attributes: []}
    }]
  })
  .then(tags => res.status(200).json(tags))
  .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {id: req.params.id},
    include: [{
      model: Product,
      attributes: ['id', 'product_name','price','stock'],
      through: {attributes: []}
    }]
  }).then(tag => {
    if(!tag){
      res.status(404).json({message: 'Tag not found'});
      return;
    }
    res.status(200).json(tag);
  }).catch(err => res.status(404).json(err))
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(tag => res.status(200).json(tag))
  .catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {id: req.params.id}
  })
  .then(tag => {
    if(!tag[0]){
      res.status(404).json({message: 'Tag not found'});
      return;
    }
    res.status(200).json({message: 'Tag successfully updating'})
  }).catch(err => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {id: req.params.id}
  }).then(tag => {
    if(!tag){
      res.status(404).json({message: 'tag not found'});
      return;
    }
    res.status(200).json({message: 'Deleted successfully'});
  }).catch(err => res.status(500).json(err))
});

module.exports = router;
