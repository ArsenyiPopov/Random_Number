"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession(); // Данные о сессии
  const [randomNumber, setRandomNumber] = useState(null); // Случайное число

  useEffect(() => {
    // Если пользователь авторизован, получаем данные с сервера
    if (session) {
      const fetchNumber = async () => {
        const response = await fetch("/api/random");
        const data = await response.json();
        setRandomNumber(data.number);
      };

      fetchNumber();

      // Обновляем число каждые 5 секунд
      const interval = setInterval(fetchNumber, 5000);

      return () => clearInterval(interval); // Убираем интервал при размонтировании
    }
  }, [session]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {session ? (
        <div className="text-center">
          <p className="text-2xl font-semibold mb-4">
            Welcome, <span className="text-gray-800">{session.user.name}</span>!
          </p>
          <p className="text-6xl font-bold text-blue-600">
            {randomNumber !== null ? randomNumber : "Loading..."}
          </p>
          <button
            className="bg-gray-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-800 transition-all mt-8"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Случайные числа</h1>
        
        <button
          className="bg-gray-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-800 transition-all mt-4"
          onClick={() => signIn("github")}
        >
          Войти через GitHub
        </button>
      </div>
      )}
    </main>
  );
}
