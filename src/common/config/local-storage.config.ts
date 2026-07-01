import { diskStorage } from 'multer';
import { extname } from 'path';

export const localDiskStorageOptions = (destinationFolder: string) => {
    return {
        storage: diskStorage({
            destination: `./uploads/${destinationFolder}`,
            filename: (_req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExt = extname(file.originalname);
                callback(null, `${file.fieldname || "file"}-${uniqueSuffix}${fileExt}`);
            },
        }),
    };
};