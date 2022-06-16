import AsyncStorage from "@react-native-async-storage/async-storage"

const FIRST_TIME_KEY = 'first-loading'

const isFirstLoading = async (): Promise<boolean> => {

    let isFirstTime: string | null = 'false';

    try {
        isFirstTime = await AsyncStorage.getItem(FIRST_TIME_KEY)

        if (!isFirstTime) {
            await AsyncStorage.setItem(FIRST_TIME_KEY, 'true')
            console.log('key is not stored, isFirstTime: ', isFirstTime)
            return true
        }
    } catch {
        throw new Error('Get async storage failed')
    }

    console.log('isFirstTime: ', isFirstTime);

    return JSON.parse(isFirstTime)
}


export {
    FIRST_TIME_KEY,
    isFirstLoading,
}