import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";


SplashScreen.preventAutoHideAsync();

const loadQA = () => {
    AsyncStorage.multiSet([
        ['q1', 'What’s the worst thing to say at a job interview?'],
        ['q2', 'A bad slogan for a toothpaste brand would be...'],
        ['q3', 'You wake up one day to discover you have superpowers, but only on Thursdays.'],
        ['q4', 'If animals could talk, which one would be the rudest?'],
        ['q5', 'If aliens landed, their first words to us would be...'],
        ['q6', 'Imagine you just invented the worst product ever. What is it?'],
        ['q7', 'What should never be the theme for a children’s birthday party?'],
        ['q8', 'The least effective workout routine involves...'],
        ['q9', 'Your phone rings, and it’s your future self with a warning. What do they say?'],
        ['q10', 'What’s the first thing you’d do if you could be invisible for a day?'],
        ['q11', 'The best excuse for not doing your homework is...'],
        ['q12', 'You accidentally start a rumor about yourself. What is it?'],
        ['q13', 'The title of the worst movie ever made is...'],
        ['q14', 'A terrible name for a superhero is...'],
        ['q15', 'A movie about your life has just been made. What’s its title?'],
        ['q16', 'What’s the strangest thing you could yell at a stranger in a grocery store?'],
        ['q17', 'A food item that should never be combined with pizza is...'],
        ['q18', 'Your car’s GPS starts giving life advice instead of directions. What does it say?'],
        ['q19', 'What would be the least useful superpower?'],
        ['q20', 'The strangest thing you can find in a hotel room is...'],
        ['q21', 'You get to name a new planet. What’s the worst name you can think of?'],
        ['q22', 'What would make for the most awkward first date conversation?'],
        ['q23', 'A terrible catchphrase for a villain would be...'],
        ['q24', 'A fortune teller reveals your biggest fear. What is it?'],
        ['q25', 'A strange thing to bring to a picnic is...'],
        ['q26', 'The worst thing to overhear during a surgery is...'],
        ['q27', 'You’re a contestant on a new reality show. What’s the weird challenge they make you do?'],
        ['q28', 'The worst way to break up with someone is...'],
        ['q29', 'If your pet could speak, the first thing it would say is...'],
        ['q30', 'You get to redesign the national flag. What ridiculous symbol do you add?'], 
        ['pictionary', '["apple", "balloon", "candle", "diamond", "elephant", "forest", "giraffe", "hat", "island", "jungle","kite", "lemon", "mountain", "necklace", "octopus", "pencil", "queen", "rainbow", "sunset", "tiger","umbrella", "volcano", "waterfall", "xylophone", "yacht", "zebra", "airplane", "backpack", "castle","dragon", "earth", "fireworks", "galaxy", "helicopter", "igloo", "jellyfish", "kangaroo", "library","museum", "notebook", "ocean", "pyramid", "quilt", "river", "statue", "tornado", "unicorn", "vampire","wizard", "yogurt", "zoo", "anchor", "butterfly", "cactus", "desert", "eggplant", "feather", "glove","hamburger", "insect", "jacket", "key", "lantern", "mermaid", "nest", "ostrich", "popcorn", "robot","skeleton", "toaster", "vase", "window", "avocado", "bridge", "cabin", "donut", "eagle", "fountain","gorilla", "hamster", "island", "jacket", "kettle", "leopard", "magnet", "napkin", "owl", "puzzle","rocket", "spider", "trophy", "village", "whale", "yarn", "accordion", "bicycle", "crocodile", "drum","envelope", "flamingo", "guitar", "helicopter", "iguana", "jungle", "kiwi", "lemonade", "mushroom","nightmare", "orange", "parrot", "quartz", "robot", "sandcastle", "telescope", "vacuum", "watermelon","x-ray", "yeti", "antelope", "bracelet", "chimney", "duck", "envelope", "fossil", "garden", "hatchet","iceberg", "jewel", "kitchen", "lamp", "mountain", "necklace", "orchid", "pumpkin", "ring", "scooter","trampoline", "vineyard", "wagon", "zeppelin", "apron", "beetle", "cloud", "diamond", "eraser", "forest","garage", "hearth", "icicle", "jigsaw", "koala", "lighthouse", "marble", "newspaper", "oxygen", "pear","quokka", "road", "strawberry", "tent", "vacation", "whisk", "yam", "armchair", "blender", "cloud","dinosaur", "egg", "flute", "gate", "hedgehog", "igloo", "joker", "kaleidoscope", "log", "maze","nightingale", "otter", "peacock", "quicksand", "rose", "snail", "turtle", "velvet", "watch","yew", "amethyst", "bell", "cotton", "dice", "eel", "fence", "ghost", "hedge", "ivy", "jam","kiwifruit", "ladder", "moss", "nest", "opal", "pearl"]']
    ]);
};

const Layout = () => {

    const [loaded, error] = useFonts({
        'LoveSeed': require("../assets/fonts/loveseed.ttf"),
        'BreakFill': require("../assets/fonts/breakfill.ttf"),
        'BreakFillSemiBold': require("../assets/fonts/breakfillsemibold.ttf"),
        'BreakFillBold': require("../assets/fonts/breakfillbold.ttf"),
        'Montserrat': require("../assets/fonts/mont.ttf"),
        'MontserratThin': require("../assets/fonts/montthin.ttf"),
        'MontserratMedium': require("../assets/fonts/montmedium.ttf"),
        'MontserratBold': require("../assets/fonts/montbold.ttf"),
        'MontserratBlack': require("../assets/fonts/montblack.ttf"),
    });

    
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
        loadQA();
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <Stack />
    )
};

export default Layout;