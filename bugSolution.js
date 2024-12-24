```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          const message = `HTTP error! status: ${response.status}`;
          Alert.alert('Error', message); // Show alert for HTTP errors
          throw new Error(message);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          Alert.alert('Error', 'Invalid response from server.');
          throw new Error('Invalid response type');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
        Alert.alert('Error', 'An unexpected error occurred.'); //Catch all
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    // Error already displayed via Alert, prevent duplicate
    return <Text>Something went wrong</Text>;
  }

  return (
    <View>
      {data && data.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});
export default MyComponent;
```