import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },

  poster: {
    width: 180,
    height: 200,
    resizeMode: 'contain',
  },

  infoContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },

  label: {
    fontSize: 12,
    color: '#37474f',
  },

  title: {
    flex: 1,
    flexWrap: 'wrap',
    width: 150
  },

  type: {
    color: '#fff',
    backgroundColor: '#e53935',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 2,
    width: 60,
    textAlign: 'center',
    marginTop: 5,
  },
});
