import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { StyleProp, ViewStyle } from 'react-native';

export default function SafeAreaViewWrapper({
  children,
  style,
}: {
  children: React.ReactNode,
  style?: any,
}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', ...style }}>
      {children}
    </SafeAreaView>
  );
}