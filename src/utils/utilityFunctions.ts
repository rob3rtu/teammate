import { supabase } from "./supabase";

export const capitalise = (v: string) =>
  v[0].toUpperCase() + v.slice(1).toLowerCase();

export const uploadAvatar = async (base64: string, filename: string) => {
  const base64Data = base64.split(",")[1];
  const contentType = base64.substring(5, base64.indexOf(";"));

  // Convert base64 to Uint8Array
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filename, byteArray, {
      contentType,
      upsert: true,
    });

  console.log("⚠️⚠️⚠️⚠️⚠️⚠️⚠️"); // should now run
  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(data.path);

  console.log("✅✅✅ ", publicUrlData);
  return publicUrlData.publicUrl;
};
