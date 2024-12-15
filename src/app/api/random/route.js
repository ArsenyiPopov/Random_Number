let currentNumber = Math.floor(Math.random() * 100); // Изначальное случайное число

export async function GET() {
  return new Response(JSON.stringify({ number: currentNumber }), {
    headers: { "Content-Type": "application/json" },
  });
}

// Генерация нового числа каждые 5 секунд
setInterval(() => {
  currentNumber = Math.floor(Math.random() * 100);
}, 5000);
