import { Injectable } from '@nestjs/common';
import { CloudinaryResponse } from './upload.interface';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
@Injectable()
export class UploadService {
  constructor() {}

  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
