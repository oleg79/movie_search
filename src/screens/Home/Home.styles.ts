import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
  },

  search: {
    width: '90%',
    alignSelf: 'center',
    fontSize: 20,
    paddingVertical: 10,
  },

  searchButton: {
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    backgroundColor: '#e53935',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  resultInfoContainer: {
    width: '90%',
    alignSelf: 'center',
  },

  resultInfo: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#37474f',
  },

  errorContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#ffeb3b',
    paddingVertical: 10,
  },

  errorText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
