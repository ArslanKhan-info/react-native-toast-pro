import { Animated as RNAnimated } from "react-native";

export type AlertType = "error" | "success";

export interface AlertItem {
    id: string;
    message: string;
    type: AlertType;
    timeoutId: ReturnType<typeof setTimeout>;
    translateY: RNAnimated.Value;
    scale: RNAnimated.Value;
}

export interface AlertContextProps {
    showError: (message: string) => void;
    showSuccess: (message: string) => void;
}

export interface AlertProviderProps {
    children: React.ReactNode;
}
