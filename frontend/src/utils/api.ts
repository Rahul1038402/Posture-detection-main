export const sendVideoForAnalysis = async (videoFile: File) => {
  const formData = new FormData();
  formData.append('video', videoFile);

  const res = await fetch('http://localhost:5000/analyze', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data.feedback || [];
};
