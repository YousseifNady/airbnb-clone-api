import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseDto {
  @Expose()
  @ApiProperty({
    description: 'access token',
    example: 'kjdlkjdlskjkaljlkasdjlkadjlkjas..',
  })
  accessToken!: string;

  @Expose()
  @ApiProperty({
    description: 'refresh token',
    example: 'kjdlkjdlskjkaljlkasdjlkadjlkjas..',
  })
  refreshToken!: string;
}
