import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

const width = Dimensions.get('screen').width;

export default function TodoApp() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  const addNote = () => {
    if (note.length !== 0) {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  const clearTask = index => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <View>
      <Text style={styles.textheading}>Todo App</Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter task"
          value={note}
          onChangeText={setNote}
          style={styles.textbox}
        />
        <TouchableOpacity onPress={addNote}>
          <Text style={styles.plussign}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setNotes([])}>
        <Text style={styles.cleartask}>Clear All Tasks</Text>
      </TouchableOpacity>
      {notes.length === 0 ? (
        <Text style={styles.tasktext}>No task added...</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.viewContainer}>
              <Text style={styles.textWrapper}>{item}</Text>
              <TouchableOpacity onPress={() => clearTask(index)}>
                <Icon
                  name="x"
                  size={30}
                  color="#4F8EF7"
                  style={styles.eraseIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textheading: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    color: '#000',
  },
  textbox: {
    borderWidth: 2,
    borderRadius: 30,
    width: width - 50,
    padding: 10,
  },
  plussign: {
    fontSize: 22,
    backgroundColor: '#D3D3D3',
    height: 30,
    width: 30,
    borderRadius: 50,
    marginTop: 10,
    textAlign: 'center',
  },
  cleartask: {
    fontSize: 18,
    backgroundColor: '#D3D3D3',
    marginTop: 10,
    padding: 5,
    marginHorizontal: 15,
    textAlign: 'center',
    color: '#000',
    borderRadius: 15,
    fontWeight: '600',
  },
  textWrapper: {
    color: '#000',
    fontSize: 20,
    marginTop: 7,
  },
  tasktext: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  eraseIcon: {
    marginTop: 6,
  },
  viewContainer: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
  },
});
