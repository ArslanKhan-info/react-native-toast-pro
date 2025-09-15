# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2024-12-19

### Added
- ⚠️ Warning toast type support
- 🎨 Warning color (#FFA500) for warning toasts
- 📚 Updated documentation with warning functionality examples
- 🔧 `showWarning` method in both `useAlert` hook and `AlertService`

### Features
- Complete warning toast functionality with animations
- Consistent API design across all toast types (success, error, warning)
- Updated README with comprehensive warning usage examples

## [1.0.5] - 2024-12-19

### Added
- 🎬 GIF demonstrations for success and error toast animations
- 📱 Enhanced animations powered by react-native-reanimated
- 🎨 Improved spring and timing animations with better performance
- 📚 Updated README with comprehensive installation and usage instructions

### Changed
- ⚡ Migrated from React Native Animated API to react-native-reanimated
- 🎯 Updated animation settings: damping: 4, stiffness: 100
- ⏱️ Reduced toast duration from 3 seconds to 1.5 seconds for better UX
- 🔧 Updated peer dependencies to include react-native-reanimated >= 3.0.0

### Technical Improvements
- Better animation performance with native driver support
- Smoother exit animations with Easing.in(Easing.exp)
- Enhanced slide animations with Easing.out(Easing.exp)
- Improved component structure and TypeScript support

## [1.0.4] - 2024-12-19

### Added
- Initial release with basic toast functionality
- TypeScript support
- Context-based API
- Safe area aware positioning

### Features
- Success and error toast types
- Customizable colors and styling
- Lightweight and performant design
