import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {SafeAreaView, View} from 'react-native-safe-area-context';
import {FlatList, StyleSheet} from 'react-native'; // Corrected import statement

function ListAPI(props) {
  const {data} = props;
  const [loading, setLoading] = useState();

  const renderComponents = () => {
    if (typeof data.categories === 'undefined') {
      console.log('undefined');
      return <Text>Loading</Text>;
    } else {
      return (
        <FlatList
          data={data.categories}
          renderItem={item => {
            return <Text style={styles.coolText}>{item.item.category}</Text>;
          }}
        />
      );
    }
  };

  return <SafeAreaView style={styles.FlatListContainer}>{renderComponents()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  coolText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff00a9',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 20,
  },
  FlatListContainer: {
    flex: 1,
  },
});

export default ListAPI;
