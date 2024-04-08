const { sequelize } = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      // MySQL에는 users로 테이블 생성
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  post.associate = (db) => {
    db.post.belongsTo(db.user); // 어떤 게시글을 어떤 작성자에게 속해있다.
    db.post.hasMany(db.comment); // 어떤 게시글에 댓글이 여러개 있을수 있다.
    db.post.hasMany(db.image); // 어떤 게시글에 이미지를 여러개 가질 수 있다.

    db.post.belongsToMany(db.hashtag, { through: "postHashtag" }); // 여러 게시글에 여러 해시태그가 속해 있다.
    db.post.belongsToMany(db.user, { through: "like", as: "likers" });

    db.post.belongsTo(db.post, { as: "retweet" }); // 리트윗
  };

  return post;
}