import db from "./models/index.js";
import express from "express";
import cors from "cors";

import {
  errorHandlingMiddleware,
  loggingMiddleware,
  authenticationMiddleware,
  errorResponse
} from "./middleware.js";
import { scrapeUrl } from "./scraper.js";
import { FileQuery } from "./fileQuery.js";

const app = express();
const port = 3001; // FE is on 3000 already

app.use(express.json());
app.use(cors());
app.use(authenticationMiddleware);
app.use(loggingMiddleware);


const insertFileIfNotExist = (data, type) => {
  data.map(d => {
    db.file.findOne({
      where: {url: d['url']},
    }).then(file => {
      if (!file){
        db.file.create({...d, type}).catch(e => {
          console.error("error inserting " + d['url']);
        })
      }
    });
  });
};

app.get('/urls', async (req, res) => {
  const data = await new FileQuery(req.query).retrieveData();
  res.send({data});
});

app.post('/urls', async (req, res) => {
  const { urls } = req.body;
  if (!Array.isArray(urls) || urls.filter(u => typeof u !== 'string').length){
    return errorResponse(res, "urls must be an array of string")
  }
  const results = await Promise.all(urls.map(url => scrapeUrl(url)));

  results.forEach(result => {
    if(!result){
      return
    }
    const {imgTags, videoTags} = result;
    insertFileIfNotExist(imgTags, 'image');
    insertFileIfNotExist(videoTags, 'video');
  });
  res.send({results});
});

app.use(errorHandlingMiddleware);

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  await db.sequelize.sync({ force: true });
});