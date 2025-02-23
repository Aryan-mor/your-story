import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  try {
    const { image, video, scope } = await request.json();
    console.log('lasfklkasf', { image: !!image, video: !!video });

    const result = await cloudinary.uploader.upload(image ?? video, {
      folder: scope ?? 'general',
      resource_type: image ? 'image' : 'video',
    });
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 },
    );
  }
}
