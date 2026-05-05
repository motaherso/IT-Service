import { Device, Package, UsageData, WifiZone } from './types';

export const MOCK_ZONES: WifiZone[] = [
  { id: 'z1', name: 'MI-Conference Wifi', status: 'online', users: 12, managementUrl: 'https://192.168.1.162/login' },
  { id: 'z2', name: 'H&M BUYER', status: 'online', users: 8, managementUrl: 'https://192.168.1.164/ssid/index' },
  { id: 'z3', name: 'MI-Ins', status: 'online', users: 5, managementUrl: 'https://192.168.1.165/login' },
  { id: 'z4', name: 'PVH-MI', status: 'online', users: 14, managementUrl: 'https://192.168.1.166/#view:ssid/ssid' },
  { id: 'z5', name: 'Sample-Conference', status: 'online', users: 0, managementUrl: 'https://192.168.1.161/ssid/index' },
  { id: 'z6', name: 'Tarek Habib', status: 'online', users: 3, managementUrl: 'https://192.168.1.160/#view:ssid/ssid' },
  { id: 'z7', name: 'Director sir', status: 'online', users: 2, managementUrl: 'https://192.168.4.153/clients/index' },
  { id: 'z8', name: 'Sohel GM Sir', status: 'online', users: 4, managementUrl: 'https://192.168.1.163/login' },
  { id: 'z9', name: 'Mi-Tranning Room', status: 'online', users: 18, managementUrl: 'https://192.168.4.159/clients/index' },
  { id: 'z10', name: 'Samith-QA', status: 'online', users: 7, managementUrl: 'https://192.168.4.160/ssid/index' },
];

export const MOCK_INFRASTRUCTURE: WifiZone[] = [
  { id: 'z11', name: 'Printer', status: 'online', users: 1 },
  { id: 'z12', name: 'NVR Mikrotik', status: 'online', users: 4 },
  { id: 'z13', name: 'File Server', status: 'online', users: 2 },
];

export const MOCK_DEVICES: Device[] = [
  { id: '1', name: 'Samsumg S22 Ultra', mac: 'BC:D1:D3:45:E6:F7', ip: '192.168.88.5', connectedAt: '2h 15m ago', usage: 1450, status: 'active' },
  { id: '2', name: 'MacBook Pro 16"', mac: 'A1:B2:C3:D4:E5:F6', ip: '192.168.88.12', connectedAt: '45m ago', usage: 3200, status: 'active' },
  { id: '3', name: 'iPhone 15 Pro', mac: '88:77:66:55:44:33', ip: '192.168.88.21', connectedAt: '5h 10m ago', usage: 890, status: 'suspended' },
  { id: '4', name: 'Dell XPS Desktop', mac: '00:11:22:33:44:55', ip: '192.168.88.7', connectedAt: '12m ago', usage: 120, status: 'active' },
  { id: '5', name: 'Android TV Box', mac: 'FF:EE:DD:CC:BB:AA', ip: '192.168.88.3', connectedAt: '1h 20m ago', usage: 2100, status: 'active' },
  { id: '6', name: 'NVR System', mac: '44:55:66:77:88:99', ip: '192.168.88.100', connectedAt: 'Online', usage: 5600, status: 'active' },
  { id: '7', name: 'Mikrotik Router', mac: 'CC:B1:A2:99:88:77', ip: '192.168.88.1', connectedAt: 'Online', usage: 12500, status: 'active' },
  { id: '8', name: 'File Server', mac: '90:80:70:60:50:40', ip: '192.168.88.50', connectedAt: 'Online', usage: 45000, status: 'active' },
];

export const MOCK_PACKAGES: Package[] = [
  { id: 'p1', name: 'Daily Express', price: 10, duration: '24 Hours', speed: '5 Mbps', limit: 'Unlimited' },
  { id: 'p2', name: 'Weekly Plus', price: 60, duration: '7 Days', speed: '10 Mbps', limit: 'Unlimited' },
  { id: 'p3', name: 'Monthly Ultra', price: 250, duration: '30 Days', speed: '20 Mbps', limit: 'Unlimited' },
  { id: 'p4', name: 'Gamer Pack', price: 150, duration: '15 Days', speed: '50 Mbps', limit: 'Unlimited' },
];

export const MOCK_USAGE: UsageData[] = [
  { time: '10:00', download: 45, upload: 12 },
  { time: '11:00', download: 52, upload: 15 },
  { time: '12:00', download: 38, upload: 10 },
  { time: '13:00', download: 65, upload: 22 },
  { time: '14:00', download: 88, upload: 30 },
  { time: '15:00', download: 72, upload: 25 },
  { time: '16:00', download: 95, upload: 35 },
];
