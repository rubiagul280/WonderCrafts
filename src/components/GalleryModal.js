/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';

export default function GalleryModal({
  modalVisible,
  setModalVisible,
  requestCameraPermission,
  requestStoragePermission,
}) {
  return (
    <>
      {modalVisible === true ? (
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}
          style={styles.overlay}>
          <View style={styles.smallmodal}>
            <View style={styles.smallmodalContent}>
              <View style={styles.takePhotoGraphView}>
                <Text style={styles.takePhotoGraphTxt}>TAKE PHOTOGRAPH</Text>
              </View>

              <View style={styles.ChoosePicView}>
                <Text style={styles.chooseTxt}>
                  TAKE A NEW PHOTOGRAPH OR SELECT ONE FROM
                </Text>

                <Text style={styles.chooseTxt1}>
                  YOUR PHOTO LIBRARY/GALLERY.
                </Text>
              </View>

              <View style={styles.galleryCameraView}>
                <TouchableOpacity onPress={() => requestStoragePermission()}>
                  <Text style={styles.galleryTxt}>GALLERY</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => requestCameraPermission()}>
                  <Text style={styles.galleryTxt}>CAMERA</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  smallmodal: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  smallmodalContent: {
    opacity: scale(0.94),
    width: '100%',
    height: scale(198),
    overflow: 'hidden',
    backgroundColor: 'black',
    top: scale(35),
  },
  takePhotoGraphView: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
  },

  takePhotoGraphTxt: {
    fontFamily: 'Lato-Regular',
    fontSize: scale(11),
    letterSpacing: scale(1),
    color: 'white',
  },
  ChoosePicView: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(45),
  },

  chooseTxt: {
    fontFamily: 'Lato-Regular',
    fontSize: scale(8),
    color: 'white',
    letterSpacing: scale(1.5),
  },
  chooseTxt1: {
    fontFamily: 'Lato-Regular',
    fontSize: scale(8),
    color: 'white',
    letterSpacing: scale(1.5),
    marginTop: scale(8),
  },
  galleryCameraView: {
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(45),
    zIndex: 2,
  },

  galleryTxt: {
    fontFamily: 'Lato-Regular',
    fontSize: scale(12),
    color: 'white',
    letterSpacing: scale(1.5),
    zIndex: 3,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
