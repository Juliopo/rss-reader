import React from 'react';
import PropTypes from 'prop-types';

import classes from './RssItem.scss';

const RssItem = ({ item }) => (
  <div className={classes.itemContainer}>
    <h2>{item.title}</h2>
    {item.description && (
      <div
        className={classes.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
    )}
  </div>
);

RssItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default RssItem;
