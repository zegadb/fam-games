import { Image, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Dimensions} from 'react-native';
import Animated, { Easing, FadeIn, FadeInUp, useSharedValue, withDelay, withRepeat, withSequence, withTiming, ZoomIn } from "react-native-reanimated";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Drawing = () => {
    const [gameStart, setGameStart] = useState(false);
    const [name, setName] = useState('');
    const [words, setWords] = useState([]);
    const scale = useSharedValue(0);
    const scaleLoad = useSharedValue(0);
    const rotate = useSharedValue('360deg');
    const [loaded, setLoaded] = useState(false);
    const translateY = useSharedValue(-100);
    const translateYrule = useSharedValue(200);
    const scaleStart = useSharedValue(0.2);
    const translateYinput = useSharedValue(250);
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
    let style = stylePC;
    if (windowWidth < 600) {
        style = styleMob;
    };
    const fillList = async (startIndex) => {
        let fullList;
        let cleanList = [];
        const result = await AsyncStorage.getItem('pictionary');
        fullList = JSON.parse(result);
        for (let i = 0; i < 5; i++) {
            cleanList.push(fullList[Math.floor(Math.random() * 200)]);
        }
        setWords(cleanList);
        console.log(cleanList);
    };
    const submitStart = () => {
        setGameStart(true);
        fillList();
    };
    const showList = () => {
        if (!loaded) {
            setTimeout(() => {
                setLoaded(true);
            }, 1500);
            return <AnimatedImage style={{width: 100, height: 100, margin: 'auto', transform: [{rotate}, {scale: scaleLoad}]}} source={require('../assets/images/loading.png')}/>;
        }
        if (loaded) {
        return (
            <Animated.View
                style={{
                    backgroundColor: 'white',
                    minHeight: 100,
                    minWidth: 200,
                    maxWidth: 650,
                    margin: 'auto',
                    borderRadius: 30,
                    padding: 30,
                    transform: [{scale}],
                    shadowOpacity: 1,
                    shadowRadius: 50,
                    shadowColor: 'black'
                }}>
                    {words.map((item) => {
                        return (
                            <Animated.Text
                                style={{
                                    fontFamily: 'MontserratMedium',
                                    fontSize: 30,
                                }}
                            > 
                            {item}
                            </Animated.Text>                            
                        )
                    })}
                </Animated.View>
        )}
    }
    useEffect(() => {
        if (gameStart == true) {
            rotate.value = withRepeat(withTiming('0deg', {duration: 1000, easing: Easing.bezier(0.5,0,0,0.5)}), -1);
            scale.value = withDelay(1500, withTiming(1, {
                duration: 1000,
                easing: Easing.bezierFn(0.5,0,0,1),
            }));
            scaleLoad.value = withRepeat(withTiming(1, {
                duration: 1000,
                easing: Easing.bezierFn(0.5,0,0,1)
            }), 2, true);
        };
        scaleStart.value = withTiming(1, {
            duration: 1000,
            easing: Easing.bezierFn(1,0,0,1)
        });
        translateY.value = withTiming(0, {
            duration: 1000,
            easing: Easing.bezierFn(1,0,0,1)
        });
        translateYrule.value = withTiming(0, {
            duration: 1200,
            easing: Easing.bezierFn(1,0,0,1)
        });
    }, [gameStart]);
    return (
        <View style={style.container}>
            <ImageBackground style={{width: '100%', height: '100%'}} resizeMode='cover' source={require('../assets/images/crocobg.png')}>
            <Stack.Screen options={
                {
                    headerShown: false,
                }
            }/>
            <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
            }}>
                <Animated.Text selectable={false} style={[style.gameTitle, {transform: [{translateY}]}]}>
                    PICTIONARY
                </Animated.Text>
                { gameStart ? showList()
                :
                <View style={{
                    margin: 'auto',
                    alignItems: 'center',
                    height: '85%'
                }}>
                    <AnimatedTouchableOpacity
                        onPress={() => {
                            scaleStart.value = withSequence(withTiming(0.85, {
                            duration: 200,
                            easing: Easing.bezierFn(0.5,0,0,1)
                        }),
                        withTiming(1, {
                            duration: 150,
                            easing: Easing.bezierFn(0.5,0,0,1)
                        }, () => {
                            submitStart();
                        })
                        );}}
                        style={{
                        margin: 'auto',
                        alignItems: 'center',
                        transform: [{scale: scaleStart}]
                    }}>
                        <Image style={{
                            width: 250,
                            height: 250,
                        }} source={require('../assets/images/start.png')} />
                    </AnimatedTouchableOpacity>
                    <Animated.View style={{transform: [{translateY: translateYrule}], backgroundColor: 'white', padding: 10, borderRadius: 20, width: 340, flexDirection: 'row'}}>
                        <Animated.Text style={{fontFamily: 'MontserratMedium', width: 250}} >
                            You will be given 5 random words{'\n'}
                            Each of you has to draw these words{'\n'}
                            Don't forget to remember them!{'\n'}
                            Then each of you show your drawings to other players and guess each ones words{'\n'}
                        </Animated.Text>
                        <Image style={{width: 70, height: 70, margin: 'auto'}} source={require('../assets/images/question.png')} />
                    </Animated.View>
                </View>
                }
            </View>
            </ImageBackground>
        </View>
    )
}

const stylePC = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
    },
    font: {
        fontFamily: 'MontserratBold',
    },
    gameTitle: {
        fontFamily: 'MontserratBlack',
        fontSize: 50,
        margin: 10,
        color: 'white'
    }
});

const styleMob = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
    },
    font: {
        fontFamily: 'MontserratBold',
    },
    gameTitle: {
        fontFamily: 'MontserratBlack',
        fontSize: 36,
        margin: 10,
        textAlign: 'center',
        color: 'white'
    }
});

export default Drawing;