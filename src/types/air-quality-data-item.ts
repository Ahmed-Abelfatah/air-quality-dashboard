export interface AirQualityDataItem {
  date: string
  time: string
  [key: string]: any
}

export interface AirQualityApiResponse {
  success: boolean
  data: AirQualityDataItem[]
}

export type AirQualityParameter =
  | 'coGt'
  | 'nox'
  | 'no2'
  | 'temperature'
  | 'relativeHumidity'
  | 'pt08S1Co'
  | 'nmhcGt'
  | 'c6h6Gt'
  | 'pt08S2Nmhc'
  | 'noxGt'
  | 'pt08S3Nox'
  | 'no2Gt'
  | 'pt08S4No2'
  | 'pt08S5O3'
  | 'absoluteHumidity'
