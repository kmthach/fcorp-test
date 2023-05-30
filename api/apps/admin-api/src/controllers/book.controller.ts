import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  CreateBookReponseDto,
  CreateBookRequestDto,
  GetBooksReponseDto,
  UpdateBookReponseDto,
  UpdateBookRequestDto,
} from 'lib/common/dtos';

import {
  ExceptionMappingInterceptor,
  ResponseTransformInterceptor,
} from 'lib/common/interceptors';
import { BookService } from 'lib/core/shared/book/book.service';

@Controller('/books')
@UseInterceptors(ExceptionMappingInterceptor)
export class BookController {
  constructor(private bookService: BookService) {}

  /**
   * See test/e2e/local-auth.spec.ts
   * need username, password in body
   * skip guard to @Public when using global guard
   */

  @Get()
  @UseInterceptors(ResponseTransformInterceptor<GetBooksReponseDto[]>)
  public async getBooks() {
    return await this.bookService.getAllBooks();
  }

  @Get(':id')
  @UseInterceptors(ResponseTransformInterceptor<GetBooksReponseDto[]>)
  public async getBookById(@Param('id') id: string) {
    return await this.bookService.getBookById(id);
  }

  @Post()
  @UseInterceptors(ResponseTransformInterceptor<CreateBookReponseDto>)
  @UsePipes(ValidationPipe)
  public async createBook(@Body() req: CreateBookRequestDto): Promise<string> {
    return await this.bookService.createBook(req);
  }

  @Put(':id')
  @UseInterceptors(ResponseTransformInterceptor<UpdateBookReponseDto>)
  @UsePipes(ValidationPipe)
  public async updateBook(
    @Param('id') id: string,
    @Body() req: UpdateBookRequestDto,
  ): Promise<string> {
    return await this.bookService.updateBook(id, req);
  }
  // Only verify is performed without checking the expiration of the access_token.
  //   @ApiOperation({ summary: 'Refresh Token' })
  //   @ApiBody({
  //     type: RefreshTokenRequestDto,
  //   })
  //   @ApiHeaders([
  //     {
  //       name: 'Authorization',
  //     },
  //   ])
  //   @ApiOkResponsePaginated(RefreshTokenResponseDto)
  //   @UseGuards(JwtVerifyGuard)
  //   @Post('refresh-token')
  //   @UseInterceptors(ResponseTransformInterceptor<JwtRefresh>)
  //   public jwtRefresh(
  //     @ReqUser() user: Payload,
  //     @Body('refreshToken') token?: string,
  //   ): JwtAccess {
  //     if (!token || !this.auth.validateRefreshToken(user, token)) {
  //       throw new UnauthorizedException('InvalidRefreshToken');
  //     }
  //     return this.auth.refreshAccessToken<JwtAccess>(user);
  //   }

  //   @ApiOperation({ summary: 'Logout' })
  //   @Get('logout')
  //   @UseInterceptors(ResponseTransformInterceptor<Record<string, any>>)
  //   public logout(): Record<string, any> {
  //     return {
  //       msg: 'Success to logout',
  //     };
  //   }

  // @Get('check')
  // @UseGuards(AuthenticatedGuard)
  // public check(@ReqUser() user: Payload): Payload {
  //   return user;
  // }

  // /**
  //  * See test/e2e/jwt-auth.spec.ts
  //  */
  // // @UseGuards(LocalAuthGuard)
  // // @Post('jwt/login')
  // // public jwtLogin(@ReqUser() user: Payload): JwtSign {
  // //   return this.auth.jwtSign(user);
  // // }
}
