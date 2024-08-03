import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue, withSpring
} from 'react-native-reanimated';
const { width, height } = Dimensions.get('screen');

const size = 60;

const springConfig = velocity => {
  'worklet';
  return {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    velocity,
  };
};

const followMe = (animation) => {
  const newX = useDerivedValue(() => withSpring(animation.x.value, springConfig()));
  const newY = useDerivedValue(() => withSpring(animation.y.value, springConfig()));
  const newStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: newX.value }, { translateY: newY.value }],
    };
  });
  const newAnimation = { x: newX, y: newY };
  return { newAnimation, newStyle };
}

export default function AnimatedView() {
  const initialAnimation = {
    x: useSharedValue(width - size),
    y: useSharedValue(height / 2 - size / 2)
  }
  const initialStyle = useAnimatedStyle(() => {
    const { x, y } = initialAnimation;
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      const { x, y } = initialAnimation;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      const { x, y } = initialAnimation;
      x.value = event.translationX + ctx.startX;
      y.value = event.translationY + ctx.startY;
    },
    onEnd: (event, ctx) => {
      const { x } = initialAnimation;
      x.value = withSpring(x.value < width / 2 ? 0 : width - size);
    },
  });

  const { newAnimation: newAnimation1, newStyle: newStyle1 } = followMe(initialAnimation);
  const { newAnimation: newAnimation2, newStyle: newStyle2 } = followMe(newAnimation1);
  const { newAnimation: newAnimation3, newStyle: newStyle3 } = followMe(newAnimation2);
  const { newStyle: newStyle4 } = followMe(newAnimation3);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, newStyle4, { backgroundColor: 'violet' }]} />
      <Animated.View style={[styles.box, newStyle3, { backgroundColor: 'pink' }]} />
      <Animated.View style={[styles.box, newStyle2, { backgroundColor: 'green' }]} />
      <Animated.View style={[styles.box, newStyle1, { backgroundColor: 'blue' }]} />
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.box, initialStyle]} />
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    height: size,
    width: size,
    borderRadius: size,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
});