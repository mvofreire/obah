import Model from "components/Model";

class EventParticipant extends Model {
  static tableName = "event_participant";

  static init(DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }
    });
  }
}

export default EventParticipant;
