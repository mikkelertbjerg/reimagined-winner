import { useUser } from '@/context/UserContext';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>

        <Text style={styles.welcome}>
          {user
            ? `Welcome, ${user.email.split('@')[0]}!`
            : 'Welcome, Guest!'}
        </Text>

        <Text style={styles.description}>
          This is the home screen of your app.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  welcome: {
    fontSize: 20,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;