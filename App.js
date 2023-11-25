import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editingNote, setEditingNote] = useState(null);
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
      const newTasks = editingNote ? tasks.map(t => t.key === editingNote.key ? { ...t, value: text } : t) : [...tasks, { key: Date.now().toString(), value: text }];
      setTasks(newTasks);
      const jsonValue = JSON.stringify(newTasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
      setText('');
    } catch (e) {
      // saving error
    }
  };

  
  const startEditing = (note) => {
    setEditingNote(note);
    setText(note.value);
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
        <StatusBar style="auto" />
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <NoteInput text={text} setText={setText} addNote={addNote} setEditingNote={setEditingNote} isDarkMode={isDarkMode} />
        <NoteList tasks={tasks} deleteNote={deleteNote} startEditing={startEditing} isDarkMode={isDarkMode} />
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
});

export default App;