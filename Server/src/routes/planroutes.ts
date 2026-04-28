import express from 'express';
import { auth, admin } from '../middleware/auth';
import Plan from '../models/Plan';

const router = express.Router();

// Get all plans
router.get('/', async (req, res) => {
  const { category, isActive } = req.query;
  let filter: any = {};
  if (category) filter.category = category;
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  
  const plans = await Plan.find(filter).sort('order');
  res.json(plans);
});

// Get single plan
router.get('/:id', async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  res.json(plan);
});

// Create plan (admin only)
router.post('/', auth, admin, async (req, res) => {
  const plan = await Plan.create(req.body);
  res.status(201).json(plan);
});

// Update plan (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(plan);
});

// Delete plan (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ message: 'Plan deleted' });
});

export default router;
