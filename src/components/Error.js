import React from 'react';
import {PropTypes} from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';

const propTypes = {
  errorTxt1: PropTypes.string,
  errorTxt2: PropTypes.string,
};

const defaultProps = {
  errorTxt1: 'Oops! Something went wrong.',
  errorTxt2: 'Make sure you are online.',
};

class Error extends React.PureComponent {
  render() {
    const {errorTxt1, errorTxt2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>{errorTxt1}</Text>
        <Text style={styles.txt}>{errorTxt2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  txt: {color: 'red', fontWeight: 'bold'},
});
Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
export default Error;
