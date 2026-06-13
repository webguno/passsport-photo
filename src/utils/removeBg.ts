// WARNING: Calling the remove.bg API from the client side exposes your API key to users.
// Since a client-only architecture was requested, we are accessing it via import.meta.env
// or the provided fallback. For production, it is highly recommended to proxy this request 
// through a secure backend server.

export async function removeBackground(imageBase64: string): Promise<string> {
  // Use the env var if available, otherwise fallback to the user-provided key.
  const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY || 'sdav2kn5VCS4zhZRkDzHiBT7';
  
  // Extract base64 part if it contains data URL scheme
  const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
  
  const formData = new FormData();
  formData.append('image_file_b64', base64Data);
  formData.append('size', 'auto');
  
  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
       'X-Api-Key': apiKey,
    },
    body: formData,
  });
  
  if (!response.ok) {
     const errorText = await response.text();
     throw new Error(`Remove.bg API error: ${response.status} - ${errorText}`);
  }
  
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onloadend = () => resolve(reader.result as string);
     reader.onerror = reject;
     reader.readAsDataURL(blob);
  });
}
