import Model from "components/Model";

export const EVENT_TYPES = {
  PRIVATE: "P",
  HAPPY_HOUR: "H",
  CONVERSATION: "C",
  DINNER: "D"
};

class Event extends Model {
  static tableName = "event";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: { type: DataTypes.STRING(255), allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      type: {
        type: DataTypes.ENUM,
        values: Object.values(EVENT_TYPES),
        allowNull: false
      },
      views: { type: DataTypes.INTEGER },
      metadata: { type: DataTypes.JSONB, default: "{}" }
    });
  }

  static associate({ User, Offer }) {
    this.belongsTo(User, {
      as: "creator",
      foreignKey: "id",
      targetKey: "id"
    });

    this.belongsToMany(User, {
      as: "participants",
      through: "EventParticipant"
    });

    this.belongsTo(Offer, {
      as: "winner",
      foreignKey: "id",
      sourceKey: "winner_id"
    });
  }
}

export default Event;
