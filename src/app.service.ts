import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): any {
    return {
      mode: process.env.MODE,
      text: 'Hello cat!!',
      date: new Date()
    }
  }
}
