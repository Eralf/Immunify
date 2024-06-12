import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import { storage } from './firebasecfg';// Adjust the path to your Firebase configuration
import { getDownloadURL, ref } from 'firebase/storage';

const ImageDisplay = ({imagePath, height=300, width=200}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const storageRef = ref(storage, imagePath); // Adjust the path to your image
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
      } catch (err) {
        console.log(err)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrl();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: width, height: height }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default ImageDisplay;
