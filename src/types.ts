export interface WifiZone {
  id: string;
  name: string;
  status: 'online' | 'offline';
  users: number;
  managementUrl?: string;
}

export interface Device {
  id: string;
  name: string;
  mac: string;
  ip: string;
  connectedAt: string;
  usage: number; // in MB
  status: 'active' | 'suspended';
}

export interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  speed: string;
  limit: string;
}

export interface UsageData {
  time: string;
  download: number;
  upload: number;
}
