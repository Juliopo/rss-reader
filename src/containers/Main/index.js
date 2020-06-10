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
import LoopRoundedIcon from '@material-ui/icons/LoopRounded';
import RssHoc from 'hoc/RssHoc';
import useDebounce from 'hooks/useDebounce';
import classes from './Main.scss';

const DEBOUNCE_TIME = 300;

const Main = ({
  validateRSS,
  isValidRss,
  isLoading,
  getRSSFromUrl,
  list,
  error,
}) => {
  const [rssUrl, setRssUrl] = useState('');
  const debouncedSearchTerm = useDebounce(rssUrl, DEBOUNCE_TIME);

  useEffect(() => {
    validateRSS(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const renderIcons = () => {
    if (isLoading) {
      return <LoopRoundedIcon className={classes.loadingIcon} />;
    }

    if (isValidRss) {
      return <RssFeedIcon className={classes.rssIcon} />;
    }

    return <ClearRoundedIcon className={classes.errorIcon} />;
  };

  const renderRssList = ls => {
    return ls.map((item, inc) => {
      return (
        <div
          className={classes.itemContainer}
          // eslint-disable-next-line react/no-array-index-key
          key={inc}
        >
          <h2>{item.title}</h2>
          {item.description && (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>
      );
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <form className={classes.form} noValidate>
        <Typography component="h1" variant="h5">
          Check the RSS feed
        </Typography>
        <div className={classes.rssInput}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="rssFeed"
            label="RSS url"
            placeholder="Put here your RSS placeholder"
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
          Check RSS
        </Button>
        {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )}
      </form>
      <div>{renderRssList(list)}</div>
    </Container>
  );
};

Main.defaultProps = {
  isValidRss: false,
  isLoading: false,
  list: [],
  error: null,
};

Main.propTypes = {
  validateRSS: PropTypes.func.isRequired,
  getRSSFromUrl: PropTypes.func.isRequired,
  isValidRss: PropTypes.bool,
  isLoading: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
};

export default RssHoc(Main);
