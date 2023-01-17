import { cloudinaryImage } from '@keystone-next/cloudinary';
import { text, select, integer } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'sick-fits'
};

export const ProductImage = list({
  // access
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'source'
    }),
    altText: text()
  }
});
