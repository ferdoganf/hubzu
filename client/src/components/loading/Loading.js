import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Loading extends React.Component {
  render() {
    return (
      <Dimmer style={{ zIndex: 10000 }} active={this.props.loadingVisible}>
        <Loader size='massive'></Loader>
      </Dimmer>
    );
  }
}


// CONFIGURE COMPONENT PROP TYPES

Loading.propTypes = {
  loadingVisible: PropTypes.bool
};

const mapStateToProps = state => {
  const { loadingVisible } = state.pageReducer;
  return { loadingVisible };
};

const hoc = connect(mapStateToProps, null)(Loading);


// EXPORT COMPONENT

export { hoc as Loading };
