import { useQuery } from '@tanstack/react-query'
import { AirQualityApiResponse, AirQualityParameter } from '../types/air-quality-data-item'
import { formatDateForApi } from '../utils/date-formatter'
import { getApiBaseUrl } from '../utils/environments'

const fetchData = async (
  params: AirQualityParameter,
  startDate: string,
  endDate: string
): Promise<AirQualityApiResponse> => {
  const baseUrl = getApiBaseUrl()

  const response = await fetch(
    `${baseUrl}/v1/api/air-quality/filter/${params}?start=${startDate}&end=${endDate}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export const useAirQualityData = (
  selectedParam: AirQualityParameter,
  startDate: Date,
  endDate: Date
) => {
  return useQuery({
    queryKey: ['airQualityData', selectedParam, startDate, endDate],
    queryFn: () => fetchData(selectedParam, formatDateForApi(startDate), formatDateForApi(endDate)),
    enabled: !!selectedParam && !!startDate && !!endDate && startDate <= endDate,
  })
}
