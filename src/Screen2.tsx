import React, { FC } from "react";
import Screen2Component from "./components/screens/Screen2Component";

export interface ScreenProps {
  navigation: any;
  route?: any;
}
const Screen2: FC<ScreenProps> = ({ navigation, route }) => {
  return (
    <>
      <Screen2Component message={"Screen 2"} navigation={navigation} />
    </>
  );
};

export default Screen2;
