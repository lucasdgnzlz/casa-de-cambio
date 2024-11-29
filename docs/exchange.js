export async function obtenerData(moneda = "USD") {
  try {
    const respuesta = fetch(`https://v6.exchangerate-api.com/v6/3af9c7aff1ef1988e4d9563c/latest/${moneda}`);
    const data = (await respuesta).json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
