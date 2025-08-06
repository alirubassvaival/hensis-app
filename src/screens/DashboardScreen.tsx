import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const DashboardScreen: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(width);

  // Handle window resize for proper responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', handleResize);
    return () => {
      // Cleanup if needed
    };
  }, []);

  const isMobileNow = windowWidth < 768;

  const menuItems = [
    { id: 'Dashboard', icon: 'grid-outline', label: 'Dashboard' },
    { id: 'HAZID', icon: 'warning-outline', label: 'HAZID Analysis' },
    { id: 'HAZOP', icon: 'analytics-outline', label: 'HAZOP Analysis' },
    { id: 'Projects', icon: 'folder-outline', label: 'Projects' },
    { id: 'Settings', icon: 'settings-outline', label: 'Settings' },
  ];

  const KPICard = ({ title, value, change, icon, color, bgColor }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={24} color={color} />
        </View>
        <View style={styles.cardValues}>
          <Text style={styles.cardValue}>{value}</Text>
          <Text style={styles.cardChange}>{change}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );

  const ChartCard = ({ title, subtitle, children }: any) => (
    <View style={styles.card}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>{title}</Text>
        <Text style={styles.chartSubtitle}>{subtitle}</Text>
      </View>
      {children}
    </View>
  );

  const ProductCard = ({ name, sales, popularity }: any) => (
    <View style={styles.productCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productSales}>{sales}</Text>
      </View>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= popularity ? 'star' : 'star-outline'}
            size={16}
            color={star <= popularity ? '#fbbf24' : '#d1d5db'}
          />
        ))}
      </View>
    </View>
  );

  const Sidebar = () => (
    <View style={styles.sidebar}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>H</Text>
        </View>
        <Text style={styles.logoTitle}>Hensis</Text>
      </View>

      {/* Navigation Menu */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              selectedMenu === item.id && styles.menuItemActive
            ]}
            onPress={() => setSelectedMenu(item.id)}
          >
            <Ionicons
              name={item.icon as keyof typeof Ionicons.glyphMap}
              size={20}
              color={selectedMenu === item.id ? '#2563eb' : '#6b7280'}
            />
            <Text style={[
              styles.menuText,
              selectedMenu === item.id && styles.menuTextActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pro Card */}
      <View style={styles.proCard}>
        <Text style={styles.proTitle}>Upgrade to Pro</Text>
        <Text style={styles.proSubtitle}>Get access to advanced features</Text>
        <TouchableOpacity style={styles.proButton}>
          <Text style={styles.proButtonText}>Upgrade Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const MobileMenu = () => (
    <View style={[
      styles.mobileMenu,
      showMobileMenu && styles.mobileMenuVisible
    ]}>
      <View style={styles.mobileMenuContent}>
        {/* Mobile Menu Header */}
        <View style={styles.mobileMenuHeader}>
          <View style={styles.mobileLogo}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>H</Text>
            </View>
            <Text style={styles.logoTitle}>Hensis</Text>
          </View>
          <TouchableOpacity onPress={() => setShowMobileMenu(false)}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Mobile Navigation */}
        <View style={styles.mobileMenuItems}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.mobileMenuItem,
                selectedMenu === item.id && styles.menuItemActive
              ]}
              onPress={() => {
                setSelectedMenu(item.id);
                setShowMobileMenu(false);
              }}
            >
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={20}
                color={selectedMenu === item.id ? '#2563eb' : '#6b7280'}
              />
              <Text style={[
                styles.menuText,
                selectedMenu === item.id && styles.menuTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const BottomNavigation = () => (
    <View style={styles.bottomNav}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.bottomNavItem}
          onPress={() => setSelectedMenu(item.id)}
        >
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={24}
            color={selectedMenu === item.id ? '#2563eb' : '#6b7280'}
          />
          <Text style={[
            styles.bottomNavText,
            selectedMenu === item.id && styles.bottomNavTextActive
          ]}>
            {item.label.split(' ')[0]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          {isMobileNow && (
            <TouchableOpacity onPress={() => setShowMobileMenu(true)} style={styles.menuButton}>
              <Ionicons name="menu" size={24} color="#6b7280" />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.headerTitle}>
              {selectedMenu === 'Dashboard' && 'Hensis Dashboard'}
              {selectedMenu === 'HAZID' && 'HAZID Analysis'}
              {selectedMenu === 'HAZOP' && 'HAZOP Analysis'}
              {selectedMenu === 'Projects' && 'Projects'}
              {selectedMenu === 'Settings' && 'Settings'}
            </Text>
            {isMobileNow && (
              <Text style={styles.headerSubtitle}>Hazard Analysis System</Text>
            )}
          </View>
        </View>
        {!isMobileNow && (
          <View style={styles.headerRight}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#6b7280" />
              <Text style={styles.searchText}>Search...</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#6b7280" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.userButton}>
              <View style={styles.userAvatar}>
                <Text style={styles.userInitial}>A</Text>
              </View>
              <Text style={styles.userName}>Analyst</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  // Content components - SIMPLE VIEWS, NO SCROLLVIEWS
  const DashboardContent = () => (
    <View style={styles.content}>
      {/* Debug Info */}
      <View style={styles.debugInfo}>
        <Text style={styles.debugTitle}>DASHBOARD CONTENT</Text>
        <Text style={styles.debugText}>This is the main dashboard view</Text>
      </View>

      {/* KPI Cards */}
      <View style={styles.kpiContainer}>
        <KPICard
          title="Active Projects"
          value="12"
          change="+2 this week"
          icon="folder"
          color="#2563eb"
          bgColor="#dbeafe"
        />
        <KPICard
          title="HAZID Analysis"
          value="8"
          change="+3 this month"
          icon="warning"
          color="#dc2626"
          bgColor="#fee2e2"
        />
        <KPICard
          title="HAZOP Analysis"
          value="15"
          change="+5 this month"
          icon="analytics"
          color="#059669"
          bgColor="#d1fae5"
        />
        <KPICard
          title="Risk Level"
          value="Medium"
          change="-2 this week"
          icon="trending-down"
          color="#7c3aed"
          bgColor="#f3e8ff"
        />
      </View>

      {/* Charts Section */}
      <View style={styles.chartsContainer}>
        <View style={styles.chartItem}>
          <ChartCard title="Risk Matrix Overview" subtitle="Last 30 days">
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>Risk Matrix Chart</Text>
            </View>
          </ChartCard>
        </View>
        <View style={styles.chartItem}>
          <ChartCard title="Hazard Distribution" subtitle="By category">
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>Hazard Chart</Text>
            </View>
          </ChartCard>
        </View>
      </View>

      {/* Recent Projects */}
      <ChartCard title="Recent Projects" subtitle="Latest hazard analysis">
        <ProductCard name="Oil Refinery HAZID" sales="Completed 2 days ago" popularity={4} />
        <ProductCard name="Chemical Plant HAZOP" sales="In progress" popularity={5} />
        <ProductCard name="Pipeline Risk Assessment" sales="Scheduled for next week" popularity={3} />
      </ChartCard>

      {/* Extra content to test scrolling */}
      {Array.from({ length: 10 }, (_, i) => (
        <View key={i} style={styles.testCard}>
          <Text style={styles.testCardTitle}>Content Section {i + 1}</Text>
          <Text style={styles.testCardText}>This is content to test scrolling functionality.</Text>
          <Text style={styles.testCardText}>You should be able to scroll down to see this content.</Text>
          <Text style={styles.testCardText}>If you can see this, scrolling is working!</Text>
        </View>
      ))}
    </View>
  );

  const HAZIDContent = () => (
    <View style={styles.content}>
      {/* Debug Info */}
      <View style={[styles.debugInfo, { backgroundColor: '#dbeafe' }]}>
        <Text style={[styles.debugTitle, { color: '#1e40af' }]}>HAZID ANALYSIS CONTENT</Text>
        <Text style={[styles.debugText, { color: '#3b82f6' }]}>This is the HAZID analysis view</Text>
      </View>

      {/* Risk Matrix */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Risk Assessment Matrix</Text>
        <View style={styles.matrixContainer}>
          {['A', 'B', 'C', 'D', 'E'].map((impact) => (
            <View key={impact} style={styles.matrixRow}>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixCellText}>{impact}</Text>
              </View>
              <View style={styles.matrixScores}>
                {[1, 2, 3, 4, 5].map((prob) => {
                  const score = (6 - ['A', 'B', 'C', 'D', 'E'].indexOf(impact)) * prob;
                  let bgColor = '#dcfce7';
                  let textColor = '#166534';
                  
                  if (score >= 15) {
                    bgColor = '#fee2e2';
                    textColor = '#991b1b';
                  } else if (score >= 8) {
                    bgColor = '#fef3c7';
                    textColor = '#92400e';
                  }
                  
                  return (
                    <View key={prob} style={[styles.scoreCell, { backgroundColor: bgColor }]}>
                      <Text style={[styles.scoreText, { color: textColor }]}>{score}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Hazard List */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Identified Hazards</Text>
        <View style={styles.hazardList}>
          <View style={styles.hazardItem}>
            <View style={styles.hazardHeader}>
              <View style={styles.hazardInfo}>
                <Text style={styles.hazardName}>Overpressure</Text>
                <Text style={styles.hazardDescription}>Vessel rupture, potential explosion</Text>
                <View style={styles.hazardTags}>
                  <View style={styles.hazardTag}>
                    <Ionicons name="folder" size={12} color="#6b7280" />
                    <Text style={styles.hazardTagText}>Process</Text>
                  </View>
                  <View style={styles.hazardTag}>
                    <Ionicons name="location" size={12} color="#6b7280" />
                    <Text style={styles.hazardTagText}>VQ02 - Gas Vessel</Text>
                  </View>
                </View>
              </View>
              <View style={styles.hazardStatus}>
                <Text style={styles.hazardStatusText}>Medium</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Extra content to test scrolling */}
      {Array.from({ length: 8 }, (_, i) => (
        <View key={i} style={styles.testCard}>
          <Text style={styles.testCardTitle}>HAZID Content Section {i + 1}</Text>
          <Text style={styles.testCardText}>This is HAZID content to test scrolling.</Text>
          <Text style={styles.testCardText}>You should be able to scroll down to see this content.</Text>
        </View>
      ))}
    </View>
  );

  const HAZOPContent = () => (
    <View style={styles.content}>
      {/* Debug Info */}
      <View style={[styles.debugInfo, { backgroundColor: '#f3e8ff' }]}>
        <Text style={[styles.debugTitle, { color: '#6b21a8' }]}>HAZOP ANALYSIS CONTENT</Text>
        <Text style={[styles.debugText, { color: '#9333ea' }]}>This is the HAZOP analysis view</Text>
      </View>

      {/* HAZOP Worksheet */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>HAZOP Worksheet</Text>
        <View style={styles.hazopForm}>
          <View style={styles.formRow}>
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Guide Word</Text>
              <View style={styles.formInput}>
                <Text style={styles.formInputText}>MORE</Text>
              </View>
            </View>
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Parameter</Text>
              <View style={styles.formInput}>
                <Text style={styles.formInputText}>Flow</Text>
              </View>
            </View>
          </View>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Deviation</Text>
            <View style={styles.formInput}>
              <Text style={styles.formInputText}>MORE FLOW</Text>
            </View>
          </View>
        </View>
      </View>

      {/* HAZOP Items */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>HAZOP Items</Text>
        <View style={styles.hazopItems}>
          <View style={styles.hazopItem}>
            <View style={styles.hazopItemHeader}>
              <View style={styles.hazopItemInfo}>
                <Text style={styles.hazopItemName}>MORE FLOW</Text>
                <Text style={styles.hazopItemDescription}>Increased flow rate in pipeline</Text>
                <View style={styles.hazopItemTags}>
                  <View style={styles.hazopItemTag}>
                    <Ionicons name="warning" size={12} color="#6b7280" />
                    <Text style={styles.hazopItemTagText}>High Risk</Text>
                  </View>
                </View>
              </View>
              <View style={styles.hazopItemStatus}>
                <Text style={styles.hazopItemStatusText}>High</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Extra content to test scrolling */}
      {Array.from({ length: 8 }, (_, i) => (
        <View key={i} style={styles.testCard}>
          <Text style={styles.testCardTitle}>HAZOP Content Section {i + 1}</Text>
          <Text style={styles.testCardText}>This is HAZOP content to test scrolling.</Text>
          <Text style={styles.testCardText}>You should be able to scroll down to see this content.</Text>
        </View>
      ))}
    </View>
  );

  const ProjectsContent = () => (
    <View style={styles.content}>
      {/* Debug Info */}
      <View style={[styles.debugInfo, { backgroundColor: '#fed7aa' }]}>
        <Text style={[styles.debugTitle, { color: '#c2410c' }]}>PROJECTS CONTENT</Text>
        <Text style={[styles.debugText, { color: '#ea580c' }]}>This is the projects view</Text>
      </View>

      {/* Project Stats */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Project Overview</Text>
        <View style={styles.projectStats}>
          <View style={[styles.statCard, { backgroundColor: '#faf5ff', borderColor: '#c084fc' }]}>
            <View style={styles.statHeader}>
              <Ionicons name="folder" size={24} color="#7c3aed" />
              <Text style={[styles.statValue, { color: '#7c3aed' }]}>8</Text>
            </View>
            <Text style={[styles.statLabel, { color: '#6b21a8' }]}>Total Projects</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#f0fdf4', borderColor: '#86efac' }]}>
            <View style={styles.statHeader}>
              <Ionicons name="checkmark-circle" size={24} color="#059669" />
              <Text style={[styles.statValue, { color: '#059669' }]}>5</Text>
            </View>
            <Text style={[styles.statLabel, { color: '#15803d' }]}>Active</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#eff6ff', borderColor: '#93c5fd' }]}>
            <View style={styles.statHeader}>
              <Ionicons name="trophy" size={24} color="#1d4ed8" />
              <Text style={[styles.statValue, { color: '#1d4ed8' }]}>3</Text>
            </View>
            <Text style={[styles.statLabel, { color: '#1e40af' }]}>Completed</Text>
          </View>
        </View>
      </View>

      {/* Project List */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Projects</Text>
        <View style={styles.projectList}>
          <View style={styles.projectItem}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>Oil Refinery HAZID</Text>
                <Text style={styles.projectDescription}>Safety analysis for refinery operations</Text>
                <View style={styles.projectTags}>
                  <View style={styles.projectTag}>
                    <Ionicons name="warning" size={12} color="#6b7280" />
                    <Text style={styles.projectTagText}>2 HAZID</Text>
                  </View>
                  <View style={styles.projectTag}>
                    <Ionicons name="analytics" size={12} color="#6b7280" />
                    <Text style={styles.projectTagText}>1 HAZOP</Text>
                  </View>
                </View>
              </View>
              <View style={styles.projectStatus}>
                <Text style={styles.projectStatusText}>Active</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Extra content to test scrolling */}
      {Array.from({ length: 8 }, (_, i) => (
        <View key={i} style={styles.testCard}>
          <Text style={styles.testCardTitle}>Projects Content Section {i + 1}</Text>
          <Text style={styles.testCardText}>This is projects content to test scrolling.</Text>
          <Text style={styles.testCardText}>You should be able to scroll down to see this content.</Text>
        </View>
      ))}
    </View>
  );

  const SettingsContent = () => (
    <View style={styles.content}>
      {/* Debug Info */}
      <View style={[styles.debugInfo, { backgroundColor: '#f3f4f6' }]}>
        <Text style={[styles.debugTitle, { color: '#374151' }]}>SETTINGS CONTENT</Text>
        <Text style={[styles.debugText, { color: '#6b7280' }]}>This is the settings view</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile</Text>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitial}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Analyst</Text>
            <Text style={styles.profileRole}>Safety Engineer</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferences</Text>
        <View style={styles.preferencesList}>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="notifications-outline" size={20} color="#6b7280" />
              <Text style={styles.preferenceText}>Push Notifications</Text>
            </View>
            <View style={styles.toggleOn} />
          </View>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="moon-outline" size={20} color="#6b7280" />
              <Text style={styles.preferenceText}>Dark Mode</Text>
            </View>
            <View style={styles.toggleOff} />
          </View>
        </View>
      </View>

      {/* Extra content to test scrolling */}
      {Array.from({ length: 8 }, (_, i) => (
        <View key={i} style={styles.testCard}>
          <Text style={styles.testCardTitle}>Settings Content Section {i + 1}</Text>
          <Text style={styles.testCardText}>This is settings content to test scrolling.</Text>
          <Text style={styles.testCardText}>You should be able to scroll down to see this content.</Text>
        </View>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'HAZID':
        return <HAZIDContent />;
      case 'HAZOP':
        return <HAZOPContent />;
      case 'Projects':
        return <ProjectsContent />;
      case 'Settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  const MainContent = () => (
    <View style={styles.mainContent}>
      <Header />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {isMobileNow ? (
        <View style={styles.mobileContainer}>
          <MainContent />
          <BottomNavigation />
          <MobileMenu />
        </View>
      ) : (
        <View style={styles.desktopContainer}>
          <Sidebar />
          <MainContent />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mobileContainer: {
    flex: 1,
  },
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  content: {
    gap: 24,
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchText: {
    marginLeft: 8,
    color: '#6b7280',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    backgroundColor: '#ef4444',
    borderRadius: 6,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  userInitial: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  userName: {
    color: '#374151',
    fontWeight: '500',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  logoContainer: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  menuText: {
    marginLeft: 12,
    fontWeight: '500',
    color: '#374151',
  },
  menuTextActive: {
    color: '#2563eb',
  },
  proCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 16,
  },
  proTitle: {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
  },
  proSubtitle: {
    color: '#bfdbfe',
    fontSize: 12,
    marginBottom: 12,
  },
  proButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  proButtonText: {
    color: '#2563eb',
    fontWeight: '600',
    textAlign: 'center',
  },
  mobileMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 50,
    display: 'none',
  },
  mobileMenuVisible: {
    display: 'flex',
  },
  mobileMenuContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: 320,
  },
  mobileMenuHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mobileLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mobileMenuItems: {
    padding: 16,
  },
  mobileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  bottomNav: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bottomNavItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  bottomNavText: {
    fontSize: 12,
    marginTop: 4,
    color: '#6b7280',
  },
  bottomNavTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardValues: {
    alignItems: 'flex-end',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cardChange: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  chartHeader: {
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  chartPlaceholder: {
    height: 128,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    color: '#6b7280',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  productSales: {
    fontSize: 14,
    color: '#6b7280',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  testCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  testCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  testCardText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  debugInfo: {
    backgroundColor: '#dcfce7',
    padding: 16,
    borderRadius: 8,
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
  },
  debugText: {
    fontSize: 14,
    color: '#16a34a',
  },
  kpiContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  chartsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  chartItem: {
    flex: 1,
  },
  matrixContainer: {
    gap: 12,
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matrixCell: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  matrixCellText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  matrixScores: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  scoreCell: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  hazopForm: {
    gap: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  formField: {
    flex: 1,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  formInputText: {
    fontSize: 14,
    color: '#1f2937',
  },
  hazardList: {
    gap: 12,
  },
  hazardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  hazardHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hazardInfo: {
    marginRight: 12,
  },
  hazardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  hazardDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  hazardTags: {
    flexDirection: 'row',
    gap: 8,
  },
  hazardTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hazardTagText: {
    fontSize: 12,
    color: '#6b7280',
  },
  hazardStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fef3c7',
    borderRadius: 6,
  },
  hazardStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
  },
  projectStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  projectList: {
    gap: 12,
  },
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  projectHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectInfo: {
    marginRight: 12,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  projectTags: {
    flexDirection: 'row',
    gap: 8,
  },
  projectTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectTagText: {
    fontSize: 12,
    color: '#6b7280',
  },
  projectStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#d1fae5',
    borderRadius: 6,
  },
  projectStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065f46',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#3b82f6',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInitial: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileRole: {
    fontSize: 14,
    color: '#6b7280',
  },
  preferencesList: {
    gap: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginLeft: 12,
  },
  toggleOn: {
    width: 48,
    height: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
  },
  toggleOff: {
    width: 48,
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 12,
  },
  hazopItems: {
    gap: 12,
  },
  hazopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  hazopItemHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hazopItemInfo: {
    marginRight: 12,
  },
  hazopItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  hazopItemDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  hazopItemTags: {
    flexDirection: 'row',
    gap: 8,
  },
  hazopItemTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hazopItemTagText: {
    fontSize: 12,
    color: '#6b7280',
  },
  hazopItemStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fee2e2',
    borderRadius: 6,
  },
  hazopItemStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#991b1b',
  },
});

export default DashboardScreen; 