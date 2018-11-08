module.exports = (req, res, next) => {
    var storeId = req.body.affiliateId;
    var ownsStore = req.user.stores.find(x => x.storeId === storeId)
    if (!storeId || !ownsStore ){
        return res
          .status(401)
          .json({ success: false, message: "This store does not belong to you" });
      }
      next();
}