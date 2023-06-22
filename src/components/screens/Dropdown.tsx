import React, {useState, useEffect} from 'react';
import DropDownPicker, {ValueType} from 'react-native-dropdown-picker';
// import RNPickerSelect from 'react-native-picker-select';

//import getAnimeQuery from '../../services/apiCalls/getAnimeQuery';
//import {mapResponse} from '../../services/maps/mapResponse';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQueryClient} from 'react-query';
import fetchData from '../../services/apiCalls/getAnimeQuery';

interface DropdownItem {
  label: string;
  value: string;
}
interface Anime {
  id: number;
  title: string;
}
export interface ScreenProps {
  navigation: any;
}

const Dropdown = ({navigation}: ScreenProps) => {
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const animeList = await fetchData();
        setAnimeList(animeList);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };
    fetchAnimeData();
  }, []);

  const handleItemChange = (value: ValueType) => {
    if (typeof value === 'string' || Array.isArray(value)) {
      // Adjust the condition to handle string or string[]
      setSelectedItem(value as string[]);
    }
  };

  const dropdownItems = animeList.map(anime => ({
    label: anime.title,
    value: anime.id.toString(),
  }));

  const items: any = [
    {label: 'Item 1', value: 'item1'},
    {label: 'Item 2', value: 'item2'},
    {label: 'Item 3', value: 'item3'},
  ];

  return (
    <View>
      {/* <Text>Select an item:</Text> */}
      <DropDownPicker
        multiple={true}
        open={open}
        items={dropdownItems}
        value={selectedItem}
        setValue={
          setSelectedItem as React.Dispatch<React.SetStateAction<string[]>>
        }
        setOpen={setOpen}
        //onChangeValue={handleItemChange}
        //placeholder="Select an item..."
      />
      <Text>You selected: {selectedItem}</Text>
    </View>
  );
};

export default Dropdown;
