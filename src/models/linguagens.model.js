// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const linguagens = sequelizeClient.define('linguagens', {
    uuid:{
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true,
      isUUID: 4,
      defaultValue: Sequelize.UUIDV4
    },      
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  linguagens.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const { habilidades } = models;
    linguagens.belongsTo(habilidades);
  };

  return linguagens;
};
