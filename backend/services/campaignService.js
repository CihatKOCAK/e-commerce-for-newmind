const Campaign = require("../models/Campaign");

class CampaignService {
  async createCampaign(campaignData) {
    const campaign = new Campaign(campaignData);
    return await campaign.save();
  }

  async getAllCampaigns() {
    return await Campaign.find();
  }

  async getCampaignById(id) {
    return await Campaign.findById(id);
  }

  async updateCampaign(id, campaignData) {
    return await Campaign.findByIdAndUpdate(id, campaignData, { new: true });
  }

  async deleteCampaign(id) {
    return await Campaign.findByIdAndDelete(id);
  }
}

module.exports = new CampaignService();
