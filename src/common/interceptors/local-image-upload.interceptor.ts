import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { localDiskStorageOptions } from "../config/local-storage.config";

export function UseLocalImageUpload(fieldName: string, destinationFolder: string) {
    return applyDecorators(
        UseInterceptors(
            FileInterceptor(fieldName, localDiskStorageOptions(destinationFolder))
        ),
    );
}