import './style.css'
import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import DatePickerInput from '../date-picker-input'
import { AirQualityParameter } from '../../types/air-quality-data-item'
import { useAirQualityData } from '../../hooks/use-air-quality-data'
import { useAirQualityParameters } from '../../hooks/use-air-quality-parameters-options'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const AirQualityDashboard: React.FC = () => {
  const [selectedParam, setSelectedParam] = useState<AirQualityParameter>('coGt')
  const [startDate, setStartDate] = useState(new Date('2004-03-09'))
  const [endDate, setEndDate] = useState(new Date('2004-03-10'))

  const { data, isLoading, error } = useAirQualityData(selectedParam, startDate, endDate)
  const { parameters, getParameterByValue, getParameterUnit } = useAirQualityParameters()

  const chartData = {
    labels: data?.data.map((item) => `${item.date.split('T')[0]} ${item.time}`) || [],
    datasets: [
      {
        label: selectedParam,
        data: data?.data.map((item) => item[selectedParam]) || [],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  }

  const handleStartDateChange = (date: Date | null) => {
    if (date) setStartDate(date)
  }

  const handleEndDateChange = (date: Date | null) => {
    if (date) setEndDate(date)
  }

  return (
    <div className="dashboard-container">
      <div className="controls-grid">
        <div className="control-card">
          <label>Select Parameter:</label>
          <select
            value={selectedParam}
            onChange={(e) => setSelectedParam(e.target.value as AirQualityParameter)}
          >
            {parameters.map((param) => (
              <option key={param.value} value={param.value}>
                {param.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-card">
          <DatePickerInput
            label="Start Date:"
            selected={startDate}
            onChange={handleStartDateChange}
            maxDate={endDate}
          />
        </div>

        <div className="control-card">
          <DatePickerInput
            label="End Date:"
            selected={endDate}
            onChange={handleEndDateChange}
            minDate={startDate}
          />
        </div>
      </div>

      <div className="chart-container">
        {isLoading && <div className="chart-loading">Loading data...</div>}

        {error && (
          <div className="chart-error">
            Error fetching data: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        )}

        {data && data.data.length > 0 && (
          <div className="chart-data">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: {
                    display: true,
                    text: `${getParameterByValue(selectedParam)?.label || selectedParam} Measurements ${
                      getParameterUnit(selectedParam) ? `(${getParameterUnit(selectedParam)})` : ''
                    }`,
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AirQualityDashboard
