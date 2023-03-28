import React from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({videoUrl}: VideoPlayerProps) => {
  return (
    <View style={styles.container}>
      <Video
        source={{uri: videoUrl}}
        style={styles.videoPlayer}
        resizeMode="contain"
        controls
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
  },
  videoPlayer: {
    flex: 1,
  },
});

export default VideoPlayer;
