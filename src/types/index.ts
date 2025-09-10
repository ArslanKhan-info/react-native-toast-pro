export type AlertType = "error" | "success";

export interface AlertItem {
    id: string;
    message: string;
    type: AlertType;
}

export interface AlertContextProps {
    showError: (message: string) => void;
    showSuccess: (message: string) => void;
}

export interface AlertProviderProps {
    children: React.ReactNode;
}

export interface AlertComponentProps {
    id: string;
    message: string;
    type: AlertType;
    index: number;
    insets: { top: number };
    onRemove: (id: string) => void;
    alertHeight: number;
    alertMargin: number;
}