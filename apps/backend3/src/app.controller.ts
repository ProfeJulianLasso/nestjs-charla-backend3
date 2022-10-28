import { Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    @Inject('MyMicroservices') private readonly microservices: ClientProxy,
  ) {}

  @Get('users')
  getHelloUsers(@Res() response: Response): void {
    this.microservices
      .send<{ message: string }>('UsersGetMessage', {})
      .subscribe({
        next: (data) => {
          response.json(data);
        },
      });
  }

  @Post('posts')
  getHelloPosts(@Res() response: Response): void {
    this.microservices.emit('PostsGetMessage', {
      message: 'Hola Mundo para el Post',
    });
    response.send('Mensaje emitido');
  }
}
