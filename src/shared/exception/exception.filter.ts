import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  ValidationError,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    let validationErrors: Record<string, string>;
    if (Array.isArray(exception.cause)) {
      validationErrors = {};
      const errors = exception.cause as ValidationError[];
      errors.forEach((error) => {
        validationErrors[error.property] = Object.values(error.constraints)[0];
      });
    }

    response.status(status).json({
      status,
      timeStamp: Date.now(),
      path: request.url,
      message: exception.message,
      validationErrors,
    });
  }
}
