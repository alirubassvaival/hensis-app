import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type DashboardNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardNavigationProp>();

  const handleNavigation = (screen: keyof RootStackParamList) => {
    if (screen === 'Dashboard') {
      navigation.navigate('Dashboard');
    } else if (screen === 'HAZID') {
      navigation.navigate('HAZID', {});
    } else if (screen === 'HAZOP') {
      navigation.navigate('HAZOP', {});
    } else if (screen === 'Projects') {
      navigation.navigate('Projects');
    } else if (screen === 'Settings') {
      navigation.navigate('Settings');
    }
  };

  const QuickActionCard = ({ 
    title, 
    subtitle, 
    icon, 
    color, 
    onPress 
  }: {
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
      style={{ width: (width - 48) / 2 }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center mb-3">
        <View 
          className="w-10 h-10 rounded-lg items-center justify-center"
          style={{ backgroundColor: color + '20' }}
        >
          <Ionicons name={icon} size={24} color={color} />
        </View>
      </View>
      <Text className="text-lg font-semibold text-gray-800 mb-1">{title}</Text>
      <Text className="text-sm text-gray-600">{subtitle}</Text>
    </TouchableOpacity>
  );

  const StatCard = ({ 
    title, 
    value, 
    change, 
    color 
  }: {
    title: string;
    value: string;
    change: string;
    color: string;
  }) => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <Text className="text-sm font-medium text-gray-600 mb-2">{title}</Text>
      <Text className="text-2xl font-bold text-gray-800 mb-1">{value}</Text>
      <View className="flex-row items-center">
        <Ionicons 
          name={change.startsWith('+') ? 'trending-up' : 'trending-down'} 
          size={16} 
          color={change.startsWith('+') ? '#22c55e' : '#ef4444'} 
        />
        <Text 
          className="text-sm font-medium ml-1"
          style={{ color: change.startsWith('+') ? '#22c55e' : '#ef4444' }}
        >
          {change}
        </Text>
      </View>
    </View>
  );

  const RecentProjectCard = ({ 
    name, 
    status, 
    progress, 
    lastUpdated 
  }: {
    name: string;
    status: 'active' | 'completed' | 'pending';
    progress: number;
    lastUpdated: string;
  }) => {
    const statusColors = {
      active: '#3b82f6',
      completed: '#22c55e',
      pending: '#f59e0b',
    };

    const statusText = {
      active: 'Active',
      completed: 'Completed',
      pending: 'Pending',
    };

    return (
      <TouchableOpacity className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
        <View className="flex-row justify-between items-start mb-3">
          <Text className="text-lg font-semibold text-gray-800 flex-1 mr-2">{name}</Text>
          <View 
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: statusColors[status] + '20' }}
          >
            <Text 
              className="text-xs font-medium"
              style={{ color: statusColors[status] }}
            >
              {statusText[status]}
            </Text>
          </View>
        </View>
        <View className="mb-2">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-sm text-gray-600">Progress</Text>
            <Text className="text-sm font-medium text-gray-800">{progress}%</Text>
          </View>
          <View className="w-full bg-gray-200 rounded-full h-2">
            <View 
              className="h-2 rounded-full"
              style={{ 
                width: `${progress}%`,
                backgroundColor: statusColors[status]
              }}
            />
          </View>
        </View>
        <Text className="text-xs text-gray-500">Last updated: {lastUpdated}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to Hensis
          </Text>
          <Text className="text-gray-600 text-lg">
            Hazard Analysis & Risk Management System
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <QuickActionCard
              title="HAZID Analysis"
              subtitle="Hazard Identification"
              icon="warning"
              color="#ef4444"
              onPress={() => handleNavigation('HAZID')}
            />
            <QuickActionCard
              title="HAZOP Analysis"
              subtitle="Hazard & Operability"
              icon="analytics"
              color="#3b82f6"
              onPress={() => handleNavigation('HAZOP')}
            />
          </View>
        </View>

        {/* Statistics */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Overview
          </Text>
          <View className="flex-row justify-between">
            <StatCard
              title="Active Projects"
              value="12"
              change="+2"
              color="#3b82f6"
            />
            <StatCard
              title="Completed"
              value="8"
              change="+1"
              color="#22c55e"
            />
            <StatCard
              title="High Risk Items"
              value="3"
              change="-1"
              color="#ef4444"
            />
          </View>
        </View>

        {/* Recent Projects */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">
              Recent Projects
            </Text>
            <TouchableOpacity onPress={() => handleNavigation('Projects')}>
              <Text className="text-primary-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          
          <RecentProjectCard
            name="Oil Refinery Unit XV011"
            status="active"
            progress={75}
            lastUpdated="2 hours ago"
          />
          <RecentProjectCard
            name="Gas Processing Plant VQ02"
            status="active"
            progress={45}
            lastUpdated="1 day ago"
          />
          <RecentProjectCard
            name="Chemical Storage Facility"
            status="completed"
            progress={100}
            lastUpdated="3 days ago"
          />
        </View>

        {/* AI Features Highlight */}
        <View className="px-4 mb-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6">
            <View className="flex-row items-center mb-3">
              <Ionicons name="sparkles" size={24} color="white" />
              <Text className="text-white text-lg font-semibold ml-2">
                AI-Powered Features
              </Text>
            </View>
            <Text className="text-white text-sm mb-4">
              Leverage advanced AI for text polishing, speech-to-text, and intelligent risk assessment
            </Text>
            <View className="flex-row space-x-2">
              <View className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                <Text className="text-white text-xs">Text Polishing</Text>
              </View>
              <View className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                <Text className="text-white text-xs">Speech-to-Text</Text>
              </View>
              <View className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                <Text className="text-white text-xs">Smart Analysis</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen; 