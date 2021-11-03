import db from "./models/index.js";

export class FileQuery{

  constructor(params) {
    this.baseQuery = db.file;
    this.params = params;
    this.itemPerPage = 10;
    this.queryOptions = {
      conditionOpt: db.Sequelize.Op.and,
      offset: 0,
    };
    this.paramAllow = ['title', 'type', 'page'];
  }

  async retrieveData(){
    const func = {
      title: this.queryByTitle,
      type: this.queryByType,
      page: this.queryByPage,
    };
    for (const [key, value] of Object.entries(this.params)) {
      if(this.paramAllow.indexOf(key) !== -1 && value){
        this.queryOptions = {...this.queryOptions, ...func[key].bind(this)()};
      }
    }
    const {itemPerPage} = this;
    const {conditionOpt, type, title, offset} = this.queryOptions;

    const where = [];
    if (type) where.push({type});
    if (title) where.push({title});

    const queryParams = {
      where: where.length ? {[conditionOpt]: where} : {},
    };
    const data = await this.baseQuery.findAndCountAll({...queryParams, offset, limit: itemPerPage});
    return {
      data: data.rows, dataCount:data.count, itemPerPage
    }
  }

  queryByType(){
    const {type} = this.params;
    if(['video', 'image'].indexOf(type) === -1){
      return
    }
    return {type}
  }

  queryByTitle(){
    return {
      title: {
        [db.Sequelize.Op.like]: `%${this.params.title}%`
      }
    };
  }

  queryByPage(){
    const {page} = this.params;
    if(isNaN(page)) {
      return;
    }
    return {offset: Math.max(page - 1, 0) * this.itemPerPage};
  }
};
