import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState(['Milk', 'Coffee', 'Oranges', 'Bread']);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    var filteredItems = items.filter(function (el) {
      return (
        el.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    });
    setFilteredItems(filteredItems);
  }, [searchTerm]);
  const addItem = () => {
    setItems(prev => {
      return [...prev, searchTerm]
    })
    setSearchTerm('')
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchOrAdd}>
        <TextInput
          style={styles.searchBar}
          placeholder='Search...'
          placeholderTextColor='#a3a3a3'
          value={searchTerm}
          onChangeText={(e) => setSearchTerm(e)}
        />
        <TouchableOpacity
          disabled={!(searchTerm.length > 0 && filteredItems.length === 0)}
          onPress={addItem}
          style={styles.button}
        ><Text style={styles.buttonText}>+</Text></TouchableOpacity></View>
      <View style={styles.line} />
      <View style={styles.listContainer}>
        <FlatList
          data={filteredItems && filteredItems.length > 0 ? filteredItems : ['No Data']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        /></View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    padding: 20,
  },
  searchOrAdd: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,

  },
  searchBar: {
    fontSize: 24,
    width: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    color: 'black',
    height: '100%'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    backgroundColor: '#c9c9c9',
    height: '100%'
  },
  buttonText: {
    color: 'black',
    fontSize: 30
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
    marginVertical: 15
  },
  listContainer: {
    width: '100%'
  },
  item: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
    marginBottom: 10
  },
});

export default App;