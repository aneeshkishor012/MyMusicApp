import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Theme from '../../theme/Theme';

const random = () => (parseInt(Math.random() * 255));
const randomColor = () => 'rgb(' + random() + ',' + random() + ',' + random() + ')'
const size = 60;
const innerSize = 25;

const Loader2 = () => {
    const animation = useRef(new Animated.Value(0)).current;
    const color1 = useRef(Theme.PB1).current;
    const color2 = useRef(Theme.PB2).current;
    const color3 = useRef(Theme.PB3).current;
    const color4 = useRef(Theme.PB4).current;
    const color5 = useRef(Theme.PB5).current;

    useEffect(() => {
        const animate = () => {
            Animated.loop(
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true
                })
            ).start();
        };
        animate();
    }, [animation]);

    const Dim = size;
    const inputRange = [0, 0.5, 1];
    const angle = animation.interpolate({ inputRange, outputRange: ['0deg', '72deg', '360deg'] });
    const angle0 = animation.interpolate({ inputRange, outputRange: ['0deg', '144deg', '360deg'] });
    const angle1 = animation.interpolate({ inputRange, outputRange: ['0deg', '216deg', '360deg'] });
    const angle2 = animation.interpolate({ inputRange, outputRange: ['0deg', '288deg', '360deg'] });
    const angle3 = animation.interpolate({ inputRange, outputRange: ['0deg', '360deg', '360deg'] });
    const outerAngle = animation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '720deg'] });

    return (
        <View style={styles.container}>
            <Animated.View style={{ width: Dim, height: Dim, transform: [{ rotate: outerAngle }] }}>
                <Animated.View style={{ ...styles.item, transform: [{ rotate: angle3 }], zIndex: 5 }}>
                    <View style={styles.inneritem}>
                        <View style={{ height: innerSize, width: innerSize, borderRadius: innerSize, backgroundColor: color1 }}></View>
                    </View>
                </Animated.View>
                <Animated.View style={{ ...styles.item, transform: [{ rotate: angle2 }], zIndex: 4 }}>
                    <View style={styles.inneritem}>
                        <View style={{ height: innerSize - (innerSize / 10), width: innerSize - (innerSize / 10), borderRadius: innerSize, backgroundColor: color2 }}></View>
                    </View>
                </Animated.View>
                <Animated.View style={{ ...styles.item, transform: [{ rotate: angle1 }], zIndex: 3 }}>
                    <View style={styles.inneritem}>
                        <View style={{ height: innerSize - (2 * (innerSize / 10)), width: innerSize - (2 * (innerSize / 10)), borderRadius: innerSize, backgroundColor: color3 }}></View>
                    </View>
                </Animated.View>

                <Animated.View style={{ ...styles.item, transform: [{ rotate: angle0 }], zIndex: 2 }}>
                    <View style={styles.inneritem}>
                        <View style={{ height: innerSize - (3 * (innerSize / 10)), width: innerSize - (3 * (innerSize / 10)), borderRadius: innerSize, backgroundColor: color4 }}></View>
                    </View>
                </Animated.View>
                <Animated.View style={{ ...styles.item, transform: [{ rotate: angle }], zIndex: 1 }}>
                    <View style={styles.inneritem}>
                        <View style={{ height: innerSize - (3 * (innerSize / 10)), width: innerSize - (3 * (innerSize / 10)), borderRadius: innerSize, backgroundColor: color5 }}></View>
                    </View>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        width: size,
        height: size,
        borderWidth: 0,
        backgroundColor: 'transparent',
        position: 'absolute',
    },
    innerHeight: {
        height: innerSize,
        width: innerSize,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Loader2;
