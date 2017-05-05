import { connect } from 'react-redux';
import { setTitle } from 'reducers/home';

import Home from './home.js';

const mapStateToProps = ({ home }) => ({
  title: home.payload
});

const mapDispatchToProps = dispatch => ({
  setTitle: title => dispatch(setTitle(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
