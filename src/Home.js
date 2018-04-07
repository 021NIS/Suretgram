import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const urlForNickname = nickname =>
  `https://www.instagram.com/${nickname}/?__a=1`;

class Home extends Component {
  static navigationOptions = {
    title: 'Suretgram'
  };

  constructor(props) {
    super(props);
    this.state = {
      searchString: 'zerotoonelabs',
      isLoading: false,
      message: ''
    };
  }

  onSearchTextChanged = event => {
    this.setState({ searchString: event.nativeEvent.text });
  };

  onSearchPressed = () => {
    const query = urlForNickname(this.state.searchString);
    this.executeQuery(query);
  };

  executeQuery = query => {
    console.log(query);
    this.setState({ isLoading: true });
    // eslint-disable-next-line
    fetch(query)
      .then(response => response.json())
      .then(json => this.handleResponse(json))
      .catch(() =>
        this.setState({
          isLoading: false,
          message: 'Пользователь не найден. Проверьте соединение с интернетом.'
        })
      );
  };

  handleResponse = response => {
    const { username } = response.graphql.user;
    const images = response.graphql.user.edge_owner_to_timeline_media.edges.map(
      edge => edge.node
    );
    this.setState({ isLoading: false, message: '' });
    this.props.navigation.navigate('Images', {
      username,
      images
    });
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Image source={require('./assets/logo.png')} style={styles.image} />
        <Text style={styles.description}>Напишите никнэйм</Text>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.searchInput}
          value={this.state.searchString}
          onChange={this.onSearchTextChanged}
          placeholder="Поиск по никнэйму"
        />
        <TouchableOpacity onPress={this.onSearchPressed} style={styles.button}>
          <Text style={styles.buttonTitle}>Найти</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{this.state.message}</Text>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 50,
    paddingHorizontal: 25,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 100,
    height: 100
  },
  button: {
    height: 44,
    width: '100%',
    backgroundColor: '#e1306c',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18
  },
  searchInput: {
    height: 36,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#e1306c',
    borderRadius: 8,
    color: 'black',
    marginBottom: 20,
    width: '100%'
  }
});

export default Home;
