export interface LatestData {
  country: string;
  code: string;
  confirmed: number;
  recovered: number;
  critical: number;
  deaths: number;
  latitude: number;
  longitude: number;
  lastChange: string;
  lastUpdate: string;
}

export interface LatestTotals {
  active: number;
  active_diff: number;
  confirmed: number;
  confirmed_diff: number;
  date: string;
  deaths: number;
  deaths_diff: number;
  fatality_rate: number;
  last_update: string;
  recovered: number;
  recovered_diff: number;
}
