import { Image, ImageBackground, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import Animated, { Easing, useSharedValue, withSequence, withSpring, withTiming } from "react-native-reanimated";

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

const first = ['smog','mace','shut','feed','rind','geek','rare','idly','font','yelp'];
const second = ['cargo','untie','poker','alive','guide','drone','payee','nappy','flyer','bleak'];
const third = ['patchy','eskimo','bounce','citric','willed','upwind','hacked','stench','dipper','gently'];

const Answer = () => {
    const [gameStart, setGameStart] = useState(false);
    const [level, setLevel] = useState(-1);
    const [word, setWord] = useState('');
    const [gameRunning, setGameRunning] = useState(false);
    const translateY = useSharedValue(-100);
    const translateYrule = useSharedValue(200);
    const scaleStart = useSharedValue(0.2);
    const scaleFirst = useSharedValue(1);
    const scaleSecond = useSharedValue(1);
    const scaleThird = useSharedValue(1);
    const rotate = useSharedValue('0deg');
    const [loading, setLoading] = useState(true);
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

    const readySteady = (level) => {
        for (let i = 5; i > 0; i--) {
            setTimeout(() => {
                setWord(`Starting in ${6-i}`);
            }, i*1000);
        };
        setTimeout(() => {
            play(level);
        }, 6000);
    };

    const play = (level) => {
        if (level == 1) {
            for (let i = 0; i < 11; i++) {
                setTimeout(() => {
                    if (gameRunning) {
                        if(i < 10) setWord(first[i].shuffle());
                        else if (i == 10) setWord('');
                    } else if (!gameRunning) {
                        setLevel(-1);
                        setWord('...')
                    }
                }, i*1500);
            }
        } else if (level == 2) {
            for (let i = 0; i < 11; i++) {
                setTimeout(() => {
                    if (gameRunning) {
                        if(i < 10) setWord(second[i].shuffle());
                        else if (i == 10) setWord('');
                    } else if (!gameRunning) {
                        setLevel(-1);
                        setWord('...')
                    }
                }, i*1500);
            }
        } else if (level == 3) {
            for (let i = 0; i < 11; i++) {
                setTimeout(() => {
                    if (gameRunning) {
                        if(i < 10) setWord(third[i].shuffle());
                        else if (i == 10) setWord('');
                    } else if (!gameRunning) {
                        setLevel(-1);
                        setWord('...')
                    }
                }, i*1500);
            }
        }
    };

    const gameplay = () => {
    return <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems:'center',
            columnGap: 20
        }}>
            <AnimatedTouchableOpacity
            style={{
                transform: [{scale: scaleFirst}]
            }}
            onPress={() => {
                    scaleFirst.value = withSequence(withTiming(0.85, {
                    duration: 150,
                    easing: Easing.bezierFn(0.5,0,0,1)
                }),
                withTiming(1, {
                    duration: 100,
                    easing: Easing.bezierFn(0.5,0,0,1)
                }, () => {
                    setLevel(1);
                })
                );
                rotate.value = withSequence(withTiming('-30deg', {
                    duration: 200,
                    easing: Easing.bezierFn(0.5,0,0,1)
                }),
                withSpring(0, {stiffness: 150, mass: 1.5})
                );
                setGameRunning(true);
            }}>
                <Text style={style.level}>1 level</Text>
            </AnimatedTouchableOpacity>
            <AnimatedTouchableOpacity
            style={{
                transform: [{scale: scaleSecond}]
            }}
            onPress={() => {
                    scaleSecond.value = withSequence(withTiming(0.85, {
                    duration: 150,
                    easing: Easing.bezierFn(0.5,0,0,1)
                }),
                withTiming(1, {
                    duration: 100,
                    easing: Easing.bezierFn(0.5,0,0,1)
                }, () => {
                    setLevel(2);
                })
                );
                rotate.value = withSequence(withTiming('-45deg', {
                    duration: 250,
                    easing: Easing.bezierFn(0.5,0,0,1)
                }),
                withSpring(0, {stiffness: 150, mass: 1.5})
                );
                setGameRunning(true);
            }}>
                <Text style={style.level}>2 level</Text>
            </AnimatedTouchableOpacity>
            <AnimatedTouchableOpacity
            style={{
                transform: [{scale: scaleThird}]
            }}
            onPress={() => {
                    scaleThird.value = withSequence(withTiming(0.85, {
                    duration: 150,
                    easing: Easing.bezierFn(0.5,0,0,1)
                }),
                withTiming(1, {
                    duration: 100,
                    easing: Easing.bezierFn(0.5,0,0,1)
                }, () => {
                    setLevel(3);
                })
                );
                rotate.value = withSequence(withTiming('-60deg', {
                    duration: 300,
                    easing: Easing.bezierFn(0.5,0,0,1)
                }),
                withSpring(0, {stiffness: 150, mass: 1.5})
                );
                setGameRunning(true);
            }}>
                <Text style={style.level}>3 level</Text>
            </AnimatedTouchableOpacity>
        </View>
    };

    useEffect(() => {
        if (level >= 0) {
            readySteady(level);
        };
        // if (level >= 0) {
        //     for (let i = 5; i > 0; i--) {
        //         setTimeout(() => {
        //             setWord(`${6-i}`);
        //         }, i*1000);
        //     }
        //     setTimeout(() => {
        //         if (level == 1) {
        //             for (let i = 0; i < 11; i++) {
        //                 setTimeout(() => {
        //                     setWord(from3to4[i].shuffle());
        //                 }, 1500*i);
        //             }
        //         } else if (level == 2) {
        //             for (let i = 0; i < 11; i++) {
        //                 setTimeout(() => {
        //                     setWord(from4to5[i].shuffle());
        //                 }, 2000*i);
        //             }
        //         } else if (level == 3) {
        //             for (let i = 0; i < 11; i++) {
        //                 setTimeout(() => {
        //                     setWord(from5to6[i].shuffle());
        //                 }, 3000*i);
        //             }
        //         }
        //     }, 6000);
        // };
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
    }, [level]);


    return (
        <View style={style.container}>
        <ImageBackground style={{width: '100%', height: '100%'}} resizeMode='cover' source={require('../assets/images/scramblebg.png')}>
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
                    WORD SCRAMBLE
                </Animated.Text>
                { gameStart ? gameplay() : null}
                { gameStart ? <Animated.View style={{
                    backgroundColor: 'white',
                    minHeight: 140,
                    minWidth: 350,
                    maxWidth: 850,
                    margin: 'auto',
                    borderRadius: 50,
                    padding: 30,
                    transform: [{rotate}]
                }}>
                    <Text style={{
                        fontFamily: 'MontserratMedium',
                        fontSize: 60,
                        textAlign: 'center'
                    }}>{word}</Text>
                </Animated.View>
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
                            setGameStart(true);
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
                            Game has 3 levels{'\n'}
                            Difficulty increases by increasing the level{'\n'}
                            Scrambled words quickly show up on the screen and you have to guess them{'\n'}
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
    level: {
        fontFamily: 'MontserratMedium',
        backgroundColor: 'white',
        fontSize: 20,
        borderRadius: 20,
        padding: 15
    }
});

export default Answer;