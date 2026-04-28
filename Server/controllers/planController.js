const Plan = require('../models/Plan');

exports.getPlans = async (req, res) => {
  const { category, subcategory, search } = req.query;
  let filter = { active: true };
  if (category) filter.categoryId = category;
  if (subcategory) filter.subcategoryId = subcategory;
  if (search) filter.name = { $regex: search, $options: 'i' };
  const plans = await Plan.find(filter).populate('categoryId subcategoryId').sort('order');
  res.json(plans);
};

exports.getPlanById = async (req, res) => {
  const plan = await Plan.findById(req.params.id).populate('categoryId subcategoryId');
  res.json(plan);
};

// Admin only
exports.createPlan = async (req, res) => {
  const plan = await Plan.create(req.body);
  res.status(201).json(plan);
};

exports.updatePlan = async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(plan);
};

exports.deletePlan = async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ message: 'Plan deleted' });
};