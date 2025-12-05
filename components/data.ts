// utils/lakeData.ts
import { reactive } from 'vue';
import axios from 'axios';

export class LakeData {
  name: string;
  lat: number;
  lng: number;
  id: number;
  status: string;
  E:number;
  coliform:number;
  enterococci:number;
  giardia:number;
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  waterlevel: number

  constructor(name: string = '', lat: number = 0, lng: number = 0, id: number = 0, status: string = '') {
      this.name = name;
      this.lat = lat;
      this.lng = lng;
      this.id = id;
      this.status = status;
      this.E = LakeData.randomPatogen(10,15)
      this.coliform = LakeData.randomPatogen(20,30)
      this.enterococci = LakeData.randomPatogen(5,10)
      this.giardia = LakeData.randomPatogen(5,10)
      this.temperature = null;
      this.humidity = null;
      this.windSpeed = null;
      this.waterlevel = LakeData.randomPatogen(0.5,2.0)
  }

  async setAxios(): Promise<void> {
      try {
          const response = await axios.get(
              `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lng}&current_weather=true`
          );
          const data = response.data.current_weather;
          this.temperature = data.temperature;
          this.humidity = data.windspeed; // там humidity нет, нужно проверять API
          this.windSpeed = data.windspeed;
      } catch (error) {
          console.error('Error fetching weather data:', error);
          this.temperature = null;
          this.humidity = null;
          this.windSpeed = null;
      }
  }

  static randomPatogen = (arg1:number,arg2:number):number => {
      return Math.random() * (arg2 - arg1) + arg1;
  }
}

export const lakes = reactive<LakeData[]>([
  new LakeData('Озеро Пестрое', 54.836699, 69.111328, 1, 'lake'),
  new LakeData('Озеро Белое', 54.927154, 69.254322, 2, 'lake'),
  new LakeData('Озеро Горькое', 54.947573, 68.951122, 3, 'lake'),
  new LakeData('Озеро Поганка', 54.921209, 69.053476, 4, 'lake'),
  new LakeData('Озеро Дикое', 54.840156, 69.131957, 5, 'lake'),
  new LakeData('Ishim', 54.893110, 69.127836, 6, 'river')
]);