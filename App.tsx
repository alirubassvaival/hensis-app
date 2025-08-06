import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

// Professional Dashboard Component
const DashboardScreen = ({ navigation }: any) => {
  const QuickActionCard = ({ title, subtitle, icon, color, onPress }: any) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        marginBottom: 16,
        shadowColor: color,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1,
        borderColor: `${color}20`,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <View 
          style={{ 
            width: 48, 
            height: 48, 
            borderRadius: 16, 
            backgroundColor: `${color}15`,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 16
          }}
        >
          <Text style={{ fontSize: 24, color: color }}>{icon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 4 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>{subtitle}</Text>
        </View>
        <View style={{ 
          width: 32, 
          height: 32, 
          borderRadius: 16, 
          backgroundColor: `${color}10`,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 16, color: color }}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const StatCard = ({ title, value, change, icon, color, subtitle }: any) => (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#f0f0f0',
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 4, fontWeight: '500' }}>{title}</Text>
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#1a1a1a', marginBottom: 4 }}>
            {value}
          </Text>
          {subtitle && (
            <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>{subtitle}</Text>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ 
              paddingHorizontal: 8, 
              paddingVertical: 4, 
              borderRadius: 12,
              backgroundColor: change.startsWith('+') ? '#dcfce7' : '#fef2f2'
            }}>
              <Text style={{ 
                fontSize: 12, 
                fontWeight: '600',
                color: change.startsWith('+') ? '#166534' : '#dc2626'
              }}>
                {change}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ 
          width: 48, 
          height: 48, 
          borderRadius: 16, 
          backgroundColor: `${color}15`,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 20, color: color }}>{icon}</Text>
        </View>
      </View>
    </View>
  );

  const RecentProjectCard = ({ name, status, progress, lastUpdated, client }: any) => {
    const statusColors = {
      active: { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
      completed: { bg: '#dcfce7', text: '#166534', border: '#22c55e' },
      pending: { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
    };
    const colors = statusColors[status];

    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 4,
          borderWidth: 1,
          borderColor: '#f5f5f5',
        }}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginBottom: 4 }}>
              {name}
            </Text>
            <Text style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{client}</Text>
          </View>
          <View style={{ 
            paddingHorizontal: 12, 
            paddingVertical: 6, 
            borderRadius: 20,
            backgroundColor: colors.bg,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: colors.text, textTransform: 'uppercase' }}>
              {status}
            </Text>
          </View>
        </View>
        
        <View style={{ marginBottom: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <Text style={{ fontSize: 12, color: '#666', fontWeight: '500' }}>Progress</Text>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#1a1a1a' }}>{progress}%</Text>
          </View>
          <View style={{ 
            width: '100%', 
            height: 6, 
            backgroundColor: '#f0f0f0', 
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <View 
              style={{ 
                height: '100%', 
                borderRadius: 3,
                backgroundColor: colors.border,
                width: `${progress}%`
              }}
            />
          </View>
        </View>
        
        <Text style={{ fontSize: 11, color: '#999' }}>Last updated: {lastUpdated}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fafafa' }} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={{ 
        paddingHorizontal: 20, 
        paddingTop: 20, 
        paddingBottom: 24,
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 32, fontWeight: '800', color: '#ffffff', marginBottom: 8 }}>
            Welcome back! 👋
          </Text>
          <Text style={{ fontSize: 16, color: '#e0e7ff', lineHeight: 24 }}>
            Ready to analyze hazards and manage risks with AI-powered insights
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#1a1a1a', marginBottom: 20 }}>
          Quick Actions
        </Text>
        <QuickActionCard
          title="HAZID Analysis"
          subtitle="Identify and assess hazards with interactive risk matrix"
          icon="⚠️"
          color="#ef4444"
          onPress={() => navigation.navigate('HAZID')}
        />
        <QuickActionCard
          title="HAZOP Analysis"
          subtitle="Detailed hazard and operability studies with guide words"
          icon="📊"
          color="#3b82f6"
          onPress={() => navigation.navigate('HAZOP')}
        />
        <QuickActionCard
          title="Project Management"
          subtitle="Manage projects with hierarchical structure and client organization"
          icon="📁"
          color="#10b981"
          onPress={() => navigation.navigate('Projects')}
        />
        <QuickActionCard
          title="AI Configuration"
          subtitle="Configure AI features, risk matrices, and client settings"
          icon="⚙️"
          color="#8b5cf6"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      {/* Statistics Grid */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#1a1a1a', marginBottom: 20 }}>
          Overview
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <StatCard 
              title="Active Projects" 
              value="12" 
              change="+2" 
              icon="📈"
              color="#3b82f6"
              subtitle="This month"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <StatCard 
              title="Completed" 
              value="8" 
              change="+1" 
              icon="✅"
              color="#10b981"
              subtitle="This month"
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <StatCard 
              title="High Risk Items" 
              value="3" 
              change="-1" 
              icon="🚨"
              color="#ef4444"
              subtitle="Requires attention"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <StatCard 
              title="AI Accuracy" 
              value="94%" 
              change="+2%" 
              icon="🤖"
              color="#8b5cf6"
              subtitle="Learning rate"
            />
          </View>
        </View>
      </View>

      {/* Recent Projects */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#1a1a1a' }}>
            Recent Projects
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Projects')}>
            <Text style={{ fontSize: 14, color: '#3b82f6', fontWeight: '600' }}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <RecentProjectCard
          name="Oil Refinery Unit XV011"
          client="Shell International"
          status="active"
          progress={75}
          lastUpdated="2 hours ago"
        />
        <RecentProjectCard
          name="Gas Processing Plant VQ02"
          client="ExxonMobil"
          status="active"
          progress={45}
          lastUpdated="1 day ago"
        />
        <RecentProjectCard
          name="Chemical Storage Facility"
          client="Dow Chemical"
          status="completed"
          progress={100}
          lastUpdated="3 days ago"
        />
      </View>

      {/* AI Features Highlight */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        <View style={{ 
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 24,
          padding: 24,
          shadowColor: '#667eea',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 24, marginRight: 12 }}>✨</Text>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#ffffff' }}>
              AI-Powered Features
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: '#e0e7ff', lineHeight: 22, marginBottom: 16 }}>
            Leverage advanced AI for text polishing, speech-to-text, and intelligent risk assessment with 90% accuracy
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <View style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              paddingHorizontal: 12, 
              paddingVertical: 6, 
              borderRadius: 16, 
              marginRight: 8, 
              marginBottom: 8 
            }}>
              <Text style={{ fontSize: 12, color: '#ffffff', fontWeight: '500' }}>Text Polishing</Text>
            </View>
            <View style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              paddingHorizontal: 12, 
              paddingVertical: 6, 
              borderRadius: 16, 
              marginRight: 8, 
              marginBottom: 8 
            }}>
              <Text style={{ fontSize: 12, color: '#ffffff', fontWeight: '500' }}>Speech-to-Text</Text>
            </View>
            <View style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              paddingHorizontal: 12, 
              paddingVertical: 6, 
              borderRadius: 16, 
              marginRight: 8, 
              marginBottom: 8 
            }}>
              <Text style={{ fontSize: 12, color: '#ffffff', fontWeight: '500' }}>Smart Analysis</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Professional HAZID Screen
