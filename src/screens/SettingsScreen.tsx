import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const { width, height } = Dimensions.get('window');

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [aiFeatures, setAiFeatures] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [selectedTheme, setSelectedTheme] = useState('Purple');

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true,
    rightComponent 
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity 
      className="flex-row items-center p-4 bg-white rounded-xl mb-3 border border-gray-100"
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="w-10 h-10 bg-purple-100 rounded-lg items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color="#7c3aed" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>
        )}
      </View>
      {rightComponent && rightComponent}
      {showArrow && onPress && (
        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      )}
    </TouchableOpacity>
  );

  const SwitchItem = ({ 
    icon, 
    title, 
    subtitle, 
    value, 
    onValueChange 
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View className="flex-row items-center p-4 bg-white rounded-xl mb-3 border border-gray-100">
      <View className="w-10 h-10 bg-purple-100 rounded-lg items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color="#7c3aed" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#d1d5db', true: '#7c3aed' }}
        thumbColor={value ? '#ffffff' : '#ffffff'}
      />
    </View>
  );

  const Header = () => (
    <View className="bg-white border-b border-gray-200 px-6 py-4">
      <View className="flex-row items-center">
        <TouchableOpacity 
          className="mr-4"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#6b7280" />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-bold text-gray-800">Settings</Text>
          <Text className="text-sm text-gray-500">Customize your experience</Text>
        </View>
      </View>
    </View>
  );

  const ProfileSection = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-6">Profile</Text>
      
      <View className="flex-row items-center mb-6">
        <View className="w-16 h-16 bg-purple-500 rounded-full items-center justify-center mr-4">
          <Text className="text-white text-xl font-bold">M</Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">Manager</Text>
          <Text className="text-sm text-gray-500">Admin • manager@hensis.com</Text>
          <Text className="text-xs text-gray-400 mt-1">Last login: 2 hours ago</Text>
        </View>
        <TouchableOpacity className="bg-purple-50 px-3 py-2 rounded-lg">
          <Text className="text-sm font-medium text-purple-600">Edit</Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-3">
        <SettingItem
          icon="person-outline"
          title="Personal Information"
          subtitle="Update your profile details"
          onPress={() => Alert.alert('Info', 'Personal Information settings')}
        />
        <SettingItem
          icon="shield-checkmark-outline"
          title="Security"
          subtitle="Password, 2FA, and privacy"
          onPress={() => Alert.alert('Info', 'Security settings')}
        />
        <SettingItem
          icon="card-outline"
          title="Subscription"
          subtitle="Hensis Pro • Active until Dec 2024"
          onPress={() => Alert.alert('Info', 'Subscription management')}
        />
      </View>
    </View>
  );

  const PreferencesSection = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-6">Preferences</Text>
      
      <View className="space-y-3">
        <SwitchItem
          icon="notifications-outline"
          title="Push Notifications"
          subtitle="Get notified about project updates"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SwitchItem
          icon="moon-outline"
          title="Dark Mode"
          subtitle="Switch to dark theme"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SwitchItem
          icon="sparkles-outline"
          title="AI Features"
          subtitle="Enable AI-powered text polishing"
          value={aiFeatures}
          onValueChange={setAiFeatures}
        />
        <SwitchItem
          icon="save-outline"
          title="Auto Save"
          subtitle="Automatically save your work"
          value={autoSave}
          onValueChange={setAutoSave}
        />
      </View>
    </View>
  );

  const AppearanceSection = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-6">Appearance</Text>
      
      <View className="space-y-3">
        <SettingItem
          icon="language-outline"
          title="Language"
          subtitle={selectedLanguage}
          onPress={() => {
            Alert.alert(
              'Select Language',
              'Choose your preferred language',
              [
                { text: 'English (US)', onPress: () => setSelectedLanguage('English (US)') },
                { text: 'Spanish', onPress: () => setSelectedLanguage('Spanish') },
                { text: 'French', onPress: () => setSelectedLanguage('French') },
                { text: 'German', onPress: () => setSelectedLanguage('German') },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
          }}
        />
        <SettingItem
          icon="color-palette-outline"
          title="Theme Color"
          subtitle={selectedTheme}
          onPress={() => {
            Alert.alert(
              'Select Theme',
              'Choose your preferred theme color',
              [
                { text: 'Purple', onPress: () => setSelectedTheme('Purple') },
                { text: 'Blue', onPress: () => setSelectedTheme('Blue') },
                { text: 'Green', onPress: () => setSelectedTheme('Green') },
                { text: 'Orange', onPress: () => setSelectedTheme('Orange') },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
          }}
        />
      </View>
    </View>
  );

  const DataSection = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-6">Data & Storage</Text>
      
      <View className="space-y-3">
        <SettingItem
          icon="cloud-upload-outline"
          title="Backup & Sync"
          subtitle="Manage your data backup"
          onPress={() => Alert.alert('Info', 'Backup & Sync settings')}
        />
        <SettingItem
          icon="download-outline"
          title="Export Data"
          subtitle="Download your project data"
          onPress={() => Alert.alert('Info', 'Export data options')}
        />
        <SettingItem
          icon="trash-outline"
          title="Clear Cache"
          subtitle="Free up storage space"
          onPress={() => {
            Alert.alert(
              'Clear Cache',
              'This will clear all cached data. Are you sure?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive', onPress: () => Alert.alert('Success', 'Cache cleared successfully!') },
              ]
            );
          }}
        />
      </View>
    </View>
  );

  const SupportSection = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-6">Support & Help</Text>
      
      <View className="space-y-3">
        <SettingItem
          icon="help-circle-outline"
          title="Help Center"
          subtitle="Find answers and tutorials"
          onPress={() => Alert.alert('Info', 'Help Center')}
        />
        <SettingItem
          icon="chatbubble-outline"
          title="Contact Support"
          subtitle="Get help from our team"
          onPress={() => Alert.alert('Info', 'Contact Support')}
        />
        <SettingItem
          icon="document-text-outline"
          title="Documentation"
          subtitle="User guides and API docs"
          onPress={() => Alert.alert('Info', 'Documentation')}
        />
        <SettingItem
          icon="star-outline"
          title="Rate App"
          subtitle="Share your feedback"
          onPress={() => Alert.alert('Info', 'Rate App')}
        />
      </View>
    </View>
  );

  const AboutSection = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-6">About</Text>
      
      <View className="space-y-3">
        <SettingItem
          icon="information-circle-outline"
          title="Version"
          subtitle="Hensis v2.1.0"
          showArrow={false}
        />
        <SettingItem
          icon="document-outline"
          title="Terms of Service"
          subtitle="Read our terms and conditions"
          onPress={() => Alert.alert('Info', 'Terms of Service')}
        />
        <SettingItem
          icon="shield-outline"
          title="Privacy Policy"
          subtitle="How we protect your data"
          onPress={() => Alert.alert('Info', 'Privacy Policy')}
        />
        <SettingItem
          icon="log-out-outline"
          title="Sign Out"
          subtitle="Log out of your account"
          onPress={() => {
            Alert.alert(
              'Sign Out',
              'Are you sure you want to sign out?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Out', style: 'destructive', onPress: () => navigation.navigate('Dashboard') },
              ]
            );
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1" style={{ flex: 1 }}>
        <Header />
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
          style={{ flex: 1 }}
        >
          {/* Debug Info */}
          <View className="bg-green-100 p-4 mb-4 rounded-lg">
            <Text className="text-green-800 font-bold">SETTINGS SCREEN</Text>
            <Text className="text-green-600">Scrollable and responsive design</Text>
          </View>

          <ProfileSection />
          <PreferencesSection />
          <AppearanceSection />
          <DataSection />
          <SupportSection />
          <AboutSection />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen; 