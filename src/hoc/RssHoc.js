import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { validateRSS, getRSSFromUrl, paginateRssList } from 'actions/rss';

const rssListShape = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
  })
);

export const paginationShape = PropTypes.shape({
  list: rssListShape,
  paginationShape: rssListShape,
  perPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
});

const RssHoc = Component => {
  const HOC = ({
    isValidRss,
    isLoading,
    dispatchedValidateRSS,
    dispatchGetRSSFromUrl,
    dispatchPaginateRssList,
    rss,
    error,
  }) => {
    const { totalItems, perPage } = rss;
    let totalPages = 0;

    if (totalItems && perPage) {
      totalPages = Math.ceil(totalItems / perPage);
    }

    return (
      <Component
        isValidRss={isValidRss}
        isLoading={isLoading}
        validateRSS={dispatchedValidateRSS}
        getRSSFromUrl={dispatchGetRSSFromUrl}
        rss={rss}
        error={error}
        totalPages={totalPages}
        paginateRssList={dispatchPaginateRssList}
      />
    );
  };

  const mapStateToProps = state => ({
    isValidRss: state.rss.isValidRss,
    isLoading: state.rss.isLoading,
    rss: state.rss.rss,
    error: state.rss.error,
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        dispatchedValidateRSS: validateRSS,
        dispatchGetRSSFromUrl: getRSSFromUrl,
        dispatchPaginateRssList: paginateRssList,
      },
      dispatch
    );

  HOC.defaultProps = { error: null };
  HOC.propTypes = {
    isValidRss: PropTypes.bool.isRequired,
    dispatchedValidateRSS: PropTypes.func.isRequired,
    dispatchGetRSSFromUrl: PropTypes.func.isRequired,
    dispatchPaginateRssList: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    rss: paginationShape,
    error: PropTypes.string,
  };

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
};

export default RssHoc;
