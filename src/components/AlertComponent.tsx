import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { AlertComponentProps } from "../types";
import { useCallback, useEffect, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { commonColors, moderateScale } from "../utils";
import { width } from "../utils/scalling";

const AlertComponent: React.FC<AlertComponentProps> = ({ id, message, type, index, insets, onRemove, alertHeight, alertMargin }) => {
    const translateY = useSharedValue(-alertHeight);
    const scale = useSharedValue(0.8);
    const styles = useStyles(alertHeight)

    useEffect(() => {
        scale.value = withSpring(1, {
            damping: 4,
            stiffness: 100,
        });
        translateY.value = withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.exp),
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value },
                { scale: scale.value }
            ],
        };
    });

    const handleRemove = useCallback(() => {
        translateY.value = withTiming(-alertHeight, {
            duration: 500,
            easing: Easing.in(Easing.exp),
        });
        scale.value = withSpring(0.8, {
            damping: 4,
            stiffness: 100,
        });

        setTimeout(() => {
            onRemove(id);
        }, 500);
    }, [id, onRemove, translateY, scale]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleRemove();
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, [handleRemove]);

    return (
        <Animated.View
            style={[
                styles.alertContainer,
                animatedStyle,
                {
                    top: insets.top + 12 + (index * (alertHeight + alertMargin)),
                },
                type === "success" ? styles.successBackground : styles.errorBackground,
            ]}
        >
            <Text style={styles.alertText}>{message}</Text>
        </Animated.View>
    );
};

const useStyles = (alertHeight: number,) => {
    return useMemo(() =>
        StyleSheet.create({
            alertContainer: {
                position: "absolute",
                height: alertHeight,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                zIndex: 999,
                width: width - moderateScale(60),
                borderRadius: moderateScale(6),
            },
            alertText: {
                color: commonColors.white,
                fontSize: 16,
                fontWeight: "bold",
            },
            errorBackground: {
                backgroundColor: commonColors.error,
            },
            successBackground: {
                backgroundColor: commonColors.success,
            },
        })
        , [alertHeight])
}

export default AlertComponent