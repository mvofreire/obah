import Model from "components/Model";

class OfferProgram extends Model {
  static tableName = "offer_program";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      start_date: { type: DataTypes.DATE, allowNull: false },
      end_date: { type: DataTypes.DATE, allowNull: false },
      min_participants: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true }
    });
  }

  static associate({ Store }) {
    this.belongsTo(Store, {
      as: "owner",
      foreignKey: "id",
      sourceKey: "owner_id"
    });
  }
}

export default OfferProgram;
