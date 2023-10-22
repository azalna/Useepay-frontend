import React  from 'react';
import {useSate} from 'react'
import { View, Text, StyleSheet, TextInput, Image ,TouchableOpacity,SafeAreaView, onPress,onChangeText,text,onChangeNumber,number } from 'react-native';

const ProfileScreen = () => {
  // Replace with actual user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    mobile:'+91 9919295479'
  };


  return (
    <View style={styles.container}>

      <View style={styles.toppart}>
    <Text style={styles.topparttext}>Back</Text>
    <TouchableOpacity /*this work like onClick react js  onPress:{function done the changing of profile and change screen to another screen}*/>
    <Text style={styles.topparttext}>Done</Text>
    </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>

         <Image style={styles.image}  source={{
          uri: 'https://images.pexels.com/photos/1104007/pexels-photo-1104007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }} 
      /> 
    <TouchableOpacity  /*this work like onClick react js  onPress:{function change the image}*/ >  
    <Text style={styles.imagetext}>Edit Profile Image </Text> 
    </TouchableOpacity>
    
      <SafeAreaView style={styles.profileinfo}>
      <Text style={styles.labeltext}>Name</Text> 
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={user.name}
        // underlineColorAndroid="transparent"
      />
      <Text style={styles.labeltext}>Email</Text> 
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={user.email}
      />
      <Text style={styles.labeltext}>Mobile Number</Text> 
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={user.mobile}
      />
    </SafeAreaView>
      <View style={styles.buttonscontainer}  >
      <TouchableOpacity style={styles.buttons}  /*this work like onClick react js  onPress:{function change the image}*/  onPress={onPress}>  
    <Text style={styles.buttonstext}>Deactivate Account </Text> 
    </TouchableOpacity>
      <TouchableOpacity style={styles.buttons}  /*this work like onClick react js  onPress:{function change the image}*/  onPress={onPress}>  
    <Text style={styles.buttonstext}>Delete Account </Text> 
    </TouchableOpacity>
     </View>
       
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'absolute',
    // backgroundColor: '#f0f0f0',
  },
  toppart: {
    paddingTop:40,
    paddingBottom:15,
    flex: .2,
    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor: '#000',
  },
  topparttext: {
   fontSize:20,
   fontWeight:500,
   color:'#fff',
  },

  // content start here 
  contentContainer: {
    flex: 4,
    justifyItems:'center',
  },
  image: {
    resizeMode: 'cover',
    borderRadius:90,
    width: 130,
    height: 130,
    marginHorizontal:120,
    marginTop:30,
  },
  imagetext: {
    fontSize:20,
    fontWeight:500,
    color:'#0081F1',
    textAlign:'center',
    marginTop:10,
  },

// container of profile information 
  profileinfo: {
    flex:.7,
    // gap:10,
    // paddingRight:100,
    // flexWrap:'wrap',
    // flexDirection:'row',
    marginTop:20,
    marginBottom:40,
    paddingHorizontal:50,
    // backgroundColor:'blue',
  },
    input: {
       textAlign:'left',
      border:'none',
    height: 35,
    width:250,
    fontSize:20,
    marginTop: 0,
    borderBottomWidth:1,
    // borderRadius:10,
    padding: 5,
    outline:'none',
    color:'',
  },
    labeltext: {
    fontSize:20,
    fontWeight:500,
    marginTop:20,
    // paddingHorizontal:0,
    color:'#888B8D',
  },

  // buttons  container
   buttonscontainer: {
     flex:1,
  
  },
   buttons: {
    marginHorizontal:80,
    marginTop:20,
    width:200,
    fontSize:20,
    paddingHorizontal:12,
    paddingVertical:8,
    borderWidth:1,
    backgroundColor:'#000',
    borderRadius:10,
  },
   buttonstext: {
     textAlign:'center',
    fontSize:18,
    color:'#fff',
  },
});

export default ProfileScreen;
