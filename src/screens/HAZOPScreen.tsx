import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type HAZOPNavigationProp = StackNavigationProp<RootStackParamList, 'HAZOP'>;

const { width, height } = Dimensions.get('window');

interface HAZOPItem {
  id: string;
  guideWord: string;
  parameter: string;
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
  const [showForm, setShowForm] = useState(false);
  
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
    setShowForm(false);
  };

  const ParameterSection = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-6">Design & Operating Parameters</Text>
      
      {/* Design Parameters */}
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-3">Design Parameters</Text>
        <View className="space-y-3">
          {designParameters.map((param, index) => (
            <View key={index} className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <View className="flex-row items-center">
                <Ionicons name="construct" size={20} color="#1d4ed8" />
                <Text className="text-sm text-blue-800 font-medium ml-3">{param}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Operating Parameters */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-3">Operating Parameters</Text>
        <View className="space-y-3">
          {operatingParameters.map((param, index) => (
            <View key={index} className="bg-green-50 rounded-xl p-4 border border-green-200">
              <View className="flex-row items-center">
                <Ionicons name="settings" size={20} color="#059669" />
                <Text className="text-sm text-green-800 font-medium ml-3">{param}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const HAZOPForm = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-semibold text-gray-800">Add HAZOP Item</Text>
        <TouchableOpacity 
          className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
          onPress={() => setShowForm(false)}
        >
          <Ionicons name="close" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <View className="space-y-4">
        {/* Guide Word and Parameter */}
        <View className="flex-row space-x-4">
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-700 mb-2">Guide Word</Text>
            <View className="border border-gray-300 rounded-lg p-3">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row space-x-2">
                  {guideWords.map((word) => (
                    <TouchableOpacity
                      key={word}
                      className={`px-3 py-1 rounded-full ${
                        formData.guideWord === word ? 'bg-purple-100' : 'bg-gray-100'
                      }`}
                      onPress={() => setFormData({ ...formData, guideWord: word })}
                    >
                      <Text className={`text-xs font-medium ${
                        formData.guideWord === word ? 'text-purple-600' : 'text-gray-600'
                      }`}>
                        {word}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-700 mb-2">Parameter</Text>
            <View className="border border-gray-300 rounded-lg p-3">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row space-x-2">
                  {parameters.map((param) => (
                    <TouchableOpacity
                      key={param}
                      className={`px-3 py-1 rounded-full ${
                        formData.parameter === param ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                      onPress={() => setFormData({ ...formData, parameter: param })}
                    >
                      <Text className={`text-xs font-medium ${
                        formData.parameter === param ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {param}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Deviation */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Deviation *</Text>
          <View className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <Text className="text-sm text-gray-600">
              {formData.guideWord && formData.parameter 
                ? `${formData.guideWord} ${formData.parameter}`
                : 'Select guide word and parameter to see deviation'
              }
            </Text>
          </View>
        </View>

        {/* Cause */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Cause *</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-gray-800"
            placeholder="Describe the cause of the deviation..."
            value={formData.cause}
            onChangeText={(text) => setFormData({ ...formData, cause: text })}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Consequence */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Consequence *</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-gray-800"
            placeholder="Describe the potential consequence..."
            value={formData.consequence}
            onChangeText={(text) => setFormData({ ...formData, consequence: text })}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Safeguards */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Existing Safeguards</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-gray-800"
            placeholder="List existing safeguards..."
            value={formData.safeguards}
            onChangeText={(text) => setFormData({ ...formData, safeguards: text })}
            multiline
            numberOfLines={2}
          />
        </View>

        {/* Recommendations */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Recommendations</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-gray-800"
            placeholder="Suggest additional safeguards or actions..."
            value={formData.recommendations}
            onChangeText={(text) => setFormData({ ...formData, recommendations: text })}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Risk Level */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Risk Level</Text>
          <View className="flex-row space-x-2">
            {(['High', 'Medium', 'Low'] as const).map((level) => (
              <TouchableOpacity
                key={level}
                className={`flex-1 py-3 rounded-lg border ${
                  formData.riskLevel === level 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300 bg-white'
                }`}
                onPress={() => setFormData({ ...formData, riskLevel: level })}
              >
                <Text className={`text-center font-medium ${
                  formData.riskLevel === level ? 'text-purple-600' : 'text-gray-600'
                }`}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-purple-600 rounded-lg py-3 items-center"
          onPress={addHAZOPItem}
        >
          <Text className="text-white font-semibold">Add HAZOP Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const HAZOPList = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-semibold text-gray-800">HAZOP Items</Text>
        <Text className="text-sm text-gray-500">{hazopItems.length} items</Text>
      </View>

      {hazopItems.length === 0 ? (
        <View className="items-center py-8">
          <Ionicons name="analytics-outline" size={48} color="#d1d5db" />
          <Text className="text-gray-500 mt-2">No HAZOP items added yet</Text>
          <Text className="text-gray-400 text-sm">Add your first HAZOP item to get started</Text>
        </View>
      ) : (
        <View className="space-y-4">
          {hazopItems.map((item) => (
            <View key={item.id} className="border border-gray-200 rounded-xl p-4">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800 mb-1">{item.deviation}</Text>
                  <Text className="text-sm text-gray-600">Guide Word: {item.guideWord} • Parameter: {item.parameter}</Text>
                </View>
                <View className="flex-row items-center space-x-2">
                  <View className={`px-3 py-1 rounded-full ${
                    item.riskLevel === 'High' ? 'bg-red-100' :
                    item.riskLevel === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    <Text className={`text-xs font-bold ${
                      item.riskLevel === 'High' ? 'text-red-600' :
                      item.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {item.riskLevel.toUpperCase()}
                    </Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${
                    item.status === 'Open' ? 'bg-blue-100' :
                    item.status === 'Closed' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <Text className={`text-xs font-bold ${
                      item.status === 'Open' ? 'text-blue-600' :
                      item.status === 'Closed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View className="space-y-3 mb-3">
                <View>
                  <Text className="text-xs font-medium text-gray-500 mb-1">CAUSE</Text>
                  <Text className="text-sm text-gray-700">{item.cause}</Text>
                </View>
                <View>
                  <Text className="text-xs font-medium text-gray-500 mb-1">CONSEQUENCE</Text>
                  <Text className="text-sm text-gray-700">{item.consequence}</Text>
                </View>
                {item.safeguards && (
                  <View>
                    <Text className="text-xs font-medium text-gray-500 mb-1">SAFEGUARDS</Text>
                    <Text className="text-sm text-gray-700">{item.safeguards}</Text>
                  </View>
                )}
                {item.recommendations && (
                  <View>
                    <Text className="text-xs font-medium text-gray-500 mb-1">RECOMMENDATIONS</Text>
                    <Text className="text-sm text-gray-700">{item.recommendations}</Text>
                  </View>
                )}
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-4">
                  <TouchableOpacity className="bg-blue-50 px-3 py-1 rounded-lg">
                    <Text className="text-xs font-medium text-blue-600">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-green-50 px-3 py-1 rounded-lg">
                    <Text className="text-xs font-medium text-green-600">Close</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity className="bg-gray-50 px-3 py-1 rounded-lg">
                  <Text className="text-xs font-medium text-gray-600">View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const Header = () => (
    <View className="bg-white border-b border-gray-200 px-6 py-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity 
            className="mr-4"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#6b7280" />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-bold text-gray-800">HAZOP Analysis</Text>
            <Text className="text-sm text-gray-500">Hazard & Operability Study</Text>
          </View>
        </View>
        
        <TouchableOpacity
          className="bg-purple-600 rounded-lg px-4 py-2 flex-row items-center"
          onPress={() => setShowForm(true)}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Project Selection */}
      <View className="mt-4 flex-row items-center space-x-4">
        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-700 mb-1">Project</Text>
          <View className="border border-gray-300 rounded-lg p-3 bg-gray-50">
            <Text className="text-gray-800">{selectedProject}</Text>
          </View>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-700 mb-1">Node</Text>
          <View className="border border-gray-300 rounded-lg p-3 bg-gray-50">
            <Text className="text-gray-800">{selectedNode}</Text>
          </View>
        </View>
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
            <Text className="text-green-800 font-bold">HAZOP ANALYSIS SCREEN</Text>
            <Text className="text-green-600">Scrollable and responsive design</Text>
          </View>

          {showForm && <HAZOPForm />}
          <ParameterSection />
          <HAZOPList />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HAZOPScreen; 