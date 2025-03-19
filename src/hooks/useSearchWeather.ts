import { WeatherAPIResponse } from "@/app/type";
import { useState } from "react";

const useSearchWeather = () => {
    const [weather, setWeather] = useState<WeatherAPIResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherForecast = async (id: string) => {
        if (!id) return;
        console.log(`${id} が読み込まれました`);

        try {
            setLoading(true);
            const url = `/api/weather?id=${encodeURIComponent(id)}`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`天気情報の取得に失敗しました. ${res.status}`);
            }
            const data = (await res.json()) as WeatherAPIResponse; // 型アサーション
            setWeather(data);
            // console.log("response data:", JSON.stringify(data, null, 2));
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    }
    return { weather, fetchWeatherForecast, loading, error };
};

export default useSearchWeather;