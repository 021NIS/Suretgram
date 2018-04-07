import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight,
  Dimensions,
  StyleSheet
} from 'react-native';

const { width } = Dimensions.get('window');

class ListItem extends Component {
  onPress = () => {
    this.props.onPressItem(this.props.index);
  };

  render() {
    const url = this.props.url;
    return (
      <TouchableHighlight
        onPress={this.onPress}
        underlayColor="#dddddd"
        style={styles.container}
      >
        <Image source={{ uri: url }} style={styles.image} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: width / 3,
    width: width / 3
  },
  image: {
    flex: 1
  }
});

export default ListItem;
