// Vercel specific
export const getAbsoluteURL = (path: string) => {
    const baseURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
    return baseURL + path
}

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
    
export const formatDate = (input: string) => {
    const date = new Date(input)
    const month = date.getMonth()
    return `${months[month]} ${date.getDate()}, ${date.getFullYear()}`
}