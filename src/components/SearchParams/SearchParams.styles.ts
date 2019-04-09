import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: 300
  },

  title: {
    color: '#37474f',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  button: {
    borderWidth: 2,
    borderColor: '#e53935',
    color: '#e53935',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  buttonSelected: {
    color: '#fff',
    backgroundColor: '#e53935',
    paddingHorizontal: 17,
    paddingVertical: 12,
  },

  slideValue: {
    textAlign: 'center',
    color: '#37474f',
    fontSize: 15,
    fontWeight: 'bold',
  },

  slide: {
    width: 220,
    height: 40,
    alignSelf: 'center'
  },

  filterLabel: {
    textAlign: 'center',
    color: '#37474f',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 5,
  },
});
