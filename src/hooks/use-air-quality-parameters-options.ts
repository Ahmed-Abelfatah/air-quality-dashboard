import { useMemo } from 'react'
import { AirQualityParameter } from '../types/air-quality-data-item'

export interface ParameterOption {
  value: AirQualityParameter
  label: string
  description?: string
  unit?: string
}

export function useAirQualityParameters() {
  const parameters = useMemo<ParameterOption[]>(
    () => [
      { value: 'coGt', label: 'CO-GT', description: 'Carbon Monoxide', unit: 'ppm' },
      {
        value: 'temperature',
        label: 'Temperature',
        description: 'Ambient temperature',
        unit: '°C',
      },
      {
        value: 'relativeHumidity',
        label: 'Relative Humidity',
        description: 'Relative humidity',
        unit: '%',
      },
      {
        value: 'pt08S1Co',
        label: 'PT08.S1 (CO)',
        description: 'Tin oxide sensor for CO',
        unit: 'arbitrary units',
      },
      { value: 'nmhcGt', label: 'NMHC-GT', description: 'Non-Methane Hydrocarbons', unit: 'ppm' },
      {
        value: 'c6h6Gt',
        label: 'C6H6-GT',
        description: 'Benzene GT reference analyzer',
        unit: 'µg/m³',
      },
      {
        value: 'pt08S2Nmhc',
        label: 'PT08.S2 (NMHC)',
        description: 'Titania sensor for NMHC',
        unit: 'arbitrary units',
      },
      { value: 'noxGt', label: 'NOx-GT', description: 'NOx GT reference analyzer', unit: 'ppb' },
      {
        value: 'pt08S3Nox',
        label: 'PT08.S3 (NOx)',
        description: 'Tungsten oxide sensor for NOx',
        unit: 'arbitrary units',
      },
      { value: 'no2Gt', label: 'NO2-GT', description: 'NO2 GT reference analyzer', unit: 'ppb' },
      {
        value: 'pt08S4No2',
        label: 'PT08.S4 (NO2)',
        description: 'Tungsten oxide sensor for NO2',
        unit: 'arbitrary units',
      },
      {
        value: 'pt08S5O3',
        label: 'PT08.S5 (O3)',
        description: 'Indium oxide sensor for O3',
        unit: 'arbitrary units',
      },
      {
        value: 'absoluteHumidity',
        label: 'Absolute Humidity',
        description: 'Absolute humidity',
        unit: 'g/m³',
      },
    ],
    []
  )

  const groupedParameters = useMemo(() => {
    const groups = {
      primary: parameters.filter((p) =>
        ['coGt', 'benzene', 'nox', 'no2', 'temperature', 'relativeHumidity'].includes(p.value)
      ),
      sensors: parameters.filter((p) => p.value.startsWith('pt08')),
      other: parameters.filter(
        (p) =>
          !['coGt', 'benzene', 'nox', 'no2', 'temperature', 'relativeHumidity'].includes(p.value) &&
          !p.value.startsWith('pt08')
      ),
    }

    return groups
  }, [parameters])

  const getParameterByValue = (value: AirQualityParameter): ParameterOption | undefined => {
    return parameters.find((param) => param.value === value)
  }

  const getParameterUnit = (value: AirQualityParameter): string => {
    return getParameterByValue(value)?.unit || ''
  }

  const getParameterDescription = (value: AirQualityParameter): string => {
    return getParameterByValue(value)?.description || ''
  }

  return {
    parameters,
    groupedParameters,
    getParameterByValue,
    getParameterUnit,
    getParameterDescription,
  }
}