const HAZIDScreen = ({ navigation }: any) => {
  const [selectedProject, setSelectedProject] = React.useState('Oil Refinery Unit XV011');
  const [selectedNode, setSelectedNode] = React.useState('VQ02 - Gas Vessel');
  const [hazards, setHazards] = React.useState([
    { id: '1', threat: 'Overpressure', category: 'Process', riskLevel: 'High', impact: 'A', probability: 4 },
    { id: '2', threat: 'Leakage', category: 'Mechanical', riskLevel: 'Medium', impact: 'C', probability: 3 },
  ]);

  const RiskMatrix = () => (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 6,
    }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 }}>
        Risk Assessment Matrix
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#666' }}>Impact</Text>
        </View>
        {[1, 2, 3, 4, 5].map((prob) => (
          <View key={prob} style={{ flex: 1, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#666' }}>P{prob}</Text>
          </View>
        ))}
      </View>
      {['A', 'B', 'C', 'D', 'E'].map((impact) => (
        <View key={impact} style={{ flexDirection: 'row', marginBottom: 4 }}>
          <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}>{impact}</Text>
          </View>
          {[1, 2, 3, 4, 5].map((prob) => {
            const riskLevel = (impact === 'A' && prob >= 3) || (impact === 'B' && prob >= 4) ? 'High' :
                            (impact === 'C' && prob >= 4) || (impact === 'D' && prob >= 5) ? 'Medium' : 'Low';
            const colors = { High: '#ef4444', Medium: '#f59e0b', Low: '#22c55e' };
            return (
              <TouchableOpacity
                key={prob}
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: `${colors[riskLevel]}20`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 2,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: '600', color: colors[riskLevel] }}>{prob}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );

  const HazardCard = ({ hazard }: any) => (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 4,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#1a1a1a', flex: 1 }}>
          {hazard.threat}
        </Text>
        <View style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
          backgroundColor: hazard.riskLevel === 'High' ? '#fef2f2' : 
                          hazard.riskLevel === 'Medium' ? '#fef3c7' : '#dcfce7',
        }}>
          <Text style={{
            fontSize: 11,
            fontWeight: '600',
            color: hazard.riskLevel === 'High' ? '#dc2626' : 
                   hazard.riskLevel === 'Medium' ? '#d97706' : '#166534',
          }}>
            {hazard.riskLevel}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
        Category: {hazard.category}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: '#999' }}>
          Impact: {hazard.impact} • Probability: {hazard.probability}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fafafa' }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#1a1a1a', marginBottom: 8 }}>
          HAZID Analysis
        </Text>
        <Text style={{ fontSize: 16, color: '#666', lineHeight: 24 }}>
          Identify and assess hazards with interactive risk matrix
        </Text>
      </View>

      {/* Project Selection */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 6,
        }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 }}>
            Project Configuration
          </Text>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Project</Text>
            <TouchableOpacity style={{
              backgroundColor: '#f8fafc',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: '#e2e8f0',
            }}>
              <Text style={{ fontSize: 16, color: '#1a1a1a', fontWeight: '500' }}>{selectedProject}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Node/System</Text>
            <TouchableOpacity style={{
              backgroundColor: '#f8fafc',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: '#e2e8f0',
            }}>
              <Text style={{ fontSize: 16, color: '#1a1a1a', fontWeight: '500' }}>{selectedNode}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Risk Matrix */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
        <RiskMatrix />
      </View>

      {/* Identified Hazards */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#1a1a1a' }}>
            Identified Hazards ({hazards.length})
          </Text>
          <TouchableOpacity style={{
            backgroundColor: '#3b82f6',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 12,
          }}>
            <Text style={{ fontSize: 14, color: 'white', fontWeight: '600' }}>Add Hazard</Text>
          </TouchableOpacity>
        </View>
        
        {hazards.map((hazard) => (
          <HazardCard key={hazard.id} hazard={hazard} />
        ))}
      </View>
    </ScrollView>
  );
};

const HAZOPScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 }}>
      HAZOP Analysis
    </Text>
    <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center', paddingHorizontal: 32 }}>
      Detailed hazard and operability studies with guide words and parameters
    </Text>
  </View>
);

// Professional Projects Screen
const ProjectsScreen = ({ navigation }: any) => {
  const [selectedClient, setSelectedClient] = React.useState('All Clients');
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const projects = [
    {
      id: '1',
      name: 'Oil Refinery Unit XV011',
      client: 'Shell International',
      status: 'Active',
      progress: 75,
      lastUpdated: '2 hours ago',
      riskProfile: { high: 3, medium: 8, low: 12 },
      nodes: [
        { id: '1', name: 'VQ02 - Gas Vessel', tag: 'VQ02', status: 'In Progress', hazidCompleted: true, hazopCompleted: false },
        { id: '2', name: 'VQ01 - Storage Tank', tag: 'VQ01', status: 'Completed', hazidCompleted: true, hazopCompleted: true },
      ],
    },
    {
      id: '2',
      name: 'Gas Processing Plant VQ02',
      client: 'ExxonMobil',
      status: 'Active',
      progress: 45,
      lastUpdated: '1 day ago',
      riskProfile: { high: 1, medium: 5, low: 8 },
      nodes: [
        { id: '3', name: 'Compressor Station', tag: 'CS01', status: 'In Progress', hazidCompleted: true, hazopCompleted: false },
      ],
    },
    {
      id: '3',
      name: 'Chemical Storage Facility',
      client: 'Dow Chemical',
      status: 'Completed',
      progress: 100,
      lastUpdated: '3 days ago',
      riskProfile: { high: 0, medium: 2, low: 15 },
      nodes: [
        { id: '4', name: 'Storage Tanks', tag: 'ST01', status: 'Completed', hazidCompleted: true, hazopCompleted: true },
      ],
    },
  ];

  const clients = ['All Clients', 'Shell International', 'ExxonMobil', 'Dow Chemical'];

  const ProjectCard = ({ project }: any) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#f0f0f0',
      }}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 4 }}>
            {project.name}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{project.client}</Text>
        </View>
        <View style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          backgroundColor: project.status === 'Active' ? '#dbeafe' : 
                          project.status === 'Completed' ? '#dcfce7' : '#fef3c7',
          borderWidth: 1,
          borderColor: project.status === 'Active' ? '#3b82f6' : 
                      project.status === 'Completed' ? '#22c55e' : '#f59e0b',
        }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '600',
            color: project.status === 'Active' ? '#1e40af' : 
                   project.status === 'Completed' ? '#166534' : '#92400e',
          }}>
            {project.status}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 14, color: '#666', fontWeight: '500' }}>Progress</Text>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}>{project.progress}%</Text>
        </View>
        <View style={{
          width: '100%',
          height: 8,
          backgroundColor: '#f0f0f0',
          borderRadius: 4,
          overflow: 'hidden',
        }}>
          <View
            style={{
              height: '100%',
              borderRadius: 4,
              backgroundColor: project.status === 'Completed' ? '#22c55e' : '#3b82f6',
              width: `${project.progress}%`,
            }}
          />
        </View>
      </View>

      {/* Risk Profile */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 12, height: 12, backgroundColor: '#ef4444', borderRadius: 6, marginRight: 6 }} />
          <Text style={{ fontSize: 12, color: '#666' }}>{project.riskProfile.high} High</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 12, height: 12, backgroundColor: '#f59e0b', borderRadius: 6, marginRight: 6 }} />
          <Text style={{ fontSize: 12, color: '#666' }}>{project.riskProfile.medium} Medium</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 12, height: 12, backgroundColor: '#22c55e', borderRadius: 6, marginRight: 6 }} />
          <Text style={{ fontSize: 12, color: '#666' }}>{project.riskProfile.low} Low</Text>
        </View>
      </View>

      {/* Nodes Summary */}
      <View style={{ borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 12 }}>
          Nodes ({project.nodes.length})
        </Text>
        {project.nodes.map((node: any) => (
          <View key={node.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 13, color: '#666', flex: 1 }}>{node.tag} - {node.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: node.hazidCompleted ? '#22c55e' : '#d1d5db',
                marginRight: 4,
              }} />
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: node.hazopCompleted ? '#3b82f6' : '#d1d5db',
              }} />
            </View>
          </View>
        ))}
      </View>

      <Text style={{ fontSize: 12, color: '#999', marginTop: 12 }}>
        Last updated: {project.lastUpdated}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fafafa' }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#1a1a1a' }}>
            Projects
          </Text>
          <TouchableOpacity style={{
            backgroundColor: '#3b82f6',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 12,
          }}>
            <Text style={{ fontSize: 14, color: 'white', fontWeight: '600' }}>Add Project</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 4,
        }}>
          <Text style={{ fontSize: 16, color: '#666' }}>🔍 Search projects...</Text>
        </View>

        {/* Client Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', paddingRight: 20 }}>
            {clients.map((client) => (
              <TouchableOpacity
                key={client}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: selectedClient === client ? '#3b82f6' : 'white',
                  marginRight: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 4,
                }}
                onPress={() => setSelectedClient(client)}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: selectedClient === client ? 'white' : '#666',
                }}>
                  {client}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Projects List */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </View>
    </ScrollView>
  );
};

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 }}>
      Settings
    </Text>
    <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center', paddingHorizontal: 32 }}>
      Configure client settings, AI features, and risk matrix preferences
    </Text>
  </View>
);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ title: 'Hensis Dashboard' }}
        />
        <Stack.Screen 
          name="HAZID" 
          component={HAZIDScreen}
          options={{ title: 'HAZID Analysis' }}
        />
        <Stack.Screen 
          name="HAZOP" 
          component={HAZOPScreen}
          options={{ title: 'HAZOP Analysis' }}
        />
        <Stack.Screen 
          name="Projects" 
          component={ProjectsScreen}
          options={{ title: 'Projects' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
