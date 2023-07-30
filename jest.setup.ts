const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.json"); // Importar a configuração do banco de dados

// Configurar o banco de dados MySQL
const sequelize = new Sequelize(
  config.test.database,
  config.test.username,
  config.test.password,
  {
    host: config.test.host,
    dialect: config.test.dialect,
    logging: false,
  }
);

// Importar o modelo User e inicializá-lo com o Sequelize
const User = require('./src/models/User');
User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: false
});

// Sincronizar o modelo com o banco de dados MySQL antes dos testes
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Limpar os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});
