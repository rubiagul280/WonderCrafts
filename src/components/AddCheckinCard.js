/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import GalleryModal from './GalleryModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const AddCheckinCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        imageFromCamera(setImageURL);
        setModalVisible(false);
      } else {
        console.log('Camera permission denied');
        setModalVisible(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        imageFromGallery(setImageURL);
        setModalVisible(false);
      } else {
        console.log('Storage permission denied');
        setModalVisible(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const imageFromGallery = setImageURL => {
    const options = {
      maxWidth: 1000,
      maxHeight: 1000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setImageURL(source);
      }
    });
  };

  //func to get imgae from camera
  const imageFromCamera = setImageURL => {
    const options = {
      maxWidth: 1000,
      maxHeight: 1000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('CameraPicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setImageURL(source);
      }
    });
  };

  const handleAddCheckIn = async () => {
    if (!title || !imageURL) {
      Alert.alert('Error', 'Please enter a title and upload an image.');
      return;
    }

    try {
      const checkInId = firestore().collection('CheckInItems').doc().id;

      await firestore().collection('CheckInItems').doc(checkInId).set({
        title: title,
        imageURL: imageURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Successfully CheckedIn');
      setOpenModal(false);
      setImageURL('');
      setTitle('');
      const imageRef = storage().ref(`checkin_images/${checkInId}`);
      await imageRef.putFile(imageURL);
    } catch (error) {
      console.error('Error adding check-in:', error);
      Alert.alert('Error', 'An error occurred while adding the check-in.');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/ParisHd.jpg')}
          style={styles.imageBackground}>
          <View style={styles.viewContainer}>
            <View style={styles.txtContainer}>
              <Text style={styles.text}>Hi! </Text>
              <Image
                source={require('../../assets/handwave.png')}
                style={styles.handwave}
              />
              <Text style={styles.text}> James Doe</Text>
            </View>

            <View style={styles.dummyTxtContainer}>
              <Text style={styles.dummyTxt}>
                Lorem ipsus dolor sit amen, something important to say here
              </Text>
            </View>

            <View style={styles.txtContainer}>
              <TouchableOpacity
                style={styles.touchable}
                activeOpacity={0.7}
                onPress={() => setOpenModal(true)}>
                <Text style={styles.checkinTxt}>Add Check In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <Modal
          visible={openModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setOpenModal(false)}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <View style={styles.topView}>
                <Text style={styles.title}>Add Check In</Text>
                <TouchableOpacity
                  onPress={() => {
                    setOpenModal(false);
                    setImageURL('');
                  }}>
                  <Image
                    source={require('../../assets/CROSS.png')}
                    style={[styles.crossImage, {tintColor: 'black'}]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.centerView}>
                <View style={styles.titleView}>
                  <Text style={styles.titleTxt}>Title</Text>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter title"
                    placeholderTextColor={'#D9D9D9'}
                    value={title}
                    onChangeText={txt => setTitle(txt)}
                    caretHidden={title ? false : true}
                  />
                </View>

                <View style={styles.uploadImageView}>
                  <Text style={styles.titleTxt}>Upload Image</Text>
                  <View style={styles.dottedBorder}>
                    {imageURL ? (
                      <Image
                        source={{uri: imageURL}}
                        style={styles.uploadedImage}
                      />
                    ) : (
                      <>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                          <Image
                            source={require('../../assets/Vector.png')}
                            style={styles.vectorImage}
                          />
                        </TouchableOpacity>
                        <Text style={styles.clickTxt}>
                          Click or drag file to this area to upload
                        </Text>
                        <Text style={styles.txt}>
                          Support for a Single or bulk upload. Strictly prohibit
                          from uploading company data or other band files
                        </Text>
                      </>
                    )}
                  </View>
                </View>

                <View style={styles.line} />
                <View style={styles.bottomView}>
                  <TouchableOpacity
                    style={styles.cancelTouch}
                    onPress={() => {
                      setOpenModal(false);
                      setImageURL('');
                    }}>
                    <Text style={styles.cancel}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.addTouch}
                    onPress={handleAddCheckIn}>
                    <Text style={styles.add}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <GalleryModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              requestCameraPermission={requestCameraPermission}
              requestStoragePermission={requestStoragePermission}
            />
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: scale(30),
    marginTop: scale(40),
  },
  imageBackground: {
    width: scale(334),
    height: scale(318),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 20, height: 30},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: scale(30),
    color: 'white',
    fontFamily: 'Roboto Flex',
    fontWeight: '600',
  },
  handwave: {
    width: scale(35),
    height: scale(35),
  },
  txtContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dummyTxtContainer: {
    width: scale(269),
    height: scale(38),
  },
  dummyTxt: {
    fontSize: scale(16),
    color: 'white',
    fontFamily: 'Roboto Flex',
    fontWeight: '400',
    textAlign: 'center',
  },
  touchable: {
    width: scale(112),
    height: scale(32),
    backgroundColor: '#7B5AFF',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: scale(15),
    marginTop: scale(50),
  },
  checkinTxt: {
    fontSize: scale(14),
    color: 'white',
    fontFamily: 'Roboto Flex',
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: scale(334),
    height: scale(521),
    backgroundColor: 'white',
    borderRadius: 20,
    zIndex: 2,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    width: scale(334),
    height: scale(72),
    alignContent: 'center',
    alignItems: 'center',
    padding: scale(18),
  },
  title: {
    fontSize: scale(16),
    color: 'black',
    fontFamily: 'Roboto Flex',
    fontWeight: '500',
    textAlign: 'center',
  },
  crossImage: {
    width: scale(14),
    height: scale(14),
  },
  centerView: {
    width: scale(334),
    height: scale(378),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(40),
  },
  titleView: {
    width: scale(294),
    height: scale(78),
  },
  titleTxt: {
    fontSize: scale(16),
    color: 'black',
    fontFamily: 'Roboto Flex',
    fontWeight: '500',
  },
  textInputStyle: {
    width: scale(294),
    height: scale(44),
    borderWidth: scale(1),
    borderColor: '#D9D9D9',
    borderRadius: scale(5),
    marginTop: scale(15),
    color: 'black',
    paddingLeft: scale(10),
  },
  uploadImageView: {
    width: scale(294),
    height: scale(221),
    marginTop: scale(30),
  },
  dottedBorder: {
    width: scale(294),
    height: scale(187),
    borderStyle: 'dashed',
    borderWidth: scale(2),
    borderColor: '#D9D9D9',
    marginTop: scale(15),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  vectorImage: {
    width: scale(35.11),
    height: scale(35.51),
  },
  clickTxt: {
    fontSize: scale(16),
    color: 'black',
    fontFamily: 'Roboto Flex',
    fontWeight: '400',
    marginTop: scale(25),
    textAlign: 'center',
  },
  txt: {
    fontSize: scale(14),
    color: '#D9D9D9',
    fontFamily: 'Roboto Flex',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: scale(5),
  },
  line: {
    marginTop: scale(25),
    borderColor: '#D9D9D9',
    borderTopWidth: 0.5,
    width: scale(334),
  },
  bottomView: {
    width: scale(294),
    height: scale(72),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
  },
  cancelTouch: {
    width: scale(75),
    height: scale(32),
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: scale(15),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    fontSize: scale(14),
    color: 'black',
    fontFamily: 'Roboto Flex',
    fontWeight: '400',
    textAlign: 'center',
  },
  addTouch: {
    width: scale(59),
    height: scale(32),
    backgroundColor: '#7B5AFF',
    borderRadius: scale(15),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(10),
  },
  add: {
    fontSize: scale(14),
    color: 'white',
    fontFamily: 'Roboto Flex',
    fontWeight: '400',
    textAlign: 'center',
  },
  uploadedImage: {
    width: scale(294),
    height: scale(187),
    //marginTop: scale(15),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default AddCheckinCard;
