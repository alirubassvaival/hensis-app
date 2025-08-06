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

type ProjectsNavigationProp = StackNavigationProp<RootStackParamList, 'Projects'>;

const { width, height } = Dimensions.get('window');

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'Active' | 'Completed' | 'Pending' | 'On Hold';
  progress: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  startDate: string;
  endDate: string;
  team: string[];
  description: string;
  hazidCount: number;
  hazopCount: number;
}

const ProjectsScreen: React.FC = () => {
  const navigation = useNavigation<ProjectsNavigationProp>();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Oil Refinery Unit XV011',
      client: 'PetroCorp Industries',
      status: 'Active',
      progress: 75,
      riskLevel: 'Medium',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      team: ['John Smith', 'Sarah Johnson', 'Mike Chen'],
      description: 'Comprehensive hazard analysis for new oil refinery unit including HAZID and HAZOP studies.',
      hazidCount: 12,
      hazopCount: 8,
    },
    {
      id: '2',
      name: 'Chemical Plant Safety Audit',
      client: 'ChemSafe Solutions',
      status: 'Pending',
      progress: 45,
      riskLevel: 'Low',
      startDate: '2024-02-01',
      endDate: '2024-05-15',
      team: ['Lisa Wang', 'David Brown'],
      description: 'Safety audit and risk assessment for chemical processing facility.',
      hazidCount: 8,
      hazopCount: 5,
    },
    {
      id: '3',
      name: 'Gas Pipeline HAZOP',
      client: 'EnergyFlow Corp',
      status: 'Active',
      progress: 90,
      riskLevel: 'High',
      startDate: '2023-11-01',
      endDate: '2024-03-31',
      team: ['Alex Rodriguez', 'Emma Wilson', 'Tom Davis'],
      description: 'HAZOP study for natural gas pipeline system with focus on operational safety.',
      hazidCount: 15,
      hazopCount: 12,
    },
    {
      id: '4',
      name: 'Nuclear Facility Assessment',
      client: 'Nuclear Power Inc',
      status: 'On Hold',
      progress: 30,
      riskLevel: 'High',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      team: ['Dr. Robert Kim', 'Dr. Maria Garcia'],
      description: 'Comprehensive safety assessment for nuclear power facility.',
      hazidCount: 20,
      hazopCount: 15,
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Completed' | 'Pending' | 'On Hold'>('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    description: '',
    startDate: '',
    endDate: '',
    team: '',
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const createProject = () => {
    if (!formData.name || !formData.client || !formData.description) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name,
      client: formData.client,
      status: 'Pending',
      progress: 0,
      riskLevel: 'Medium',
      startDate: formData.startDate,
      endDate: formData.endDate,
      team: formData.team ? formData.team.split(',').map(t => t.trim()) : [],
      description: formData.description,
      hazidCount: 0,
      hazopCount: 0,
    };

    setProjects([...projects, newProject]);
    setFormData({
      name: '',
      client: '',
      description: '',
      startDate: '',
      endDate: '',
      team: '',
    });
    setShowCreateForm(false);
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const statusColors = {
      Active: 'bg-green-100 text-green-800',
      Completed: 'bg-blue-100 text-blue-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      'On Hold': 'bg-gray-100 text-gray-800',
    };

    const riskColors = {
      High: 'bg-red-100 text-red-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Low: 'bg-green-100 text-green-800',
    };

    return (
      <TouchableOpacity 
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4"
        onPress={() => {
          // Navigate to project details or dashboard
          navigation.navigate('Dashboard');
        }}
      >
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-800 mb-1">{project.name}</Text>
            <Text className="text-sm text-gray-600 mb-2">{project.client}</Text>
            <Text className="text-sm text-gray-700 mb-3">{project.description}</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <View className={`px-3 py-1 rounded-full ${statusColors[project.status]}`}>
              <Text className="text-xs font-bold">{project.status}</Text>
            </View>
            <View className={`px-3 py-1 rounded-full ${riskColors[project.riskLevel]}`}>
              <Text className="text-xs font-bold">{project.riskLevel} Risk</Text>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-gray-600">Progress</Text>
            <Text className="text-sm font-medium text-gray-800">{project.progress}%</Text>
          </View>
          <View className="w-full bg-gray-200 rounded-full h-3">
            <View 
              className="bg-purple-500 h-3 rounded-full" 
              style={{ width: `${project.progress}%` }}
            />
          </View>
        </View>

        {/* Project Stats */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center">
              <Ionicons name="warning-outline" size={16} color="#6b7280" />
              <Text className="text-sm text-gray-600 ml-1">{project.hazidCount} HAZID</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="analytics-outline" size={16} color="#6b7280" />
              <Text className="text-sm text-gray-600 ml-1">{project.hazopCount} HAZOP</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-600 ml-1">{project.team.length} members</Text>
          </View>
        </View>

        {/* Team Members */}
        <View className="mb-4">
          <Text className="text-xs font-medium text-gray-500 mb-2">TEAM</Text>
          <View className="flex-row flex-wrap">
            {project.team.slice(0, 3).map((member, index) => (
              <View key={index} className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-1">
                <Text className="text-xs text-gray-700">{member}</Text>
              </View>
            ))}
            {project.team.length > 3 && (
              <View className="bg-purple-100 rounded-full px-3 py-1 mr-2 mb-1">
                <Text className="text-xs text-purple-600">+{project.team.length - 3}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Dates */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={14} color="#6b7280" />
              <Text className="text-xs text-gray-500 ml-1">{project.startDate}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="calendar" size={14} color="#6b7280" />
              <Text className="text-xs text-gray-500 ml-1">{project.endDate}</Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity className="bg-blue-50 px-3 py-1 rounded-lg">
              <Text className="text-xs font-medium text-blue-600">View</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-50 px-3 py-1 rounded-lg">
              <Text className="text-xs font-medium text-gray-600">Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const CreateProjectForm = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-xl font-semibold text-gray-800">Create New Project</Text>
        <TouchableOpacity 
          className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
          onPress={() => setShowCreateForm(false)}
        >
          <Ionicons name="close" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <View className="space-y-4">
        <View className="flex-row space-x-4">
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-700 mb-2">Project Name *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800"
              placeholder="Enter project name..."
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-700 mb-2">Client *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800"
              placeholder="Enter client name..."
              value={formData.client}
              onChangeText={(text) => setFormData({ ...formData, client: text })}
            />
          </View>
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Description *</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-gray-800"
            placeholder="Describe the project..."
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={3}
          />
        </View>

        <View className="flex-row space-x-4">
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-700 mb-2">Start Date</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800"
              placeholder="YYYY-MM-DD"
              value={formData.startDate}
              onChangeText={(text) => setFormData({ ...formData, startDate: text })}
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-700 mb-2">End Date</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800"
              placeholder="YYYY-MM-DD"
              value={formData.endDate}
              onChangeText={(text) => setFormData({ ...formData, endDate: text })}
            />
          </View>
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Team Members</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-gray-800"
            placeholder="Enter team members (comma separated)..."
            value={formData.team}
            onChangeText={(text) => setFormData({ ...formData, team: text })}
          />
        </View>

        <TouchableOpacity
          className="bg-purple-600 rounded-lg py-3 items-center"
          onPress={createProject}
        >
          <Text className="text-white font-semibold">Create Project</Text>
        </TouchableOpacity>
      </View>
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
            <Text className="text-2xl font-bold text-gray-800">Projects</Text>
            <Text className="text-sm text-gray-500">Manage your projects</Text>
          </View>
        </View>
        
        <TouchableOpacity
          className="bg-purple-600 rounded-lg px-4 py-2 flex-row items-center"
          onPress={() => setShowCreateForm(true)}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">New Project</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View className="mt-4 flex-row items-center space-x-4">
        <View className="flex-1">
          <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
            <Ionicons name="search" size={16} color="#6b7280" />
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Search projects..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        <View className="flex-row items-center space-x-2">
          {(['All', 'Active', 'Completed', 'Pending', 'On Hold'] as const).map((status) => (
            <TouchableOpacity
              key={status}
              className={`px-3 py-2 rounded-lg ${
                filterStatus === status ? 'bg-purple-100' : 'bg-gray-100'
              }`}
              onPress={() => setFilterStatus(status)}
            >
              <Text className={`text-xs font-medium ${
                filterStatus === status ? 'text-purple-600' : 'text-gray-600'
              }`}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const StatsSection = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-6">Project Overview</Text>
      <View className="flex-row space-x-4">
        <View className="flex-1 bg-purple-50 rounded-xl p-4 border border-purple-200">
          <View className="flex-row items-center justify-between mb-2">
            <Ionicons name="folder" size={24} color="#7c3aed" />
            <Text className="text-2xl font-bold text-purple-600">{projects.length}</Text>
          </View>
          <Text className="text-sm text-purple-700 font-medium">Total Projects</Text>
        </View>
        <View className="flex-1 bg-green-50 rounded-xl p-4 border border-green-200">
          <View className="flex-row items-center justify-between mb-2">
            <Ionicons name="checkmark-circle" size={24} color="#059669" />
            <Text className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.status === 'Active').length}
            </Text>
          </View>
          <Text className="text-sm text-green-700 font-medium">Active</Text>
        </View>
        <View className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-200">
          <View className="flex-row items-center justify-between mb-2">
            <Ionicons name="trophy" size={24} color="#1d4ed8" />
            <Text className="text-2xl font-bold text-blue-600">
              {projects.filter(p => p.status === 'Completed').length}
            </Text>
          </View>
          <Text className="text-sm text-blue-700 font-medium">Completed</Text>
        </View>
        <View className="flex-1 bg-red-50 rounded-xl p-4 border border-red-200">
          <View className="flex-row items-center justify-between mb-2">
            <Ionicons name="alert-circle" size={24} color="#dc2626" />
            <Text className="text-2xl font-bold text-red-600">
              {projects.filter(p => p.riskLevel === 'High').length}
            </Text>
          </View>
          <Text className="text-sm text-red-700 font-medium">High Risk</Text>
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
            <Text className="text-green-800 font-bold">PROJECTS SCREEN</Text>
            <Text className="text-green-600">Scrollable and responsive design</Text>
          </View>

          {showCreateForm && <CreateProjectForm />}
          <StatsSection />
          {filteredProjects.length === 0 ? (
            <View className="items-center py-12">
              <Ionicons name="folder-outline" size={64} color="#d1d5db" />
              <Text className="text-gray-500 mt-4 text-lg">No projects found</Text>
              <Text className="text-gray-400 text-sm text-center mt-2">
                {searchQuery || filterStatus !== 'All' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first project to get started'
                }
              </Text>
            </View>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProjectsScreen; 