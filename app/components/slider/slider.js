import React, { useState, useEffect, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, TextInput, View } from 'react-native';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';

const activeColor = 'white';
const inactiveColor = 'white';
const dotWidth = 20;

const Slider = () => {
    const [sliderWidth, setSliderWidth] = useState(null);
    const [progress, setProgress] = useState(0.25);
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const scaleY = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({ x: pan.x._value, y: pan.y._value });
                pan.setValue({ x: 0, y: 0 });
                animateScale(true);
            },
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: () => {
                pan.flattenOffset();
                animateScale();
            },
            onPanResponderTerminate: animateScale,
        })
    ).current;

    const textRef = useRef(null);

    useEffect(() => {
        translateX.addListener(({ value }) => {
            const newProgress = (value / (sliderWidth - dotWidth)).toFixed(2);
            setProgress(parseFloat(newProgress));
            onSeek(newProgress);
        });

        return () => {
            translateX.removeAllListeners();
        };
    }, [sliderWidth]);

    const onSeek = (progress) => {
        textRef.current.setNativeProps({ text: progress.toString() });
        // do your thing
    };

    const animateScale = (expand) => {
        Animated.spring(scaleY, { toValue: expand ? 2 : 1, useNativeDriver: true, bounciness: 0 }).start();
    };

    useEffect(() => {
        if (sliderWidth !== null) {
            pan.setValue({ x: (sliderWidth - dotWidth) * progress, y: 0 });
        }
    }, [sliderWidth, progress]);

    return (
        <View style={styles.container}>
            <TextInput ref={textRef} defaultValue={progress.toString()} style={styles.txt} editable={false} />
            <Text style={styles.txt}>Hello</Text>
            <View style={styles.barContainer} {...panResponder.panHandlers}>
                {!!sliderWidth && (
                    <Animated.View style={[styles.bar, { transform: [{ scaleY: scaleY }] }]}>
                        <Animated.View style={[styles.activeLine, { transform: [{ translateX: translateX }] }]} />
                    </Animated.View>
                )}
                {!!sliderWidth && <Animated.View style={[styles.dot, { transform: [{ translateX: translateX }] }]} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 50,
        backgroundColor: '#d3d3d3', // Adjust background color as needed
        width: responsiveScreenWidth(90),

    },
    txt: {
        fontSize: 25,
        color: 'white',
    },
    barContainer: {
        justifyContent: 'center',
        paddingVertical: 10,
    },
    bar: {
        height: 3,
        width: '100%',
        backgroundColor: inactiveColor,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    dot: {
        height: dotWidth,
        width: dotWidth,
        borderRadius: dotWidth / 2,
        backgroundColor: activeColor,
        position: 'absolute',
    },
    activeLine: {
        height: '100%',
        width: '100%',
        backgroundColor: activeColor,
        marginLeft: '-100%',
    },
});

export default Slider;
