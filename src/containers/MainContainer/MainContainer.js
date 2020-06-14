/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Pagination from '@material-ui/lab/Pagination';
import { paginatedShape } from 'hoc/RssHoc';
import loadingImg from 'public/imgs/loading.gif';
import useDebounce from 'hooks/useDebounce';
import RssItem from 'components/RssItem';
import classes from './MainContainer.scss';

const DEBOUNCE_TIME = 300;

const MainContainer = ({
  validateRSS,
  isValidRss,
  isLoading,
  getRSSFromUrl,
  rss,
  totalPages,
  error,
  paginateRssList,
}) => {
  const [rssUrl, setRssUrl] = useState('');
  const debouncedSearchTerm = useDebounce(rssUrl, DEBOUNCE_TIME);

  useEffect(() => {
    validateRSS(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const renderIcons = () => {
    if (isLoading) {
      return (
        <img alt="loading" src={loadingImg} className={classes.loadingIcon} />
      );
    }

    if (isValidRss) {
      return <RssFeedIcon className={classes.rssIcon} />;
    }

    return <ClearRoundedIcon className={classes.errorIcon} />;
  };

  const handlePagination = (ev, value) => {
    paginateRssList(value);
  };

  const renderRssList = ls => {
    // eslint-disable-next-line react/no-array-index-key
    return ls.map((item, inc) => <RssItem key={inc} item={item} />);
  };

  return (
    <Container maxWidth="sm">
      <form className={classes.form} noValidate>
        <Typography component="h1" variant="h5">
          Check the RSS feed ex: https://codepen.io/picks/feed/
        </Typography>
        <div className={classes.rssInput}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="rssFeed"
            label="RSS url"
            placeholder="Insert a RSS feed url"
            name="rssFeed"
            autoComplete="url"
            autoFocus
            onInput={e => setRssUrl(e.target.value)}
          />
          {renderIcons()}
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={e => {
            e.preventDefault();
            getRSSFromUrl(rssUrl);
          }}
          disabled={!isValidRss || isLoading}
        >
          GET RSS FEED
        </Button>
        {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )}
        {!isValidRss && (
          <Alert className={classes.alert} severity="warning">
            Please insert a valid RSS url
          </Alert>
        )}
      </form>
      <div>{renderRssList(rss.paginatedList)}</div>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={rss.currentPage}
          onChange={handlePagination}
        />
      )}
    </Container>
  );
};

MainContainer.defaultProps = {
  isValidRss: false,
  isLoading: false,
  error: null,
};

MainContainer.propTypes = {
  validateRSS: PropTypes.func.isRequired,
  getRSSFromUrl: PropTypes.func.isRequired,
  isValidRss: PropTypes.bool,
  isLoading: PropTypes.bool,
  rss: paginatedShape,
  error: PropTypes.string,
  totalPages: PropTypes.number.isRequired,
  paginateRssList: PropTypes.func.isRequired,
};

export default MainContainer;
