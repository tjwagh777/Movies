import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GetDocumentaryMovies,
  GetFamilyMovies,
  GetPopularMovies,
  GetPopularTv,
  GetUpcomingMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimm = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImg, setMoviesImg] = useState([]);
  const [popularMovies, setPopularMovies] = useState({});
  const [familyMovies, setFamilyMovies] = useState({});
  const [docMovies, setDocMovies] = useState({});
  const [popularTv, setPopularTv] = useState({});
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      GetUpcomingMovies(),
      GetPopularMovies(),
      GetPopularTv(),
      GetFamilyMovies(),
      GetDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          moviesImgData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          docMoviesData,
        ]) => {
          const moviesImgArray = [];
          moviesImgData.forEach(movie => {
            moviesImgArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            ); //poster_path is comming form api as object
          });
          setMoviesImg(moviesImgArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocMovies(docMoviesData);
        },
      )
      .catch(err => setError(err))
      .finally(() => setLoaded(true));

    // GetUpcomingMovies()
    //   .then(movies => {
    //     const moviesImgArray = [];
    //     movies.forEach(movie => {
    //       moviesImgArray.push(
    //         'https://image.tmdb.org/t/p/w500' + movie.poster_path,
    //       ); //poster_path is comming form api as object
    //     });
    //     setMoviesImg(moviesImgArray);
    //   })
    //   .catch(err => {
    //     setError(err);
    //   });

    // GetPopularMovies()
    //   .then(movies => setPopularMovies(movies))
    //   .catch(err => setError(err));

    // GetPopularTv()
    //   .then(movies => setPopularTv(movies))
    //   .catch(err => setError(err));

    // GetFamilyMovies()
    //   .then(movies => setFamilyMovies(movies))
    //   .catch(err => setError(err));

    // GetDocumentaryMovies()
    //   .then(movies => setDocMovies(movies))
    //   .catch(err => setError(err));
  }, []);

  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {moviesImg && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImg}
                dotStyle={{height: 0}}
                sliderBoxHeight={dimm.height / 1.5}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}
          {/* Popular Movie */}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movie"
                content={popularMovies}
              />
            </View>
          )}
          {/* Popular TV Show */}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV Show"
                content={popularTv}
              />
            </View>
          )}
          {/*Family Movies  */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {/* Documentary */}
          {docMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary"
                content={docMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  carousel: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Home;
