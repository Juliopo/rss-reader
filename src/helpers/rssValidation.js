export const isValidRss = str => {
  const parsed = /<m:validity>(.*?)<\/m:validity>/g.exec(str);
  // eslint-disable-next-line eqeqeq
  return parsed && parsed.length && parsed[1] == 'true';
};
