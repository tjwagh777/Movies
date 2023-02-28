import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import {searchMovieTv} from '../services/services';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [searchResult, setSearctResult] = useState([]);
  const [error, setError] = useState([]);

  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const [data] = [...movies, ...tv];
        setSearctResult([data]);
      })
      .catch(err => {
        setError(err);
        console.errorr(error.message);
      });
  };
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Search Movie or TV Show"
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name="search-outline" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResult && searchResult.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResult}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}
          {/* When searched but no results */}
          {searchResult && searchResult.length == 0 && (
            <View style={styles.noResults}>
              <Text>Type something to start searching</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {flexBasis: 'auto', flexGrow: 1, paddingRight: 8},
  searchItems: {
    padding: 5,
  },

  noResults: {
    paddingTop: 20,
  },
});

export default Search;
