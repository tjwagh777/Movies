import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-vector-icons/Ionicons';

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable
        onPress={() => {
          handlePress();
        }}
        style={styles.btn}>
        <Icon name={'carect-forword-circle-outline'} size={30} color="#fff" />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: '#4481FC',
  },
});

export default PlayButton;
