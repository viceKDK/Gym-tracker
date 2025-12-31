import React from 'react';
import { View, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

describe('Dummy', () => {
  it('renders text', () => {
    render(
      <View>
        <Text>Hello</Text>
      </View>
    );
    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
