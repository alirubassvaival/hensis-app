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

type ProjectsNavigationProp = StackNavigationProp<RootStackParamList, 'Projects'>;

const { width } = Dimensions.get('window');

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'Active' | 'Completed' | 'Pending' | 'Archived';
  progress: number;
  lastUpdated: string;
  nodes: Node[];
  riskProfile: {
    high: number;
    medium: number;
    low: number;
  };
}

interface Node {
  id: string;
  name: string;
  tag: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  hazidCompleted: boolean;
  hazopCompleted: boolean;
}

const ProjectsScreen: React.FC = () => {
  const navigation = useNavigation<ProjectsNavigationProp>();
  const [selectedClient, setSelectedClient] = useState('All Clients');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);
  
  // Mock data based on discovery sessions
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Oil Refinery Unit XV011',
      client: 'Shell International',
      status: 'Active',
      progress: 75,
      lastUpdated: '2 hours ago',
      nodes: [
        { id: '1', name: 'VQ02 - Gas Vessel', tag: 'VQ02', status: 'In Progress', hazidCompleted: true, hazopCompleted: false },
        { id: '2', name: 'VQ01 - Storage Tank', tag: 'VQ01', status: 'Completed', hazidCompleted: true, hazopCompleted: true },
        { id: '3', name: 'VQ03 - Processing Unit', tag: 'VQ03', status: 'Not Started', hazidCompleted: false, hazopCompleted: false },
      ],
      riskProfile: { high: 3, medium: 8, low: 12 },
    },
    {
      id: '2',
      name: 'Gas Processing Plant VQ02',
      client: 'ExxonMobil',
      status: 'Active',
      progress: 45,
      lastUpdated: '1 day ago',
      nodes: [
        { id: '4', name: 'Compressor Station', tag: 'CS01', status: 'In Progress', hazidCompleted: true, hazopCompleted: false },
        { id: '5', name: 'Heat Exchanger', tag: 'HE01', status: 'Not Started', hazidCompleted: false, hazopCompleted: false },
      ],
      riskProfile: { high: 1, medium: 5, low: 8 },
    },
    {
      id: '3',
      name: 'Chemical Storage Facility',
      client: 'Dow Chemical',
      status: 'Completed',
      progress: 100,
      lastUpdated: '3 days ago',
      nodes: [
        { id: '6', name: 'Storage Tanks', tag: 'ST01', status: 'Completed', hazidCompleted: true, hazopCompleted: true },
        { id: '7', name: 'Loading Station', tag: 'LS01', status: 'Completed', hazidCompleted: true, hazopCompleted: true },
      ],
      riskProfile: { high: 0, medium: 2, low: 15 },
    },
  ]);

  const clients = ['All Clients', 'Shell International', 'ExxonMobil', 'Dow Chemical', 'BP'];

  const filteredProjects = projects.filter(project => {
    const matchesClient = selectedClient === 'All Clients' || project.client === selectedClient;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClient && matchesSearch;
  });

  const ProjectCard = ({ project }: { project: Project }) => (
    <TouchableOpacity className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text className="text-lg font-semibold text-gray-800 mb-1">{project.name}</Text>
          <Text className="text-sm text-gray-600">{project.client}</Text>
        </View>
        <View 
          className={`px-2 py-1 rounded-full ${
            project.status === 'Active' ? 'bg-blue-100' :
            project.status === 'Completed' ? 'bg-green-100' :
            project.status === 'Pending' ? 'bg-yellow-100' : 'bg-gray-100'
          }`}
        >
          <Text 
            className={`text-xs font-medium ${
              project.status === 'Active' ? 'text-blue-700' :
              project.status === 'Completed' ? 'text-green-700' :
              project.status === 'Pending' ? 'text-yellow-700' : 'text-gray-700'
            }`}
          >
            {project.status}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="mb-3">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-sm text-gray-600">Progress</Text>
          <Text className="text-sm font-medium text-gray-800">{project.progress}%</Text>
        </View>
        <View className="w-full bg-gray-200 rounded-full h-2">
          <View 
            className="h-2 rounded-full"
            style={{ 
              width: `${project.progress}%`,
              backgroundColor: project.status === 'Completed' ? '#22c55e' : '#3b82f6'
            }}
          />
        </View>
      </View>

      {/* Risk Profile */}
      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-3 h-3 bg-red-500 rounded-full mr-1" />
          <Text className="text-xs text-gray-600">{project.riskProfile.high} High</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 bg-yellow-500 rounded-full mr-1" />
          <Text className="text-xs text-gray-600">{project.riskProfile.medium} Medium</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 bg-green-500 rounded-full mr-1" />
          <Text className="text-xs text-gray-600">{project.riskProfile.low} Low</Text>
        </View>
      </View>

      {/* Nodes Summary */}
      <View className="border-t border-gray-100 pt-3">
        <Text className="text-sm font-medium text-gray-700 mb-2">Nodes ({project.nodes.length})</Text>
        <View className="space-y-1">
          {project.nodes.slice(0, 2).map((node) => (
            <View key={node.id} className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-600">{node.tag} - {node.name}</Text>
              <View className="flex-row space-x-1">
                <View className={`w-2 h-2 rounded-full ${
                  node.hazidCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <View className={`w-2 h-2 rounded-full ${
                  node.hazopCompleted ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
              </View>
            </View>
          ))}
          {project.nodes.length > 2 && (
            <Text className="text-xs text-gray-500">+{project.nodes.length - 2} more nodes</Text>
          )}
        </View>
      </View>

      <Text className="text-xs text-gray-500 mt-3">Last updated: {project.lastUpdated}</Text>
    </TouchableOpacity>
  );

  const AddProjectForm = () => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">Add New Project</Text>
      
      <View className="space-y-4">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Project Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
            placeholder="Enter project name..."
          />
        </View>
        
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Client</Text>
          <View className="flex-row flex-wrap">
            {clients.slice(1).map((client) => (
              <TouchableOpacity
                key={client}
                className="px-3 py-2 rounded-full bg-gray-100 mr-2 mb-2"
              >
                <Text className="text-sm text-gray-700">{client}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex-row space-x-2">
          <TouchableOpacity
            className="flex-1 bg-gray-500 rounded-lg py-3 items-center"
            onPress={() => setShowAddProject(false)}
          >
            <Text className="text-white font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-blue-500 rounded-lg py-3 items-center"
            onPress={() => {
              Alert.alert('Success', 'Project added successfully!');
              setShowAddProject(false);
            }}
          >
            <Text className="text-white font-semibold">Add Project</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-gray-800">Projects</Text>
            <TouchableOpacity
              className="bg-blue-500 rounded-lg px-4 py-2"
              onPress={() => setShowAddProject(!showAddProject)}
            >
              <Text className="text-white font-semibold">Add Project</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="mb-4">
            <View className="flex-row items-center bg-white rounded-lg px-3 py-2 border border-gray-200">
              <Ionicons name="search" size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-2 text-gray-800"
                placeholder="Search projects..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Client Filter */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Filter by Client</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-2">
                {clients.map((client) => (
                  <TouchableOpacity
                    key={client}
                    className={`px-3 py-2 rounded-full border ${
                      selectedClient === client 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'bg-white border-gray-300'
                    }`}
                    onPress={() => setSelectedClient(client)}
                  >
                    <Text className={`text-sm font-medium ${
                      selectedClient === client ? 'text-white' : 'text-gray-700'
                    }`}>
                      {client}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Add Project Form */}
        {showAddProject && <AddProjectForm />}

        {/* Projects List */}
        <View className="px-4">
          {filteredProjects.length === 0 ? (
            <View className="items-center py-12">
              <Ionicons name="folder-open-outline" size={64} color="#9ca3af" />
              <Text className="text-gray-500 text-lg mt-4">No projects found</Text>
              <Text className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</Text>
            </View>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </View>

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectsScreen; 