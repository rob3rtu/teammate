import { ImagePickerAsset } from "expo-image-picker";
import { supabase } from "./supabase";
import { Buffer } from "buffer";

export const capitalise = (v: string) =>
  v[0].toUpperCase() + v.slice(1).toLowerCase();

export const uploadAvatar = async (
  avatar: ImagePickerAsset | undefined,
  id: string
) => {
  if (!avatar || !avatar.base64) return "";

  const fileUri = avatar.uri;
  const fileExt = fileUri.substring(fileUri.lastIndexOf(".") + 1);
  const fileName = `${id}.${fileExt}`;
  const contentType = avatar.mimeType || `image/${fileExt}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, Buffer.from(avatar.base64, "base64"), {
      contentType,
      upsert: true,
    });

  if (error) throw error;

  return data?.path ?? "";
};
