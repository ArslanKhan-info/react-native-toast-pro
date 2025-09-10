import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AlertType, AlertContextProps, AlertProviderProps } from "../types";
import AlertComponent from "./AlertComponent";

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

// Individual Alert Component to handle its own animations


export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const insets = useSafeAreaInsets();
    const [alerts, setAlerts] = useState<Array<{ id: string; message: string; type: AlertType }>>([]);
    const alertIdCounter = useRef(0);

    const showAlert = useCallback((message: string, type: AlertType) => {
        const id = `alert_${alertIdCounter.current++}`;

        const newAlert = {
            id,
            message,
            type,
        };

        setAlerts(prev => [...prev, newAlert]);
    }, []);

    const showError = useCallback((message: string) => showAlert(message, "error"), [showAlert]);

    const showSuccess = useCallback((message: string) => showAlert(message, "success"), [showAlert]);

    const hideAlert = useCallback((id: string) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, []);

    AlertService.showError = showError;
    AlertService.showSuccess = showSuccess;

    return (
        <AlertContext.Provider value={{ showError, showSuccess }}>
            {children}
            {alerts.map((alert, index) => (
                <AlertComponent
                    key={alert.id}
                    id={alert.id}
                    message={alert.message}
                    type={alert.type}
                    index={index}
                    insets={insets}
                    onRemove={hideAlert}
                    alertHeight={ALERT_HEIGHT}
                    alertMargin={ALERT_MARGIN}
                />
            ))}
        </AlertContext.Provider>
    );
};


export default AlertService;