import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /.(png|jpg|jepg)$/ }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1000 }),
        ],
        exceptionFactory: () => {
          return new BadRequestException('Invalid Format', {
            cause: [
              {
                property: 'file',
                constraints: {
                  message:
                    'Uploaded file can only be PNG or JPEG and must be less than 1MB',
                },
              },
            ],
          });
        },
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      filename: file.filename,
    };
  }
}
