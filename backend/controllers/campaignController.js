const campaignService = require("../services/campaignService");

class CampaignController {
  async create(req, res) {
    try {
      const campaign = await campaignService.createCampaign(req.body);
      res.status(201).json({ message: "Campaign created successfully", campaign });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const campaigns = await campaignService.getAllCampaigns();
      res.status(200).json(campaigns);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const campaign = await campaignService.getCampaignById(req.params.id);
      if (!campaign) return res.status(404).json({ message: "Campaign not found" });
      res.status(200).json(campaign);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedCampaign = await campaignService.updateCampaign(req.params.id, req.body);
      if (!updatedCampaign) return res.status(404).json({ message: "Campaign not found" });
      res.status(200).json({ message: "Campaign updated successfully", updatedCampaign });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedCampaign = await campaignService.deleteCampaign(req.params.id);
      if (!deletedCampaign) return res.status(404).json({ message: "Campaign not found" });
      res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CampaignController();
