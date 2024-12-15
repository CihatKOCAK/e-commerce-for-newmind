const campaignService = require("../services/campaignService");
const redisClient = require("../config/redis");

// Cache süresi (TTL - Time To Live) bir gün (86400 saniye)
const cacheTTL = 86400 * 7; // 1 hafta

class CampaignController {
  async create(req, res) {
    try {
      const campaign = await campaignService.createCampaign(req.body);

      // Yeni kampanya oluşturulduğunda cache'i temizle
      await redisClient.del("campaigns"); // Tüm kampanyaların cache'ini temizle

      res.status(201).json({ message: "Campaign created successfully", campaign });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      // Redis'te kampanyalar var mı kontrol et
      const cachedCampaigns = await redisClient.get("campaigns");

      if (cachedCampaigns) {
        // Redis'ten veri döndür
        console.log("Cache hit: campaigns");
        return res.status(200).json(JSON.parse(cachedCampaigns));
      }

      // Redis'te yoksa, veritabanından al
      const campaigns = await campaignService.getAllCampaigns();

      // Veritabanından alınan veriyi Redis'e kaydet
      await redisClient.setEx("campaigns", cacheTTL, JSON.stringify(campaigns));

      console.log("Cache miss: campaigns");
      res.status(200).json(campaigns);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const campaignId = req.params.id;

      // Redis'te bu kampanya var mı kontrol et
      const cachedCampaign = await redisClient.get(`campaign:${campaignId}`);

      if (cachedCampaign) {
        // Redis'ten veri döndür
        console.log(`Cache hit: campaign:${campaignId}`);
        return res.status(200).json(JSON.parse(cachedCampaign));
      }

      // Redis'te yoksa, veritabanından al
      const campaign = await campaignService.getCampaignById(campaignId);

      if (!campaign) return res.status(404).json({ message: "Campaign not found" });

      // Veritabanından alınan veriyi Redis'e kaydet
      await redisClient.setEx(`campaign:${campaignId}`, cacheTTL, JSON.stringify(campaign));

      console.log(`Cache miss: campaign:${campaignId}`);
      res.status(200).json(campaign);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const campaignId = req.params.id;
      const updatedCampaign = await campaignService.updateCampaign(campaignId, req.body);

      if (!updatedCampaign) return res.status(404).json({ message: "Campaign not found" });

      // Güncellemeden sonra ilgili cache'i temizle
      await redisClient.del(`campaign:${campaignId}`);
      await redisClient.del("campaigns"); // Tüm kampanyaların cache'ini temizle

      res.status(200).json({ message: "Campaign updated successfully", updatedCampaign });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const campaignId = req.params.id;
      const deletedCampaign = await campaignService.deleteCampaign(campaignId);

      if (!deletedCampaign) return res.status(404).json({ message: "Campaign not found" });

      // Silme işleminden sonra ilgili cache'i temizle
      await redisClient.del(`campaign:${campaignId}`);
      await redisClient.del("campaigns"); // Tüm kampanyaların cache'ini temizle

      res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CampaignController();
