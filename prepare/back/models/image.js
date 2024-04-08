const { sequelize } = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define(
    "image",
    {
      src: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  image.associate = (db) => {
    db.image.belongsTo(db.post); // 이미지는 어떤 게시글에 속해있다.
  };

  return image;
}