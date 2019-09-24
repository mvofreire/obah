import Model from "components/Model";

class Store extends Model {
  static tableName = "store";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: { type: DataTypes.STRING(), allowNull: false },
      active: { type: DataTypes.BOOLEAN }
    });
  }

  static associate({ Offer, OfferProgram }) {
    this.hasMany(Offer, {
      as: "offers",
      foreignKey: "owner_id",
      sourceKey: "id"
    });

    this.hasMany(OfferProgram, {
      as: "programs",
      foreignKey: "owner_id",
      sourceKey: "id"
    });
  }
}

export default Store;
