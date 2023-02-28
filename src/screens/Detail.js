import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {GetDetail} from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

const placeHolderImg = require('../assets/images/poster.jpg');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [detail, setDetail] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    GetDetail(movieId).then(movieData => {
      setDetail(movieData);
      setLoaded(true);
    });
  }, []);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.img}
              source={
                detail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' + detail.poster_path,
                    }
                  : placeHolderImg
              }
            />
            <View style={styles.container}>
              <View style={styles.playbtn}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.mtitle}>{detail.title}</Text>
            </View>
            {detail.genres && (
              <View style={styles.genreContainer}>
                {detail.genres.map(genre => {
                  return (
                    <Text style={styles.genreTxt} key={genre.id}>
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={30}
              rating={detail.vore_average / 2}
              fullStarColor={'gold'}
            />
            <Text style={styles.overView}>{detail.overview}</Text>
            <Text style={styles.rDate}>
              {'Release Date :' +
                dateFormat(detail.release_date, 'dS/mmmm/yyyy')}
            </Text>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShown} />
              {/* <Pressable onPress={() => videoShown()}>
                <Text>{'hide modal'}</Text>
              </Pressable> */}
            </View>
          </Modal>
        </View>
      )}

      {!loaded && <ActivityIndicator size="large" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  img: {height: height / 2.5},
  mtitle: {fontSize: 24, fontWeight: 'bold', marginTop: 10, marginBottom: 10},
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genreTxt: {marginLeft: 10, fontWeight: 'bold'},
  overView: {padding: 15},
  rDate: {fontWeight: 'bold'},
  playbtn: {position: 'absolute', top: -20, right: 20},
  videoModal: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Detail;
