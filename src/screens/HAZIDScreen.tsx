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

type HAZIDNavigationProp = StackNavigationProp<RootStackParamList, 'HAZID'>;

const { width } = Dimensions.get('window');

interface HazardItem {
  id: string;
  category: string;
  subcategory: string;
  source: string;
  threat: string;
  consequence: string;
  impact: 'A' | 'B' | 'C' | 'D' | 'E';
  probability: 1 | 2 | 3 | 4 | 5;
  riskLevel: 'High' | 'Medium' | 'Low';
}

const HAZIDScreen: React.FC = () => {
  const navigation = useNavigation<HAZIDNavigationProp>();
  const [hazards, setHazards] = useState<HazardItem[]>([]);
  const [selectedProject, setSelectedProject] = useState('Oil Refinery Unit XV011');
  const [selectedNode, setSelectedNode] = useState('VQ02 - Gas Vessel');
  
  // Form state
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    source: '',
    threat: '',
    consequence: '',
    impact: 'C' as 'A' | 'B' | 'C' | 'D' | 'E',
    probability: 3 as 1 | 2 | 3 | 4 | 5,
  });

  // Predefined options from discovery sessions
  const categories = ['Process', 'Mechanical', 'Electrical', 'Chemical', 'Environmental', 'Human'];
  const subcategories = ['Pressure', 'Temperature', 'Flow', 'Level', 'Composition', 'Corrosion'];
  const sources = ['Equipment', 'Process', 'Human Error', 'External Factors', 'Design Flaws'];
  const threats = ['Overpressure', 'Overheating', 'Leakage', 'Contamination', 'Equipment Failure'];

  const calculateRiskLevel = (impact: string, probability: number): 'High' | 'Medium' | 'Low' => {
    const impactScores: { [key: string]: number } = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1 };
    const impactScore = impactScores[impact] || 3;
    const totalScore = impactScore * probability;
    
    if (totalScore >= 15) return 'High';
    if (totalScore >= 8) return 'Medium';
    return 'Low';
  };

  const addHazard = () => {
    if (!formData.category || !formData.threat || !formData.consequence) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    const newHazard: HazardItem = {
      id: Date.now().toString(),
      ...formData,
      riskLevel: calculateRiskLevel(formData.impact, formData.probability),
    };

    setHazards([...hazards, newHazard]);
    setFormData({
      category: '',
      subcategory: '',
      source: '',
      threat: '',
      consequence: '',
      impact: 'C',
      probability: 3,
    });
  };

  const RiskMatrix = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment Matrix</Text>
      <View className="space-y-2">
        {['A', 'B', 'C', 'D', 'E'].map((impact) => (
          <View key={impact} className="flex-row items-center">
            <View className="w-8 h-8 bg-gray-100 rounded items-center justify-center mr-2">
              <Text className="text-sm font-medium text-gray-700">{impact}</Text>
            </View>
            {[1, 2, 3, 4, 5].map((prob) => {
              const riskLevel = calculateRiskLevel(impact, prob);
              const colors = {
                High: '#ef4444',
                Medium: '#f59e0b',
                Low: '#22c55e',
              };
              return (
                <TouchableOpacity
                  key={prob}
                  className="w-8 h-8 rounded items-center justify-center mx-1"
                  style={{ backgroundColor: colors[riskLevel] + '20' }}
                  onPress={() => {
                    setFormData(prev => ({ ...prev, impact: impact as any, probability: prob as any }));
                  }}
                >
                  <Text 
                    className="text-xs font-medium"
                    style={{ color: colors[riskLevel] }}
                  >
                    {prob}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
      <View className="flex-row justify-between mt-4">
        <View className="flex-row items-center">
          <View className="w-4 h-4 bg-red-200 rounded mr-2" />
          <Text className="text-sm text-gray-600">High Risk</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-4 h-4 bg-yellow-200 rounded mr-2" />
          <Text className="text-sm text-gray-600">Medium Risk</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-4 h-4 bg-green-200 rounded mr-2" />
          <Text className="text-sm text-gray-600">Low Risk</Text>
        </View>
      </View>
    </View>
  );

  const HazardForm = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">Add New Hazard</Text>
      
      {/* Category Selection */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Category *</Text>
        <View className="flex-row flex-wrap">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              className={`px-3 py-2 rounded-full mr-2 mb-2 ${
                formData.category === cat ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setFormData(prev => ({ ...prev, category: cat }))}
            >
              <Text className={`text-sm ${
                formData.category === cat ? 'text-white' : 'text-gray-700'
              }`}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Subcategory Selection */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Subcategory</Text>
        <View className="flex-row flex-wrap">
          {subcategories.map((sub) => (
            <TouchableOpacity
              key={sub}
              className={`px-3 py-2 rounded-full mr-2 mb-2 ${
                formData.subcategory === sub ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setFormData(prev => ({ ...prev, subcategory: sub }))}
            >
              <Text className={`text-sm ${
                formData.subcategory === sub ? 'text-white' : 'text-gray-700'
              }`}>
                {sub}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Threat Input */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Threat *</Text>
        <View className="flex-row flex-wrap mb-2">
          {threats.map((threat) => (
            <TouchableOpacity
              key={threat}
              className="px-3 py-1 rounded-full bg-gray-100 mr-2 mb-2"
              onPress={() => setFormData(prev => ({ ...prev, threat: threat }))}
            >
              <Text className="text-sm text-gray-700">{threat}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
          placeholder="Or type custom threat..."
          value={formData.threat}
          onChangeText={(text) => setFormData(prev => ({ ...prev, threat: text }))}
        />
      </View>

      {/* Consequence Input */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Consequence *</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
          placeholder="Describe the potential consequence..."
          value={formData.consequence}
          onChangeText={(text) => setFormData(prev => ({ ...prev, consequence: text }))}
          multiline
          numberOfLines={3}
        />
        <View className="flex-row items-center mt-2">
          <Ionicons name="sparkles" size={16} color="#3b82f6" />
          <Text className="text-xs text-blue-600 ml-1">AI will polish your text</Text>
        </View>
      </View>

      {/* Risk Matrix */}
      <RiskMatrix />

      {/* Add Button */}
      <TouchableOpacity
        className="bg-blue-500 rounded-lg py-3 items-center"
        onPress={addHazard}
      >
        <Text className="text-white font-semibold">Add Hazard</Text>
      </TouchableOpacity>
    </View>
  );

  const HazardList = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        Identified Hazards ({hazards.length})
      </Text>
      
      {hazards.length === 0 ? (
        <View className="items-center py-8">
          <Ionicons name="warning-outline" size={48} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">No hazards identified yet</Text>
        </View>
      ) : (
        <View className="space-y-3">
          {hazards.map((hazard) => (
            <View key={hazard.id} className="border border-gray-200 rounded-lg p-3">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="font-semibold text-gray-800">{hazard.threat}</Text>
                <View 
                  className={`px-2 py-1 rounded-full ${
                    hazard.riskLevel === 'High' ? 'bg-red-100' :
                    hazard.riskLevel === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}
                >
                  <Text 
                    className={`text-xs font-medium ${
                      hazard.riskLevel === 'High' ? 'text-red-700' :
                      hazard.riskLevel === 'Medium' ? 'text-yellow-700' : 'text-green-700'
                    }`}
                  >
                    {hazard.riskLevel}
                  </Text>
                </View>
              </View>
              <Text className="text-sm text-gray-600 mb-1">
                Category: {hazard.category} {hazard.subcategory && `• ${hazard.subcategory}`}
              </Text>
              <Text className="text-sm text-gray-700">{hazard.consequence}</Text>
              <View className="flex-row items-center mt-2">
                <Text className="text-xs text-gray-500">
                  Impact: {hazard.impact} • Probability: {hazard.probability}
                </Text>
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
          <HazardForm />
          <HazardList />
        </View>

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HAZIDScreen; 