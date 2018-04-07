import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator
} from 'react-native';

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
      <View style={styles.container}>
        <Text style={styles.description}>Найдите фотки друзей</Text>
        <Text style={styles.description}>Напишите никнэйм</Text>
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged}
            placeholder="Поиск по никнэйму"
          />
          <Button
            onPress={this.onSearchPressed}
            color="#48BBEC"
            title="Найти"
          />
        </View>
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

export default Home;
