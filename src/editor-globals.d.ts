declare const chrome: any;

declare function importScripts(...paths: string[]): void;

declare const WARN_MIN: number;
declare const WARN_MAX: number;
declare const DANGER_MIN: number;
declare const DANGER_MAX: number;

interface ExtensionSettings {
  badge: boolean;
  pageBorder: boolean;
  dynamicIcon: boolean;
  warnAt: number;
  dangerAt: number;
}

declare const DEFAULT_SETTINGS: ExtensionSettings;

declare function loadSettings(): Promise<ExtensionSettings>;
declare function saveSettings(settings: ExtensionSettings): Promise<void>;
