import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as controllers from './controllers';
import { configuration } from 'libs/common/config';
import { AuthModule } from 'libs/core/auth';
import { BookModule } from 'lib/core/shared/book/book.module';
import { BookController } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // AuthModule,
    BookModule,
  ],
  controllers: [BookController], //Object.values(controllers),
  providers: [],
})
export class AppModule {}
