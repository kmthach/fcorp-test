import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable()
export class ExceptionMappingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const { message } = Object.assign({ message: null }, err, err.response);
        err.response = {
          statusCode: err.status,
          data: null,
          errors: [err.name],
          message: message,
        };
        return throwError(() => err);
      }),
    );
  }
}
