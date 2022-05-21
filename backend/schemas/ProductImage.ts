import { cloudinaryImage } from '@keystone-next/cloudinary';
import { text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import 'dotenv/config';

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_KEY,
        apiSecret: process.env.CLOUDINARY_SECRET,
        folder: 'sickfits'
      },
      label: 'Source'
    }),
    description: text()
  }
});
