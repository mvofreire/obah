import Model from "components/Model";

class Offer extends Model {
  static tableName = "offer";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: { type: DataTypes.STRING(255) },
      subtitle: { type: DataTypes.STRING(255) },
      start_date: { type: DataTypes.DATE },
      end_date: { type: DataTypes.DATE }
    });
  }

  static associate({ Store, Event }) {
    this.belongsTo(Store, {
      as: "owner",
      foreignKey: "id",
      sourceKey: "owner_id"
    });
    this.hasOne(Event, {
      as: "winner",
      foreignKey: "winner_id",
      sourceKey: "id"
    });
  }
}

export default Offer;
