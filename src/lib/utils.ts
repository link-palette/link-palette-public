import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (url: string) => {
  if(url.startsWith("/")) return url;
  if(url.startsWith("blob:")) return url;
  if(url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STORAGE_BUCKET_PATH}/${url}`;
}