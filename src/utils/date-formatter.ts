export const formatDateForApi = (date: Date): string => {
  return date.toISOString().split('T')[0]
}
