import { Module } from '@nestjs/common';

import { BookService } from './book.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { BookSerializer } from './book.serializer';

@Module({
  imports: [
    ElasticsearchModule.register({
      Serializer: BookSerializer,
      cloud: {
        id: 'b16d6f7b161c4d2dbcb2169a886a2979:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGQ1Njc2NzkxYjliMDRiMDI5NjM5NTQ2ZmQ0MWE3ZTBkJGVlZDYxZTk0ZjEwODQwZDg5ZDMzZmY0YmE4ZjBlYzA3',
      },
      auth: {
        apiKey: 'amdNQVpvZ0JVTUZpb2VkamRpSHo6VmdlaDdlb3JUZ2VCemR1TTF6NjJldw==',
      },
    }),
  ],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
