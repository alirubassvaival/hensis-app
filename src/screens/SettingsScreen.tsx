import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const { width } = Dimensions.get('window');

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>();
  
  // Settings state
  const [settings, setSettings] = useState({
    aiTextPolishing: true,
    speechToText: true,
    adaptiveLearning: true,
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  const [selectedClient, setSelectedClient] = useState('Shell International');
  const [riskMatrixSize, setRiskMatrixSize] = useState('5x5');
  const [selectedIndustry, setSelectedIndustry] = useState('Oil & Gas');

  const clients = ['Shell International', 'ExxonMobil', 'Dow Chemical', 'BP', 'Chevron'];
  const matrixSizes = ['5x5', '5x4', '4x4', '6x6'];
  const industries = ['Oil & Gas', 'Chemical', 'Pharmaceutical', 'Mining', 'Power Generation'];

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingItem = ({ 
    title, 
    subtitle, 
    icon, 
    value, 
    onToggle, 
    type = 'switch' 
  }: {
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    value: boolean;
    onToggle: () => void;
    type?: 'switch' | 'chevron';
  }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center mr-3">
          <Ionicons name={icon} size={20} color="#3b82f6" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-800 font-medium">{title}</Text>
          <Text className="text-gray-500 text-sm">{subtitle}</Text>
        </View>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
          thumbColor={value ? '#ffffff' : '#ffffff'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}
    </View>
  );

  const RiskMatrixConfig = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">Risk Matrix Configuration</Text>
      
      {/* Matrix Size */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Matrix Size</Text>
        <View className="flex-row flex-wrap">
          {matrixSizes.map((size) => (
            <TouchableOpacity
              key={size}
              className={`px-3 py-2 rounded-full mr-2 mb-2 ${
                riskMatrixSize === size ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setRiskMatrixSize(size)}
            >
              <Text className={`text-sm ${
                riskMatrixSize === size ? 'text-white' : 'text-gray-700'
              }`}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Impact Levels */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Impact Levels</Text>
        <View className="bg-gray-50 rounded-lg p-3">
          <Text className="text-sm text-gray-600">
            A - Catastrophic • B - Major • C - Moderate • D - Minor • E - Negligible
          </Text>
        </View>
      </View>

      {/* Probability Levels */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Probability Levels</Text>
        <View className="bg-gray-50 rounded-lg p-3">
          <Text className="text-sm text-gray-600">
            1 - Very Unlikely • 2 - Unlikely • 3 - Possible • 4 - Likely • 5 - Very Likely
          </Text>
        </View>
      </View>
    </View>
  );

  const ClientConfig = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">Client Configuration</Text>
      
      {/* Client Selection */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Active Client</Text>
        <View className="flex-row flex-wrap">
          {clients.map((client) => (
            <TouchableOpacity
              key={client}
              className={`px-3 py-2 rounded-full mr-2 mb-2 ${
                selectedClient === client ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setSelectedClient(client)}
            >
              <Text className={`text-sm ${
                selectedClient === client ? 'text-white' : 'text-gray-700'
              }`}>
                {client}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Industry Selection */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Industry</Text>
        <View className="flex-row flex-wrap">
          {industries.map((industry) => (
            <TouchableOpacity
              key={industry}
              className={`px-3 py-2 rounded-full mr-2 mb-2 ${
                selectedIndustry === industry ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setSelectedIndustry(industry)}
            >
              <Text className={`text-sm ${
                selectedIndustry === industry ? 'text-white' : 'text-gray-700'
              }`}>
                {industry}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Terminology */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Risk Assessment Terminology</Text>
        <View className="bg-gray-50 rounded-lg p-3">
          <Text className="text-sm text-gray-600">
            Inherent Risk • Residual Risk • Level 1 Assessment • Level 2 Assessment
          </Text>
        </View>
      </View>
    </View>
  );

  const AIConfig = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">AI Configuration</Text>
      
      <View className="space-y-0">
        <SettingItem
          title="Text Polishing"
          subtitle="Automatically improve grammar and clarity"
          icon="sparkles"
          value={settings.aiTextPolishing}
          onToggle={() => toggleSetting('aiTextPolishing')}
        />
        <SettingItem
          title="Speech-to-Text"
          subtitle="Enable voice input for data entry"
          icon="mic"
          value={settings.speechToText}
          onToggle={() => toggleSetting('speechToText')}
        />
        <SettingItem
          title="Adaptive Learning"
          subtitle="AI learns from your corrections (70-90% accuracy)"
          icon="bulb"
          value={settings.adaptiveLearning}
          onToggle={() => toggleSetting('adaptiveLearning')}
        />
      </View>
    </View>
  );

  const SystemConfig = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">System Settings</Text>
      
      <View className="space-y-0">
        <SettingItem
          title="Notifications"
          subtitle="Receive alerts for high-risk items"
          icon="notifications"
          value={settings.notifications}
          onToggle={() => toggleSetting('notifications')}
        />
        <SettingItem
          title="Dark Mode"
          subtitle="Switch to dark theme"
          icon="moon"
          value={settings.darkMode}
          onToggle={() => toggleSetting('darkMode')}
        />
        <SettingItem
          title="Auto Save"
          subtitle="Automatically save your work"
          icon="save"
          value={settings.autoSave}
          onToggle={() => toggleSetting('autoSave')}
        />
        <SettingItem
          title="Export Settings"
          subtitle="Configure report export options"
          icon="download"
          value={false}
          onToggle={() => {}}
          type="chevron"
        />
        <SettingItem
          title="Backup & Sync"
          subtitle="Manage data backup and synchronization"
          icon="cloud"
          value={false}
          onToggle={() => {}}
          type="chevron"
        />
      </View>
    </View>
  );

  const AboutSection = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">About Hensis</Text>
      
      <View className="space-y-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Version</Text>
          <Text className="text-gray-800 font-medium">1.0.0</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Build</Text>
          <Text className="text-gray-800 font-medium">2024.1.1</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Last Updated</Text>
          <Text className="text-gray-800 font-medium">Today</Text>
        </View>
      </View>

      <TouchableOpacity 
        className="mt-4 py-3 bg-red-50 rounded-lg items-center"
        onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
      >
        <Text className="text-red-600 font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">Settings</Text>
          <Text className="text-gray-600">Configure your Hensis experience</Text>
        </View>

        {/* Settings Sections */}
        <View className="px-4">
          <RiskMatrixConfig />
          <ClientConfig />
          <AIConfig />
          <SystemConfig />
          <AboutSection />
        </View>

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen; 