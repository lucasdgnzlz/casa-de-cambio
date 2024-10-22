export async function obtenerData(moneda = "USD") {
  try {
    const respuesta = fetch(`https://api.frankfurter.app/latest?base=${moneda}`);
    const data = (await respuesta).json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
