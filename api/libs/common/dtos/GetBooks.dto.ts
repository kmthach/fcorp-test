import { ApiProperty } from '@nestjs/swagger';

export class GetBooksRequestDto {}

export class GetBooksReponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  publishedDate: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;
}
