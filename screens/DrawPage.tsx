import React, { FC, useState, useEffect } from 'react'
import { View, Text, Dimensions, Pressable, ToastAndroid } from 'react-native'
import DrawCanvas from '../components/functionalComponents/DrawCanvas'
import HeaderCanvas from '../components/functionalComponents/HeaderCanvas'
import FooterCanvas from '../components/functionalComponents/FooterCanvas'
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { getExtensionFromUrl } from '../utils/functionDrawTable'
import * as FileSystem from 'expo-file-system';
import { Asset, useAssets } from 'expo-asset';

interface Result {
    url: string | undefined,
    extension: string | undefined
}

interface State {
    cameraPermission: boolean | null,
    galleryPermission: boolean | null,
    cameraIsActive: boolean,
    galleryIsActive: boolean,
    type: CameraType,
    resultImgPicker: Result | null
    bgImage64: string | undefined
}

const initialState: State = {
    cameraPermission: null,
    galleryPermission: null,
    cameraIsActive: false,
    galleryIsActive: false,
    type: CameraType.back,
    resultImgPicker: null,
    bgImage64: undefined
}


const DrawPage: FC = () => {

    let camera: Camera | null;
    const [state, setState] = useState<State>(initialState);

    const [assets, error] = useAssets(require('../assets/background_default.png'));



    const handleDefaultImage = async (): Promise<void> => {

        let bgImage64tmp = await FileSystem.readAsStringAsync(assets[0].localUri, { encoding: 'base64' })
        bgImage64tmp = `data:image/jpeg;base64,${bgImage64tmp}`
        setState({
            ...state,
            bgImage64: bgImage64tmp
        })
    }

    useEffect(() => {
        if (assets !== undefined) {
            handleDefaultImage();
        }
    }, [assets])

    const handlePhotoComponent = async (): Promise<void> => {

        const { status } = await Camera.requestCameraPermissionsAsync();
        let cameraPermissionTmp = false;
        if (status === "granted") {
            cameraPermissionTmp = true;
        }
        setState({
            ...state,
            cameraIsActive: cameraPermissionTmp,
            cameraPermission: cameraPermissionTmp
        })

    }
    const handleGalleryComponent = async (): Promise<void> => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let galleryPermissionTmp = false;
        let resultTmp: Result | null = null
        if (status === "granted") {
            let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 0.5,
                base64: true
            });
            if (!result.cancelled) {
                resultTmp = {
                    url: result.base64,
                    extension: getExtensionFromUrl(result.uri)
                }
            }
        }

        setState({
            ...state,
            galleryPermission: galleryPermissionTmp,
            galleryIsActive: galleryPermissionTmp,
            resultImgPicker: resultTmp
        })

    }

    const handlePictureTaked = async (): Promise<void> => {
        const options: object = {
            quality: 0.5,
            base64: true,
        }
        const photo: CameraCapturedPicture = await camera?.takePictureAsync(options);

        console.log('photo', photo)
        setState({
            ...state,
            cameraIsActive: !state.cameraIsActive,
            resultImgPicker: {
                url: photo.base64,
                extension: getExtensionFromUrl(photo.uri)
            }
        })
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Camera View Container */}
            {state.cameraIsActive &&

                <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
                    <View>
                        <View>
                            <Pressable
                                onPress={() => {
                                    setState({
                                        ...state,
                                        cameraIsActive: false
                                    })
                                }}>
                                <Text>Chiudi</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable
                                onPress={handlePictureTaked}>
                                <Text>scatta foto</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable
                                onPress={() => {
                                    setState({
                                        ...state,
                                        type: CameraType.back ? CameraType.front : CameraType.back
                                    })
                                }}>
                                <Text>flip</Text>
                            </Pressable>
                        </View>
                    </View>
                    <Camera
                        ref={(ref) => {
                            camera = ref
                        }}
                        style={{ width: '100%', height: '100%' }} type={state.type}>
                    </Camera>
                </View>
            }
            {
                state.galleryIsActive && state.resultImgPicker &&
                <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                </View>
            }

            <HeaderCanvas
                callback={{
                    handlePhotoComponent,
                    handleGalleryComponent
                }}
                hide={state.cameraIsActive || state.galleryIsActive}
            />
            {state.bgImage64 !== undefined &&
                <DrawCanvas
                    imgChoosen={state.resultImgPicker}
                    defaultbg={state.bgImage64}
                />
            }
            <FooterCanvas
                hide={state.cameraIsActive || state.galleryIsActive} />

        </View>
    )
}
export default DrawPage