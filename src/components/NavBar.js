import React from 'react';
import {View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const propTypes = {main: PropTypes.bool};
const defaultProps = {
  main: false,
};

class NavBar extends React.PureComponent {
  state = {};
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon name="search-outline" size={30} color={'#fff'} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="chevron-back" size={40} color={'#ccc'} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

styles = StyleSheet.create({
  mainNav: {flex: 1, right: 1, flexDirection: 'row', padding: 10},
});
NavBar.proprTypes = propTypes;
NavBar.defaultProps = defaultProps;
export default NavBar;
