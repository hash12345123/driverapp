import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  Alert,
  Modal
} from 'react-native';

interface WelcomeScreenProps {
  onLogout: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogout }) => {
  const [isIndividual, setIsIndividual] = useState(true);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (email && password) {
      setShowAuthModal(false);
      Alert.alert('Success', `You have successfully ${isLogin ? 'logged in' : 'signed up'}`);
    } else {
      Alert.alert('Error', 'Please enter both email and password');
    }
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes, Logout',
          onPress: () => {
            setEmail('');
            setPassword('');
            onLogout();
            Alert.alert('Logged Out', 'You have been successfully logged out');
          }
        }
      ]
    );
  };

  const renderAuthModal = () => {
    return (
      <Modal
        visible={showAuthModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Login / Signup</Text>
            
            <View style={styles.toggleContainer}>
              <TouchableOpacity 
                style={[styles.toggleButton, isLogin && styles.activeToggle]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toggleButton, !isLogin && styles.activeToggle]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>Shipper Signup</Text>
              </TouchableOpacity>
            </View>

            {!isLogin && (
              <Text style={styles.sectionTitle}>Shipper Signup</Text>
            )}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setShowAuthModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.authButton} 
                onPress={handleAuth}
              >
                <Text style={styles.authButtonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.appTitle}>LoadKaro</Text>
        <TouchableOpacity onPress={handleLogoutPress}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Book Truck & Partial Load Service</Text>
        <Text style={styles.subheader}>Pakistan's best online booking platform with live pricing</Text>
        
        <Text style={styles.instruction}>Please provide the addresses for pickup and delivery.</Text>
        
        <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={[styles.radioButton, isIndividual && styles.radioButtonActive]} 
            onPress={() => setIsIndividual(true)}
          >
            <View style={[styles.radioCircle, isIndividual && styles.radioCircleActive]}>
              {isIndividual && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioText}>Individual</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.radioButton, !isIndividual && styles.radioButtonActive]} 
            onPress={() => setIsIndividual(false)}
          >
            <View style={[styles.radioCircle, !isIndividual && styles.radioCircleActive]}>
              {!isIndividual && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioText}>Transporter</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Pickup Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pickup address"
            value={pickupAddress}
            onChangeText={setPickupAddress}
            multiline
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Drop Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter drop address"
            value={dropAddress}
            onChangeText={setDropAddress}
            multiline
          />
        </View>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Place Order</Text>
        </TouchableOpacity>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Full load (FLT)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Tracking</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why choose us?</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Why choose us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>How it works</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {renderAuthModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2c3e50',
    paddingTop: 40, // Extra padding for status bar
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
    color: '#444',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonActive: {
    // You can add styles for active state if needed
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioCircleActive: {
    borderColor: '#007bff',
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  orderButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toggleButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f9fa',
  },
  activeToggle: {
    backgroundColor: '#007bff',
  },
  toggleText: {
    textAlign: 'center',
    color: '#333',
  },
  activeToggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#555',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  authButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default WelcomeScreen; 