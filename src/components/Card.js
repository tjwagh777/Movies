import {height} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React from 'react';
import {PropTypes} from 'prop-types';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';

const placeHolderImg = require('../assets/images/poster.jpg');
const propTypes = {
  item: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {moiveId: item.id})}
        style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.img}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : placeHolderImg
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },
  img: {height: 200, width: 120, borderRadius: 20},
  movieName: {position: 'absolute', width: 100, textAlign: 'center', top: 10},
});

Card.propTypes = propTypes;
export default Card;
