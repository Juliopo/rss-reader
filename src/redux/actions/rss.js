export const VALIDATE_RSS = 'VALIDATE_RSS';
export const VALIDATE_RSS_SUCCESS = 'VALIDATE_RSS_SUCCESS';
export const GET_RSS_LIST = 'GET_RSS_LIST';
export const GET_RSS_LIST_SUCCESS = 'GET_RSS_LIST_SUCCESS';

export const getRSSFromUrl = rssUrl => dispatch => {
  dispatch({ type: GET_RSS_LIST });
  fetch(rssUrl)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
      const items = data.querySelectorAll('item');
      let html = ``;
      items.forEach(el => {
        html += `
            <article>
            <img src="${
              el.querySelector('link').innerHTML
            }/image/large.png" alt="">
            <h2>
                <a href="${
                  el.querySelector('link').innerHTML
                }" target="_blank" rel="noopener">
                ${el.querySelector('title').innerHTML}
                </a>
            </h2>
            </article>
        `;
      });
      console.log(html);
    });
};

export const validateRSS = rssUrl => dispatch => {
  dispatch({ type: VALIDATE_RSS });
  const validationHost = '/validate-rss';
  const validationUrl = `${validationHost}?url=${rssUrl}&output=soap12`;
  fetch(validationUrl, {
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/xml',
    },
  })
    .then(response => response.text())
    .then(str => {
      const parsed = /<m:validity>(.*?)<\/m:validity>/g.exec(str);
      // eslint-disable-next-line eqeqeq
      const isValid = parsed && parsed.length && parsed[1] == 'true';

      dispatch({ type: VALIDATE_RSS_SUCCESS, isValid });
    })
    .catch(() => {
      dispatch({ type: VALIDATE_RSS_SUCCESS, isValid: false });
    });
};
