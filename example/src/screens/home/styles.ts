import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    transform: [
      {
        scale: 1.5,
      },
    ],
  },
  listTitle: {
    color: '#333333',
    display: 'flex',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyList: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 24,
    textAlign: 'center',
  },
});
