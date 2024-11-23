import express from 'express';
import RideController from '../controllers/RideController';

const router = express.Router();

router
  .route('/estimate')
  .post(RideController.estimate)
  .all((req, res) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  });
router
  .route('/confirm')
  .patch(RideController.confirm)
  .all((req, res) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  });
router
  .route('/:customer_id')
  .get(RideController.getRidesByCustomerId)
  .all((req, res) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  });

export default router;
