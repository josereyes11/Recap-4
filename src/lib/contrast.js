export async function fetchContrast(fcolor, bcolor) {
  const response = await fetch(
    `https://webaim.org/resources/contrastchecker/?fcolor=${encodeURIComponent(fcolor)}&bcolor=${encodeURIComponent(bcolor)}&api=`,
  );

  return response.json();
}
