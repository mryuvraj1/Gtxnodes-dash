const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

exports.getCategories = async (req, res) => {
  const categories = await Category.find().sort('order');
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const { name, slug, icon, order } = req.body;
  const category = await Category.create({ name, slug, icon, order });
  res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
};

// Subcategories
exports.getSubcategories = async (req, res) => {
  const subcats = await Subcategory.find().populate('categoryId');
  res.json(subcats);
};

exports.createSubcategory = async (req, res) => {
  const sub = await Subcategory.create(req.body);
  res.status(201).json(sub);
};

exports.updateSubcategory = async (req, res) => {
  const sub = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(sub);
};

exports.deleteSubcategory = async (req, res) => {
  await Subcategory.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};