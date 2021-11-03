
const baseUrl = 'http://localhost:3001';
const authHeader = {Authorization: "Basic admin:password"};


const getApi = (endpoint, params=null) => {
  let url = baseUrl + endpoint;
  if(params) {
    url = new URL(url);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  }

  return fetch(url, {
    method: "GET",
    headers: authHeader
  }).catch(e => {
    console.error("error GET url " + endpoint)
  });
};

export const postApi = (endpoint, postData) => fetch(baseUrl + endpoint, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    ...authHeader
  },
  body: JSON.stringify(postData)
}).catch(e => {
  console.error("error POST url " + endpoint)
});


export const postUrlList = ({urls}) => postApi('/urls', {urls});
export const getMediaList = ({title, type, page}) => getApi('/urls', {title, type, page});

