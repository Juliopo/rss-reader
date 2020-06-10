import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { validateRSS, getRSSFromUrl } from 'actions/rss';

const RssHoc = Component => {
  const HOC = ({
    isValidRss,
    isLoading,
    dispatchedValidateRSS,
    dispatchGetRSSFromUrl,
    list,
    error,
  }) => {
    return (
      <Component
        isValidRss={isValidRss}
        isLoading={isLoading}
        validateRSS={dispatchedValidateRSS}
        getRSSFromUrl={dispatchGetRSSFromUrl}
        list={list}
        error={error}
      />
    );
  };

  const mapStateToProps = state => ({
    isValidRss: state.rss.isValidRss,
    isLoading: state.rss.isLoading,
    list: state.rss.list,
    error: state.rss.error,
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        dispatchedValidateRSS: validateRSS,
        dispatchGetRSSFromUrl: getRSSFromUrl,
      },
      dispatch
    );

  HOC.defaultProps = { list: [], error: null };
  HOC.propTypes = {
    isValidRss: PropTypes.bool.isRequired,
    dispatchedValidateRSS: PropTypes.func.isRequired,
    dispatchGetRSSFromUrl: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string,
  };

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
};

export default RssHoc;
