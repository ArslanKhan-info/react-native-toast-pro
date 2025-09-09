import React, { createContext, useContext, useRef, useState } from "react";
import { Dimensions, Animated as RNAnimated, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { commonColors, moderateScale } from "../utils";
import { AlertType, AlertItem, AlertContextProps, AlertProviderProps } from "../types";

const { width } = Dimensions.get("window");
const ALERT_HEIGHT = 45;
const ALERT_MARGIN = 8;

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = (): AlertContextProps => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};

class AlertService {
    static showError: (message: string) => void;
    static showSuccess: (message: string) => void;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const insets = useSafeAreaInsets();
    const [alerts, setAlerts] = useState<AlertItem[]>([]);
    const alertIdCounter = useRef(0);

    const showAlert = (message: string, type: AlertType) => {
        const id = `alert_${alertIdCounter.current++}`;
        
        // Create animated values for this alert
        const translateY = new RNAnimated.Value(-ALERT_HEIGHT);
        const scale = new RNAnimated.Value(0.8);

        const newAlert: AlertItem = {
            id,
            message,
            type,
            translateY,
            scale,
            timeoutId: setTimeout(() => {
                hideAlert(id);
            }, 3000), // Increased timeout to 3 seconds
        };

        setAlerts(prev => [...prev, newAlert]);

        // Animate in
        RNAnimated.parallel([
            RNAnimated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                tension: 100,
                friction: 4,
            }),
            RNAnimated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const showError = (message: string) => showAlert(message, "error");

    const showSuccess = (message: string) => showAlert(message, "success");

    const hideAlert = (id: string) => {
        setAlerts(prev => {
            const alert = prev.find(a => a.id === id);
            if (!alert) return prev;

            // Clear timeout
            clearTimeout(alert.timeoutId);

            // Animate out
            RNAnimated.parallel([
                RNAnimated.timing(alert.translateY, {
                    toValue: -ALERT_HEIGHT,
                    duration: 500,
                    useNativeDriver: true,
                }),
                RNAnimated.spring(alert.scale, {
                    toValue: 0.8,
                    useNativeDriver: true,
                    tension: 100,
                    friction: 4,
                }),
            ]).start(() => {
                // Remove from state after animation completes
                setAlerts(current => current.filter(a => a.id !== id));
            });

            return prev;
        });
    };

    AlertService.showError = showError;
    AlertService.showSuccess = showSuccess;

    return (
        <AlertContext.Provider value={{ showError, showSuccess }}>
            {children}
            {alerts.map((alert, index) => {
                const animatedStyle = {
                    transform: [
                        { translateY: alert.translateY },
                        { scale: alert.scale }
                    ],
                };

                return (
                    <RNAnimated.View
                        key={alert.id}
                        style={[
                            styles.alertContainer,
                            animatedStyle,
                            {
                                top: insets.top + 12 + (index * (ALERT_HEIGHT + ALERT_MARGIN)),
                            },
                            alert.type === "success" ? styles.successBackground : styles.errorBackground,
                        ]}
                    >
                        <Text style={styles.alertText}>{alert.message}</Text>
                    </RNAnimated.View>
                );
            })}
        </AlertContext.Provider>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        position: "absolute",
        height: ALERT_HEIGHT,
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
});

export default AlertService;
