// Tipos para dados meteorológicos
export type WeatherData = {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
};

export type HourlyForecast = {
  time: string;
  temperature: number;
  icon: string;
};

export type DailyForecast = {
  date: string;
  tempMax: number;
  tempMin: number;
  icon: string;
  description: string;
};

// Tipo para cidade favorita
export type FavoriteCity = {
  name: string;
  lat: number;
  lon: number;
};

// Tipo para dados do gráfico de temperatura
export type TemperatureChartData = {
  time: string;
  temperature: number;
};
