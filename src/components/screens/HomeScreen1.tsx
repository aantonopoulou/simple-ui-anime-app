// /* eslint-disable prettier/prettier */
// import React, {FC} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {FlatList} from 'react-native/Libraries/Lists/FlatList';
// import {useGetPosts} from '../../services/apiCalls/getPostsQuery';

// export interface ScreenProps {
//   navigation: any;
// }

// export type ApiArray = [
//   {
//     id: number;
//     title: string;
//     userId: number;
//     body: string;
//   },
// ];

// const HomeScreen1: FC<ScreenProps> = ({navigation}) => {
//   const {data, isLoading} = useGetPosts();

//   return (
//     <SafeAreaView>
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>My Posts' titles</Text>
//         {isLoading ? (
//           <Text>Loading...</Text>
//         ) : data ? (
//           data.map((posts, idx: number) => {
//             return (
//               <View key={idx}>
//                 <Text style={{fontSize: 22}}>id: {posts.id}</Text>
//                 <Text style={[styles.titleContainer, {fontSize: 22}]}>
//                   title: {JSON.stringify(posts.title)}
//                 </Text>
//               </View>
//             );
//           })
//         ) : (
//           <Text>Whoops! No data available</Text>
//         )}
//       </ScrollView>

//       <View style={{}}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('Screen2')}>
//             <Text style={{color: 'black', fontSize: 16}}>Go to next page</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     fontWeight: 'bold',
//     color: 'white',
//     fontSize: 16,
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     paddingHorizontal: 24,
//   },
//   button: {
//     borderWidth: 0,
//     borderRadius: 8,
//     backgroundColor: '#DDDDDD',

//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   container: {
//     width: '70%',
//     height: 50,
//     paddingHorizontal: 20,
//     margin: 10,
//     alignSelf: 'center',
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   titleContainer: {
//     marginBottom: 10,
//   },
// });

// export default HomeScreen1;
