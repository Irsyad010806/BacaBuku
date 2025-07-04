import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { SafeAreaView } from 'react-native';
import BukuList from './seed';

export default function Ma10() {
  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Halaman SMA KELAS 11</ThemedText>
    </ThemedView>
  );
}