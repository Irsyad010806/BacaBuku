import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  const [openDropdown, setOpenDropdown] = React.useState<null | 'smk' | 'sma' | 'ma'>(null);
  const [selectedValue1, setSelectedValue1] = React.useState('SMK');
  const [selectedValue2, setSelectedValue2] = React.useState('Kelas 10');
  const [selectedValue3, setSelectedValue3] = React.useState('Semester 1');
  
  const router = useRouter();
  const dropdown1Label = "SMK";
  const dropdown1Options = ['Kelas 10','Kelas 11','Kelas 12'];
  const dropdown2Label = "SMA";
  const dropdown2Options = ['Kelas 10','Kelas 11','Kelas 12'];
  const dropdown3Label = "MA";
  const dropdown3Options = ['Kelas 10','Kelas 11','Kelas 12'];

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 50,
          marginLeft: 20,
          marginRight: 10,
          marginBottom: 40,
        }}
      >
        <ThemedText type="title" style={{ marginRight: 16, color: '#000' }}>
          Home
        </ThemedText>
        <Image 
          source={require('@/assets/images/irsyad.jpeg')}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            marginLeft: 'auto', // memastikan gambar berada di ujung kanan
          }}
        />
      </View>

      <View style={styles.dropdownsContainer}>
        {/* First Dropdown */}
        <View style={[styles.dropdownContainer, { zIndex: 3000 }]}>
          <TouchableOpacity 
            onPress={() => setOpenDropdown(openDropdown === 'smk' ? null : 'smk')} 
            style={styles.dropdownButton}
          >
            <ThemedText style={{ color: '#333333', fontWeight: '500' }}>{dropdown1Label}</ThemedText>
          </TouchableOpacity>
          
          {openDropdown === 'smk' && (
            <DropdownAnimated visible={openDropdown === 'smk'}>
              {dropdown1Options.map(option => (
              <TouchableOpacity
                key={option} 
                style={styles.dropdownItem} 
                onPress={() => {
                  setOpenDropdown(null);
                  if (option === 'Kelas 10') router.push('/SMK10');
                  else if (option === 'Kelas 11') router.push('/SMK11');
                  else if (option === 'Kelas 12') router.push('/SMK12');
                    
                  
                }}
              >
                <ThemedText style={{ color: '#333333' }}>{option}</ThemedText>
              </TouchableOpacity>
              ))}
            </DropdownAnimated>
          )}
        </View>

        {/* Second Dropdown */}
        <View style={[styles.dropdownContainer, { marginTop: 16, zIndex: 2000 }]}>
          <TouchableOpacity 
            onPress={() => setOpenDropdown(openDropdown === 'sma' ? null : 'sma')} 
            style={styles.dropdownButton}
          >
            <ThemedText style={{ color: '#333333', fontWeight: '500' }}>{dropdown2Label}</ThemedText>
          </TouchableOpacity>

          {openDropdown === 'sma' && (
            <DropdownAnimated visible={openDropdown === 'sma'}>
              {dropdown2Options.map(option => (
              <TouchableOpacity 
                key={option}
                style={styles.dropdownItem} 
                onPress={() => { 
                  alert(`You selected: ${option}`); 
                  setOpenDropdown(null); 
                }}
              >
                <ThemedText style={{ color: '#333333' }}>{option}</ThemedText>
              </TouchableOpacity>
              ))}
            </DropdownAnimated>
          )}
        </View>

        {/* Third Dropdown */}
        <View style={[styles.dropdownContainer, { marginTop: 16 }]}>
          <TouchableOpacity 
            onPress={() => setOpenDropdown(openDropdown === 'ma' ? null : 'ma')} 
            style={styles.dropdownButton}
          >
            <ThemedText style={{ color: '#333333', fontWeight: '500' }}>{dropdown3Label}</ThemedText>
          </TouchableOpacity>

          {openDropdown === 'ma' && (
            <DropdownAnimated visible={openDropdown === 'ma'}>
              {dropdown3Options.map(option => (
              <TouchableOpacity 
                key={option}
                style={styles.dropdownItem} 
                onPress={() => { 
                  alert(`You selected: ${option}`);
                  setOpenDropdown(null);
                 }}
              >
                <ThemedText style={{ color: '#333333' }}>{option}</ThemedText>
              </TouchableOpacity>
              ))}
            </DropdownAnimated>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

type DropdownAnimatedProps = {
  visible: boolean;
  children: React.ReactNode;
};

function DropdownAnimated({ visible, children }: DropdownAnimatedProps) {
  const animation = React.useRef(new Animated.Value(0)).current;
  const childrenArray = React.Children.toArray(children);
  const itemCount = Math.max(childrenArray.length, 1);
  const itemHeight = 48;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, childrenArray.length * itemHeight],
  });

  const opacity = animation;

  return (
    <Animated.View style={[styles.dropdownList, { height, opacity, overflow: 'hidden' }]}>
      {childrenArray}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dropdownsContainer: {
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    width: '100%',
    zIndex: 1000,
  },
  dropdownButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dropdownList: {
    position: 'absolute',
    top: 50,
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    zIndex: 2000
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
});