import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Navigator, Stack } from "expo-router";
import BigCard from "../components/BigCard";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import {Dimensions} from 'react-native';
import Animated, { Easing, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const games = [
    'Quiplash',
    'Pictionary',
    'Word Scramble'
]

const App = () => {
    const opacityTitle = useSharedValue(0);
    const translateY = useSharedValue(-100);
    const opacity = useSharedValue('0%');
    let style = stylePC;
    if (windowWidth < 600) {
        style = styleMob;
    }
    useEffect(() => {
        opacityTitle.value = withTiming(1, {
            duration: 1000,
            easing: Easing.bezierFn(0.5,0,0,1)
        });
        translateY.value = withDelay(500, withTiming(0, {
            duration: 800,
            easing: Easing.bezierFn(0.5,0,0,1)
        }));
        opacity.value = withDelay(500, withTiming('100%', {
            duration: 800,
            easing: Easing.bezierFn(1,0,0,1)
        }))
    }, []);
    // alert(`${windowWidth} ${windowHeight}`);
    return (
        <View style={style.container}>
        <ImageBackground style={{width: '100%', height: '100%'}} resizeMode='cover' source={require('../assets/images/bg.png')}>
            <NavigationContainer independent={true} documentTitle={{formatter: ()=>'Evening Games'}}/>
            <Stack.Screen options={
                {
                    headerShown: false,
                }
            }/>
            <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Animated.Text selectable={false} style={[style.gameName, {opacity: opacityTitle}]}>
                    EVENING GAMES
                </Animated.Text>
                <View style={style.gameCards}>
                {games.map((item, key) => {
                    return (
                        <BigCard name={item} index={key}/>
                    )
                })
                }
                </View>
            </View>
        </ImageBackground>
        </View>
    )
}

const stylePC = StyleSheet.create({
    selectGame: {
        fontFamily: 'MontserratBold',
        fontSize: 30,
        color: 'white'
    },
    gameName: {
        fontFamily: 'MontserratBlack',
        fontSize: 100,
        // width: 20,
        maxHeight: 120,
        overflow: 'hidden',
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 15,
        // padding: 20
    },
    container: {
        backgroundColor: 'rgb(0,0,0)',
        width: '100%',
        height: '100%',
    },
    font: {
        fontFamily: 'MontserratBold',
    },
    gameCards: {
        flexDirection: 'row',
        columnGap: 30,
        marginTop: 50,
    }
});

const styleMob = StyleSheet.create({
    selectGame: {
        fontFamily: 'Montserrat ',
        fontSize: 25,
        color: 'white'
    },
    gameName: {
        fontFamily: 'MontserratBlack',
        fontSize: 30,
        margin: 10,
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 15
    },
    container: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    font: {
        fontFamily: 'MontserratBold',
    },
    gameCards: {
        flexDirection: 'column',
        rowGap: 30,
        marginTop: 30,
    }
})

export default App;