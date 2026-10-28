import { Router } from 'express';
import {
  getDeals,
  createDeal,
  updateDealStage,
  deleteDeal,
  getLeads,
  createLead,
  updateLeadStatus,
  getReviews,
  getMessages,
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../controllers/crmController.js';

const router = Router();

// Deals & Pipeline
router.route('/deals')
  .get(getDeals)
  .post(createDeal);

router.route('/deals/:id/stage')
  .patch(updateDealStage);

router.route('/deals/:id')
  .delete(deleteDeal);

// Leads & Inquiries
router.route('/leads')
  .get(getLeads)
  .post(createLead);

router.route('/leads/:id/status')
  .patch(updateLeadStatus);

// Reviews & Messages
router.get('/reviews', getReviews);
router.get('/messages', getMessages);

// Promotional Hero Banners
router.route('/banners')
  .get(getBanners)
  .post(createBanner);

router.route('/banners/:id')
  .put(updateBanner)
  .delete(deleteBanner);

export default router;
