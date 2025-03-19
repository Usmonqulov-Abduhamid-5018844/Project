import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

const uploadDir = path.join(__dirname, "..", "Upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

@ApiTags('upload')
@Controller("upload")
export class AppController {
  constructor() {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${Math.floor(Math.random() * 450000)}${path.extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @ApiOperation({ summary: "Upload a file" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'No file uploaded' })
  uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    return { file: file.filename };
  }
}
