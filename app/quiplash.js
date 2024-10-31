import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { Easing, FadeIn, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";

const Answer = () => {
    const [question, setQuestion] = useState(1);
    const [gameStart, setGameStart] = useState(false);
    const [result, setResult] = useState();
    const scaleRight = useSharedValue(1);
    const scaleLeft = useSharedValue(1);
    const scaleStart = useSharedValue(0.2);
    const translateY = useSharedValue(-100);
    const translateYrule = useSharedValue(200);
    const translateX = useSharedValue(0);
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
    const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
    // let arg = 0;
    const getQuestion = (argument) => {
        setQuestion(question+argument);
    };
    useEffect(() => {
        AsyncStorage.getItem(`q${question}`).then((result) => {setResult(result)});
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
    }, [question]);
    return (
        <View style={style.container}>
        <AnimatedImageBackground style={{width: '100%', height: '100%'}} resizeMode='cover' source={require('../assets/images/qabg.png')}>
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
                <Animated.Text selectable={false} style={{
                    fontFamily: 'MontserratBlack',
                    fontSize: 50,
                    margin: 10,
                    color: 'white',
                    transform: [{translateY}]
                }}>
                    QUIPLASH
                </Animated.Text>
                { gameStart ? <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems:'center'
                }}>
                    <AnimatedTouchableOpacity
                    style={{transform: [{scale: scaleLeft}]}}
                    onPress={() => {
                            scaleLeft.value = withSequence(withTiming(0.85, {
                            duration: 150,
                            easing: Easing.bezierFn(0.5,0,0,1)
                        }),
                        withTiming(1, {
                            duration: 100,
                            easing: Easing.bezierFn(0.5,0,0,1)
                        }, () => {
                            if (question > 1) {
                            getQuestion(-1);
                        } else if (question == 1) {
                            setGameStart(false);
                        }
                        })
                        );
                        translateX.value = withSequence(withTiming(-150, {
                            duration: 200,
                            easing: Easing.bezierFn(0.5,0,0,1)
                        }),
                        withSpring(0, {stiffness: 150, mass: 1.5})
                        );
                    }}>
                        <Image style={{
                            width: 80,
                            height: 80,
                        }} source={require('../assets/images/arrow-left.png')}/>
                    </AnimatedTouchableOpacity>
                    <Animated.Text
                        selectable={false} 
                        style={{
                        backgroundColor: 'white',
                        width: 100,
                        height: 70,
                        textAlign: 'center',
                        lineHeight: 70,
                        fontSize: 40,
                        fontFamily: 'MontserratMedium',
                        borderRadius: 30,
                    }}>
                        {question}
                    </Animated.Text>
                    <AnimatedTouchableOpacity
                        style={{
                            transform: [{scale: scaleRight}]
                        }}
                        onPress={() => {
                            scaleRight.value = withSequence(withTiming(0.85, {
                            duration: 150,
                            easing: Easing.bezierFn(0.5,0,0,1)
                        }),
                        withTiming(1, {
                            duration: 100,
                            easing: Easing.bezierFn(0.5,0,0,1)
                        }, () => {
                            if (question < 30) {
                            getQuestion(1)
                            // setQuestion(question+1);
                            // getQuestion();
                        }
                        })
                        );
                        translateX.value = withSequence(withTiming(150, {
                            duration: 200,
                            easing: Easing.bezierFn(0.5,0,0,1)
                        }),
                        withSpring(0, {stiffness: 150, mass: 1.5})
                        );
                    }}>
                        <Image style={{
                            width: 80,
                            height: 80,
                        }} source={require('../assets/images/arrow-right.png')}/>
                    </AnimatedTouchableOpacity>
                </View> : null}
                { gameStart ? <Animated.View style={{
                    backgroundColor: 'white',
                    minHeight: 100,
                    minWidth: 200,
                    maxWidth: 650,
                    margin: 'auto',
                    borderRadius: 30,
                    padding: 30,
                    transform: [{translateX}]
                }}>
                    <Text style={{
                        fontFamily: 'MontserratMedium',
                        fontSize: 30,
                        
                    }}>{result}</Text>
                </Animated.View>
                :
                <Animated.View style={{height: '85%'}}>
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
                                setGameStart(true);
                                getQuestion(0);
                            })
                            );
                        }}
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
                            Game has 30 rounds{'\n'}
                            Each of you has to answer a given question or fill a sentence{'\n'}
                            You have to come up with a funniest answer{'\n'}
                            You decide: play for points or just laugh at each other's answers and have fun{'\n'}
                        </Animated.Text>
                        <Image style={{width: 70, height: 70, margin: 'auto'}} source={require('../assets/images/question.png')} />
                    </Animated.View>
                </Animated.View>
                }
            </View>
            </AnimatedImageBackground>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        // fontFamily: 'Montserrat'
    },
    font: {
        fontFamily: 'MontserratBold',
    },

});

export default Answer;