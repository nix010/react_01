import axios from "axios";
import cheerio from 'cheerio';

const elementConditions = (_, {attribs}) => attribs['src'] && attribs['alt'] &&
  (attribs['src'].startsWith('http://') || attribs['src'].startsWith('https://'));

const mapElement = (_, {attribs}) => {
  const url = attribs['src'].toString();
  const title = attribs['alt'].toString();
  return {url: url, title: title}
};

const extractUsableTags = (tags) => tags.filter(elementConditions).map(mapElement).get();

export const scrapeUrl = async url => {
  // Let's say we disregard the site's robot policies
  try{
    const resp = await axios.get(url, {timeout: 5 * 1000});
    if (resp.headers['content-type'].indexOf('text/html') === -1){
      // Not html format response
      return null
    }
    const $ = cheerio.load(resp.data);
    // only media with name attached
    const imgTags = extractUsableTags($('img[src][alt]'));
    const videoTags = extractUsableTags($('video[src][alt]'));
    return {
      imgTags, videoTags
    }
  }
  catch (error) {
    console.error(`error scraping url: ${url}`);
    console.error(error);
    return null
  }
};
