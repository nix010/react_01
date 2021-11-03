
export default function(sequelize, Sequelize) {
  const File = sequelize.define("files", {
    url: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
      validate:{
        isIn: {
          args: [['image', 'video']],
          msg: "Must be 'video' or 'image'"
        },
      }
    }
  });
  return File;
};
