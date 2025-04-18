import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <Stack>
      <Button title='Start a new workout' />
      <div className='container'>
        <Divider />
        or
        <Divider />
      </div>
      <Button />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default HomeScreen;