const { sequelize } = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const hashtag = sequelize.define(
    "hashtag",
    {
      // MySQL에는 users로 테이블 생성
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  hashtag.associate = (db) => {
    db.hashtag.belongsToMany(db.post, { through: "postHashtag" }); // 여러 해시태그에 여러 게시글이 있을 수 있다.
  };

  return hashtag;
}