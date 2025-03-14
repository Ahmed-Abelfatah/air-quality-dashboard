export const getApiBaseUrl = (): string => {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return isDevelopment ? 'http://localhost:3003' : 'https://air-quality-analyzer-80wm.onrender.com'
}
export const isDevelopmentMode = (): boolean => {
  return process.env.NODE_ENV === 'development'
}
