import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { validateRSS } from 'actions/rss';
import classes from './Main.scss';

const Main = (props) => {
  const [rssUrl, setRssUrl] = useState('');

  const setRssUrlHandler = value => {
    const text = value;

    setRssUrl(text);
    props.validateRSS(text);
  };

  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} noValidate>
        <Typography component="h1" variant="h5">
          Check the RSS feed
        </Typography>
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
          onInput={e => setRssUrlHandler(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {}}
        >
          Check RSS
        </Button>
      </form>
    </Container>
  );
};

Main.propTypes = {
  validateRSS: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
};

// const mapStateToProps = state => ({
//   user: state.user.user,
// });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      validateRSS,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Main);
