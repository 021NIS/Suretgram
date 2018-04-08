import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';

class Images extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.username
  });

  onPressItem = index => {
    console.log(`Selected image id: ${index}`);
    // TODO: Переход на detail view
  };

  keyExtractor = (item, index) => index;

  renderItem = ({ item, index }) => (
    <ListItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={params.images}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        numColumns={3}
      />
    );
  }
}

export default Images;
