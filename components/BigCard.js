import { useRouter } from "expo-router";
import { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native"
import {Dimensions} from 'react-native';
import Animated, { Easing, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BigCard = props => {
    const translateY = useSharedValue(-100);
    const opacity = useSharedValue('0%');
    const scale = useSharedValue(1);
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
    let style = stylePC;
    if (windowWidth < 600) {
        style = styleMob;
    }
    const router = useRouter();
    const [icon, setIcon] = useState(require('../assets/images/loading.png'));
    const [link, setLink] = useState('');
    useEffect(() => {
        if (props.name.toLowerCase().includes('quiplash')) {
            setIcon(require('../assets/images/quiplash.png'));
            setLink('quiplash');
        } else if (props.name.toLowerCase().includes('pictionary')) {
            setIcon(require('../assets/images/pictionary.png'));
            setLink('pictionary');
        } else if (props.name.toLowerCase().includes('scramble')) {
            setIcon(require('../assets/images/scramble.png'));
            setLink('scramble');
        }
        opacity.value = withDelay(600+(props.index*200), withTiming('100%', {
            duration: 800,
            easing: Easing.bezierFn(1,0,0,1)
        }))
        translateY.value = withDelay(600+(props.index*200), withSpring(0, {
            mass: 2,
            damping: 8,
            stiffness: 100,
        }))

    }, []);
    const handlePress = () => {
        scale.value = withSequence(withTiming(0.85, {
            duration: 250,
            easing: Easing.bezierFn(0.5,0,0,1)
        }),
        withTiming(1, {
            duration: 150,
            easing: Easing.bezierFn(0.5,0,0,1)
        }, () => {
            router.push(link);
        })
        );
    };
    return (
        <AnimatedTouchableOpacity style={{opacity, transform: [{translateY}, {scale}]}} onPress={() => {handlePress()}}>
            <View style={style.card}>
                <Text style={style.gameTitle}>{props.name}</Text>
                    <Image source={icon} style={style.gameIcon}/>
            </View>
        </AnimatedTouchableOpacity>
    )
}

const stylePC = StyleSheet.create({
    card: {
        // borderWidth: 3,
        // borderColor: 'rgb(150,150,150)',
        // borderColor: 'black',
        borderRadius: 30,
        width: 220,
        height: 220,
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 60,
    },
    gameIcon: {
        width: 100,
        height: 100,
        margin: 'auto'
    },
    gameTitle: {
        fontFamily: 'MontserratMedium',
        fontSize: 20,
        textAlign: 'center',
    }
})
const styleMob = StyleSheet.create({
    card: {
        // borderWidth: 3,
        // borderColor: 'black',
        borderRadius: 30,
        width: 170,
        height: 180,
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 60,
        // shadowOffset: 
    },
    gameIcon: {
        width: 80,
        height: 80,
        margin: 'auto'
    },
    gameTitle: {
        fontFamily: 'MontserratMedium',
        fontSize: 15,
        textAlign: 'center',
    }
})

export default BigCard;