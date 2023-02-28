import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Card from './Card';
import {PropTypes} from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.object,
};

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.txt}>{title}</Text>
        </View>
        <FlatList
          data={content}
          horizontal={true}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {marginTop: 25},
  txt: {fontSize: 20, fontWeight: 'bold', padding: 10, paddingBottom: 20},
});

List.propTypes = propTypes;

export default List;
