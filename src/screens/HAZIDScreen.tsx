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

type HAZIDNavigationProp = StackNavigationProp<RootStackParamList, 'HAZID'>;

const { width, height } = Dimensions.get('window');

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
  const [hazards, setHazards] = useState<HazardItem[]>([
    {
      id: '1',
      category: 'Process',
      subcategory: 'Pressure',
      source: 'VQ02 - Gas Vessel',
      threat: 'Overpressure',
      consequence: 'Vessel rupture, potential explosion',
      impact: 'A',
      probability: 2,
      riskLevel: 'Medium',
    },
    {
      id: '2',
      category: 'Chemical',
      subcategory: 'Composition',
      source: 'Chemical Feed System',
      threat: 'Contamination',
      consequence: 'Product quality degradation',
      impact: 'C',
      probability: 3,
      riskLevel: 'Medium',
    },
  ]);
  const [selectedProject, setSelectedProject] = useState('Oil Refinery Unit XV011');
  const [selectedNode, setSelectedNode] = useState('VQ02 - Gas Vessel');
  const [showForm, setShowForm] = useState(false);
  
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
    setShowForm(false);
  };

  const RiskMatrix = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-6">Risk Assessment Matrix</Text>
      <View className="space-y-3">
        {['A', 'B', 'C', 'D', 'E'].map((impact) => (
          <View key={impact} className="flex-row items-center">
            <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
              <Text className="text-sm font-bold text-gray-700">{impact}</Text>
            </View>
            <View className="flex-1 flex-row space-x-2">
              {[1, 2, 3, 4, 5].map((prob) => {
                const score = (6 - ['A', 'B', 'C', 'D', 'E'].indexOf(impact)) * prob;
                let bgColor = 'bg-green-100';
                let textColor = 'text-green-800';
                
                if (score >= 15) {
                  bgColor = 'bg-red-100';
                  textColor = 'text-red-800';
                } else if (score >= 8) {
                  bgColor = 'bg-yellow-100';
                  textColor = 'text-yellow-800';
                }
                
                return (
                  <View key={prob} className={`flex-1 h-10 ${bgColor} rounded-lg items-center justify-center`}>
                    <Text className={`text-xs font-bold ${textColor}`}>{score}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
        <View className="flex-row items-center mt-4">
          <Text className="text-sm text-gray-600 mr-4">Probability:</Text>
          <View className="flex-row space-x-2">
            {[1, 2, 3, 4, 5].map((prob) => (
              <View key={prob} className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
                <Text className="text-xs font-bold text-gray-700">{prob}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const HazardForm = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-semibold text-gray-800">Add New Hazard</Text>
        <TouchableOpacity onPress={() => setShowForm(false)}>
          <Ionicons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={true}>
        <View className="space-y-4">
          {/* Category */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Category *</Text>
            <View className="flex-row flex-wrap gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  className={`px-3 py-2 rounded-lg border ${
                    formData.category === cat ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'
                  }`}
                  onPress={() => setFormData({ ...formData, category: cat })}
                >
                  <Text className={`text-sm ${
                    formData.category === cat ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Subcategory */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Subcategory</Text>
            <View className="flex-row flex-wrap gap-2">
              {subcategories.map((sub) => (
                <TouchableOpacity
                  key={sub}
                  className={`px-3 py-2 rounded-lg border ${
                    formData.subcategory === sub ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'
                  }`}
                  onPress={() => setFormData({ ...formData, subcategory: sub })}
                >
                  <Text className={`text-sm ${
                    formData.subcategory === sub ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {sub}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Source */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Source</Text>
            <TextInput
              className="border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Enter hazard source"
              value={formData.source}
              onChangeText={(text) => setFormData({ ...formData, source: text })}
            />
          </View>

          {/* Threat */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Threat *</Text>
            <View className="flex-row flex-wrap gap-2">
              {threats.map((threat) => (
                <TouchableOpacity
                  key={threat}
                  className={`px-3 py-2 rounded-lg border ${
                    formData.threat === threat ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'
                  }`}
                  onPress={() => setFormData({ ...formData, threat: threat })}
                >
                  <Text className={`text-sm ${
                    formData.threat === threat ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {threat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Consequence */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Consequence *</Text>
            <TextInput
              className="border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Describe the potential consequence"
              value={formData.consequence}
              onChangeText={(text) => setFormData({ ...formData, consequence: text })}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Impact and Probability */}
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-2">Impact Level</Text>
              <View className="flex-row space-x-2">
                {['A', 'B', 'C', 'D', 'E'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    className={`w-10 h-10 rounded-lg items-center justify-center ${
                      formData.impact === level ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                    onPress={() => setFormData({ ...formData, impact: level as 'A' | 'B' | 'C' | 'D' | 'E' })}
                  >
                    <Text className={`text-sm font-bold ${
                      formData.impact === level ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-2">Probability</Text>
              <View className="flex-row space-x-2">
                {[1, 2, 3, 4, 5].map((prob) => (
                  <TouchableOpacity
                    key={prob}
                    className={`w-10 h-10 rounded-lg items-center justify-center ${
                      formData.probability === prob ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                    onPress={() => setFormData({ ...formData, probability: prob as 1 | 2 | 3 | 4 | 5 })}
                  >
                    <Text className={`text-sm font-bold ${
                      formData.probability === prob ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {prob}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-lg py-4 mt-6"
            onPress={addHazard}
          >
            <Text className="text-white text-center font-semibold">Add Hazard</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const HazardList = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-semibold text-gray-800">Identified Hazards</Text>
        <Text className="text-sm text-gray-500">{hazards.length} hazards</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={true}>
        <View className="space-y-4">
          {hazards.map((hazard) => (
            <View key={hazard.id} className="border border-gray-200 rounded-xl p-4">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800 mb-1">{hazard.threat}</Text>
                  <Text className="text-sm text-gray-600 mb-2">{hazard.consequence}</Text>
                  <View className="flex-row items-center space-x-4">
                    <View className="flex-row items-center">
                      <Ionicons name="folder" size={16} color="#6b7280" />
                      <Text className="text-xs text-gray-500 ml-1">{hazard.category}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="location" size={16} color="#6b7280" />
                      <Text className="text-xs text-gray-500 ml-1">{hazard.source}</Text>
                    </View>
                  </View>
                </View>
                <View className={`px-3 py-1 rounded-full ${
                  hazard.riskLevel === 'High' ? 'bg-red-100' :
                  hazard.riskLevel === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <Text className={`text-xs font-semibold ${
                    hazard.riskLevel === 'High' ? 'text-red-700' :
                    hazard.riskLevel === 'Medium' ? 'text-yellow-700' : 'text-green-700'
                  }`}>
                    {hazard.riskLevel}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-4">
                  <View className="flex-row items-center">
                    <Text className="text-xs text-gray-500 mr-1">Impact:</Text>
                    <View className="w-6 h-6 bg-gray-100 rounded items-center justify-center">
                      <Text className="text-xs font-bold text-gray-700">{hazard.impact}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-xs text-gray-500 mr-1">Probability:</Text>
                    <View className="w-6 h-6 bg-gray-100 rounded items-center justify-center">
                      <Text className="text-xs font-bold text-gray-700">{hazard.probability}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-vertical" size={16} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const Header = () => (
    <View className="bg-white border-b border-gray-200 px-6 py-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#6b7280" />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-bold text-gray-800">HAZID Analysis</Text>
            <Text className="text-sm text-gray-500">Hazard Identification</Text>
          </View>
        </View>
        
        <TouchableOpacity
          className="bg-blue-600 rounded-lg px-4 py-2"
          onPress={() => setShowForm(true)}
        >
          <Text className="text-white font-semibold">Add Hazard</Text>
        </TouchableOpacity>
      </View>
      
      {/* Project and Node Selection */}
      <View className="flex-row items-center mt-4 space-x-4">
        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-700 mb-1">Project</Text>
          <View className="bg-gray-100 rounded-lg px-3 py-2">
            <Text className="text-sm text-gray-800">{selectedProject}</Text>
          </View>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-700 mb-1">Node</Text>
          <View className="bg-gray-100 rounded-lg px-3 py-2">
            <Text className="text-sm text-gray-800">{selectedNode}</Text>
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
            <Text className="text-green-800 font-bold">HAZID ANALYSIS SCREEN</Text>
            <Text className="text-green-600">Scrollable and responsive design</Text>
          </View>

          {showForm ? <HazardForm /> : (
            <>
              <RiskMatrix />
              <HazardList />
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HAZIDScreen; 