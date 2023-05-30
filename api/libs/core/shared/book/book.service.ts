import { HttpException, Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import {
  CreateBookReponseDto,
  CreateBookRequestDto,
  GetBooksReponseDto,
  UpdateBookRequestDto,
} from 'lib/common/dtos';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class BookService {
  constructor(private elasticService: ElasticsearchService) {}
  public async getAllBooks() {
    return await this.elasticService.search({
      index: 'books',
    });
  }

  public async getBookById(id: string) {
    try {
      return await this.elasticService.get({
        index: 'books',
        id: id,
      });
    } catch (e) {
      if (e.body.found == false) {
        throw new HttpException('Book not found', 400);
      }
    }
  }

  public async createBook(newBook: CreateBookRequestDto): Promise<string> {
    const exists = await this.elasticService.exists({
      index: 'books',
      id: newBook.id,
    });
    if (exists) return 'existed';

    const { result } = await this.elasticService.index({
      index: 'books',
      id: newBook.id,
      document: newBook,
    });
    return result;
  }

  public async updateBook(
    id: string,
    newBook: UpdateBookRequestDto,
  ): Promise<string> {
    const exists = await this.elasticService.exists({
      index: 'books',
      id: id,
    });
    if (!exists) return 'not existed';
    const { result } = await this.elasticService.update({
      index: 'books',
      id: id,
      doc: newBook,
    });
    return result;
  }
}
