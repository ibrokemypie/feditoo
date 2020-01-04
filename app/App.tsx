import React from 'react';
import {FlatList, ActivityIndicator, Text, View} from 'react-native';

export default class FetchExample extends React.Component<
  {},
  {
    isLoading: boolean;
    dataSource: ReadonlyArray<{
      title: string;
      releaseYear: number;
      id: string;
    }> | null;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {isLoading: true, dataSource: null};
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.movies,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
          keyExtractor={({id}, _) => id}
        />
      </View>
    );
  }
}
