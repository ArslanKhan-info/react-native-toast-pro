# React Native Toast Alert

A beautiful and customizable toast notification component for React Native with smooth animations and TypeScript support.

## Features

- 🎨 Beautiful animations with spring and timing effects
- 📱 Safe area aware positioning
- 🎯 Multiple alert types (success, error)
- ⚡ Lightweight and performant
- 🔧 Fully customizable colors and styling
- 📦 TypeScript support
- 🎭 Context-based API for easy usage

## Installation

```bash
npm install react-native-toast-pro
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react-native-safe-area-context
```

## Usage

### 1. Wrap your app with AlertProvider

```tsx
import React from 'react';
import { AlertProvider } from 'react-native-toast-pro';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AlertProvider>
        {/* Your app components */}
      </AlertProvider>
    </SafeAreaProvider>
  );
}
```

### 2. Use the hook in your components

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useAlert } from 'react-native-toast-pro';

export default function MyComponent() {
  const { showSuccess, showError } = useAlert();

  const handleSuccess = () => {
    showSuccess('Operation completed successfully!');
  };

  const handleError = () => {
    showError('Something went wrong!');
  };

  return (
    <View>
      <Button title="Show Success" onPress={handleSuccess} />
      <Button title="Show Error" onPress={handleError} />
    </View>
  );
}
```

### 3. Alternative: Use the static service

```tsx
import { AlertService } from 'react-native-toast-pro';

// Show success toast
AlertService.showSuccess('Data saved successfully!');

// Show error toast
AlertService.showError('Failed to save data!');
```

## Customization

### Custom Colors

You can customize the colors by modifying the `commonColors` object:

```tsx
import { commonColors } from 'react-native-toast-pro';

// The default colors are:
// success: '#00A13A'
// error: '#FF0000'
// warning: '#FFA500'
// white: '#ffffff'
```

### Custom Styling

The component uses responsive scaling with the `moderateScale` function. You can adjust the scaling behavior by modifying the scaling configuration.

## API Reference

### AlertProvider Props

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Your app components |

### useAlert Hook

Returns an object with the following methods:

| Method | Type | Description |
|--------|------|-------------|
| showSuccess | (message: string) => void | Shows a success toast |
| showError | (message: string) => void | Shows an error toast |

### AlertService

Static service with the same methods as the hook:

| Method | Type | Description |
|--------|------|-------------|
| showSuccess | (message: string) => void | Shows a success toast |
| showError | (message: string) => void | Shows an error toast |

## Configuration

### Toast Duration

By default, toasts are displayed for 3 seconds. You can modify this in the `ToastProvider.tsx` file by changing the timeout value in the `showAlert` function.

### Animation Settings

The component uses React Native's Animated API with the following default settings:

- **Scale Animation**: Spring animation with tension: 100, friction: 4
- **Slide Animation**: Timing animation with duration: 500ms
- **Auto-dismiss**: 3000ms (3 seconds)

## Requirements

- React Native >= 0.60.0
- React >= 16.8.0
- react-native-safe-area-context

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**Arslan Khan**
- Email: alkabeer.info.co@gmail.com
- Phone: +91 6280000874
- GitHub: [@arslan-khan](https://github.com/ArslanKhan-info)
- Live Project: [Boilerplate Downloader](http://boiler-plate-downloader.s3-website-us-east-1.amazonaws.com/contact)

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- React Native community for continuous improvements
- All contributors who help make this project better

## 📞 Support

If you have any questions or need help, feel free to reach out:

- Create an issue on GitHub
- Email: alkabeer.info.co@gmail.com
- Phone: +91 6280000874

---

⭐ If you found this project helpful, please give it a star on GitHub!
