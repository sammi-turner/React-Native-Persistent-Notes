import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, FlatList, TextInput, Button, TouchableOpacity, Text, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@tasks');
        if (jsonValue != null) setTasks(JSON.parse(jsonValue));
      } catch (e) {
        // error reading value
      }
    };
    loadTasks();
  }, []);

  const addNote = async () => {
    try {
      const newTasks = [...tasks, { key: Date.now().toString(), value: text }];
      setTasks(newTasks);
      const jsonValue = JSON.stringify(newTasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
      setText('');
    } catch (e) {
      // saving error
    }
  };

  const deleteNote = async (key) => {
    try {
      const newTasks = tasks.filter(task => task.key !== key);
      setTasks(newTasks);
      const jsonValue = JSON.stringify(newTasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
    } catch (e) {
      // error removing value
    }
  };

  return (
    <SafeAreaView style={isDarkMode ? styles.containerDark : styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={isDarkMode ? styles.headerTextDark : styles.headerText}>Persistent Notes</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
          />
        </View>
        <TextInput
          style={isDarkMode ? styles.inputDark : styles.input}
          onChangeText={setText}
          value={text}
        />
        <Button style={isDarkMode ? styles.addButtonDark : styles.addButton}
          onPress={addNote}
          title="ADD"
        />
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View style={isDarkMode ? styles.listItemDark : styles.listItem}>
              <Text style={isDarkMode ? styles.itemTextDark : styles.itemText}>{item.value}</Text>
              <Button
                onPress={() => deleteNote(item.key)}
                title="x"
              />
            </View>
          )}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e5f1',
    paddingHorizontal: 10,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#484b6a',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#484b6a',
  },
  headerTextDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e4e5f1',
  },
  input: {
    height: 60,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e4e5f1',
    color: '#484b6a',
    marginVertical: 10,
  },
  inputDark: {
    height: 60,
    borderWidth: 1,
    borderColor: '#e4e5f1',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#484b6a',
    color: '#e4e5f1',
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d2d3db',
    padding: 15,
    borderRadius: 20,
    marginVertical: 8,
  },
  listItemDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d2d3db',
    padding: 15,
    borderRadius: 20,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 20,
    color: '#111',
  },
  itemTextDark: {
    fontSize: 20,
    color: '#111',
  },
  addButton: {
    padding: 10,
    borderRadius: 20,
    color: '#484b6a',
  },
  addButtonDark: {
    padding: 10,
    borderRadius: 20,
    color: '#e4e5f1',
  },
});

export default App;
