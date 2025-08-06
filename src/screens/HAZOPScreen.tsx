import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type HAZOPNavigationProp = StackNavigationProp<RootStackParamList, 'HAZOP'>;

const { width } = Dimensions.get('window');

interface HAZOPItem {
  id: string;
  deviation: string;
  cause: string;
  consequence: string;
  safeguards: string;
  recommendations: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Closed' | 'In Progress';
}

const HAZOPScreen: React.FC = () => {
  const navigation = useNavigation<HAZOPNavigationProp>();
  const [hazopItems, setHazopItems] = useState<HAZOPItem[]>([]);
  const [selectedProject, setSelectedProject] = useState('Oil Refinery Unit XV011');
  const [selectedNode, setSelectedNode] = useState('VQ02 - Gas Vessel');
  
  // Form state
  const [formData, setFormData] = useState({
    guideWord: '',
    parameter: '',
    deviation: '',
    cause: '',
    consequence: '',
    safeguards: '',
    recommendations: '',
    riskLevel: 'Medium' as 'High' | 'Medium' | 'Low',
  });

  // Predefined options from discovery sessions
  const guideWords = ['No', 'More', 'Less', 'As Well As', 'Part Of', 'Reverse', 'Other Than'];
  const parameters = ['Flow', 'Pressure', 'Temperature', 'Level', 'Composition', 'Phase'];
  const designParameters = ['Max Pressure: 50 bar', 'Max Temperature: 200°C', 'Max Flow: 1000 m³/h'];
  const operatingParameters = ['Normal Pressure: 30 bar', 'Normal Temperature: 150°C', 'Normal Flow: 800 m³/h'];

  const addHAZOPItem = () => {
    if (!formData.deviation || !formData.cause || !formData.consequence) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    const newHAZOPItem: HAZOPItem = {
      id: Date.now().toString(),
      ...formData,
      status: 'Open',
    };

    setHazopItems([...hazopItems, newHAZOPItem]);
    setFormData({
      guideWord: '',
      parameter: '',
      deviation: '',
      cause: '',
      consequence: '',
      safeguards: '',
      recommendations: '',
      riskLevel: 'Medium',
    });
  };

  const ParameterSection = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">Design & Operating Parameters</Text>
      
      {/* Design Parameters */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Design Parameters</Text>
        <View className="space-y-2">
          {designParameters.map((param, index) => (
            <View key={index} className="bg-blue-50 rounded-lg p-3">
              <Text className="text-sm text-blue-800 font-medium">{param}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Operating Parameters */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Operating Parameters</Text>
        <View className="space-y-2">
          {operatingParameters.map((param, index) => (
            <View key={index} className="bg-green-50 rounded-lg p-3">
              <Text className="text-sm text-green-800 font-medium">{param}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const HAZOPForm = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">Add HAZOP Deviation</Text>
      
      {/* Guide Word Selection */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Guide Word</Text>
        <View className="flex-row flex-wrap">
          {guideWords.map((word) => (
            <TouchableOpacity
              key={word}
              className={`px-3 py-2 rounded-full mr-2 mb-2 ${
                formData.guideWord === word ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setFormData(prev => ({ ...prev, guideWord: word }))}
            >
              <Text className={`text-sm ${
                formData.guideWord === word ? 'text-white' : 'text-gray-700'
              }`}>
                {word}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Parameter Selection */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Parameter</Text>
        <View className="flex-row flex-wrap">
          {parameters.map((param) => (
            <TouchableOpacity
              key={param}
              className={`px-3 py-2 rounded-full mr-2 mb-2 ${
                formData.parameter === param ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setFormData(prev => ({ ...prev, parameter: param }))}
            >
              <Text className={`text-sm ${
                formData.parameter === param ? 'text-white' : 'text-gray-700'
              }`}>
                {param}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Deviation Input */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Deviation *</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
          placeholder="e.g., More Flow, No Pressure..."
          value={formData.deviation}
          onChangeText={(text) => setFormData(prev => ({ ...prev, deviation: text }))}
        />
        {formData.guideWord && formData.parameter && (
          <Text className="text-xs text-gray-500 mt-1">
            Suggested: {formData.guideWord} {formData.parameter}
          </Text>
        )}
      </View>

      {/* Cause Input */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Cause *</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
          placeholder="Describe the cause of deviation..."
          value={formData.cause}
          onChangeText={(text) => setFormData(prev => ({ ...prev, cause: text }))}
          multiline
          numberOfLines={3}
        />
        <View className="flex-row items-center mt-2">
          <Ionicons name="sparkles" size={16} color="#3b82f6" />
          <Text className="text-xs text-blue-600 ml-1">AI will expand abbreviated input</Text>
        </View>
      </View>

      {/* Consequence Input */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Consequence *</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
          placeholder="Describe the consequence without safeguards..."
          value={formData.consequence}
          onChangeText={(text) => setFormData(prev => ({ ...prev, consequence: text }))}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Safeguards Input */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Existing Safeguards</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
          placeholder="List existing safeguards..."
          value={formData.safeguards}
          onChangeText={(text) => setFormData(prev => ({ ...prev, safeguards: text }))}
          multiline
          numberOfLines={2}
        />
      </View>

      {/* Risk Level Selection */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Risk Level</Text>
        <View className="flex-row space-x-2">
          {(['High', 'Medium', 'Low'] as const).map((level) => (
            <TouchableOpacity
              key={level}
              className={`flex-1 py-2 rounded-lg border ${
                formData.riskLevel === level 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-white'
              }`}
              onPress={() => setFormData(prev => ({ ...prev, riskLevel: level }))}
            >
              <Text 
                className={`text-center font-medium ${
                  formData.riskLevel === level ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        className="bg-blue-500 rounded-lg py-3 items-center"
        onPress={addHAZOPItem}
      >
        <Text className="text-white font-semibold">Add HAZOP Item</Text>
      </TouchableOpacity>
    </View>
  );

  const HAZOPList = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        HAZOP Worksheet ({hazopItems.length})
      </Text>
      
      {hazopItems.length === 0 ? (
        <View className="items-center py-8">
          <Ionicons name="document-text-outline" size={48} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">No HAZOP items yet</Text>
        </View>
      ) : (
        <View className="space-y-3">
          {hazopItems.map((item) => (
            <View key={item.id} className="border border-gray-200 rounded-lg p-3">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="font-semibold text-gray-800">{item.deviation}</Text>
                <View className="flex-row space-x-2">
                  <View 
                    className={`px-2 py-1 rounded-full ${
                      item.riskLevel === 'High' ? 'bg-red-100' :
                      item.riskLevel === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}
                  >
                    <Text 
                      className={`text-xs font-medium ${
                        item.riskLevel === 'High' ? 'text-red-700' :
                        item.riskLevel === 'Medium' ? 'text-yellow-700' : 'text-green-700'
                      }`}
                    >
                      {item.riskLevel}
                    </Text>
                  </View>
                  <View 
                    className={`px-2 py-1 rounded-full ${
                      item.status === 'Open' ? 'bg-blue-100' :
                      item.status === 'Closed' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}
                  >
                    <Text 
                      className={`text-xs font-medium ${
                        item.status === 'Open' ? 'text-blue-700' :
                        item.status === 'Closed' ? 'text-green-700' : 'text-yellow-700'
                      }`}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View className="space-y-2">
                <View>
                  <Text className="text-xs font-medium text-gray-600">Cause</Text>
                  <Text className="text-sm text-gray-700">{item.cause}</Text>
                </View>
                <View>
                  <Text className="text-xs font-medium text-gray-600">Consequence</Text>
                  <Text className="text-sm text-gray-700">{item.consequence}</Text>
                </View>
                {item.safeguards && (
                  <View>
                    <Text className="text-xs font-medium text-gray-600">Safeguards</Text>
                    <Text className="text-sm text-gray-700">{item.safeguards}</Text>
                  </View>
                )}
                {item.recommendations && (
                  <View>
                    <Text className="text-xs font-medium text-gray-600">Recommendations</Text>
                    <Text className="text-sm text-gray-700">{item.recommendations}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Project Selection */}
        <View className="px-4 pt-4 pb-4">
          <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Project</Text>
            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Text className="text-gray-800 font-medium">{selectedProject}</Text>
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </TouchableOpacity>
            
            <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Node/System</Text>
            <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Text className="text-gray-800 font-medium">{selectedNode}</Text>
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View className="px-4">
          <ParameterSection />
          <HAZOPForm />
          <HAZOPList />
        </View>

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HAZOPScreen; 