import { put, del } from '@vercel/blob';
import { db } from './db';
import 'server-only';

/**
 * Upload a file to Vercel Blob storage
 */
export async function uploadFile(file: File, userId: string) {
  const blob = await put(file.name, file, {
    access: 'public', // Will be protected via signed URLs
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  // Store metadata in database
  const asset = await db.mediaAsset.create({
    data: {
      key: blob.pathname,
      url: blob.url,
      size: file.size,
      mimeType: file.type,
      createdBy: userId,
    },
  });

  return asset;
}

/**
 * Delete a file from storage
 */
export async function deleteFile(key: string, userId: string) {
  // Verify ownership
  const asset = await db.mediaAsset.findUnique({
    where: { key },
  });

  if (!asset || asset.createdBy !== userId) {
    throw new Error('Unauthorized: Cannot delete file you do not own');
  }

  // Delete from Blob storage
  await del(asset.url, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  // Delete from database
  await db.mediaAsset.delete({
    where: { key },
  });
}

/**
 * Generate a signed download URL for a product file (with entitlement check)
 */
export async function generateProductDownloadUrl(
  productId: string,
  userId: string
): Promise<string[]> {
  // Check entitlement
  const entitlement = await db.entitlement.findFirst({
    where: {
      userId,
      productId,
      active: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
  });

  if (!entitlement) {
    throw new Error('No entitlement for this product');
  }

  // Get product files
  const product = await db.product.findUnique({
    where: { id: productId },
    select: { files: true },
  });

  if (!product?.files) {
    return [];
  }

  // For now, return the file URLs directly
  // In production, you'd generate signed URLs that expire
  const files = product.files as { key: string; url: string }[];
  return files.map((f) => f.url);
}

/**
 * Get file metadata
 */
export async function getFileMetadata(key: string) {
  return db.mediaAsset.findUnique({
    where: { key },
  });
}
