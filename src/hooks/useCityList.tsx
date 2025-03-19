import { useState, useEffect } from "react";
import { City } from "../app/type";


const STORAGE_KEY = "cityList";
const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7days

const useCityList = () => {
    const [cityList, setCityList] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 調べたい地域のIDを取得する
    useEffect(() => {
        const fetchCityID = async() => {
            try {
                // localStorageからデータ取得
                const storedData = localStorage.getItem(STORAGE_KEY);
                const storedTimestamp = localStorage.getItem(`${STORAGE_KEY}_timestamp`);

                if (storedData && storedTimestamp) {
                    const parsedData: City[] = JSON.parse(storedData);
                    const lastFetched = parseInt(storedTimestamp, 10);

                    if (Date.now() - lastFetched < EXPIRATION_TIME) { 
                        setCityList(parsedData);
                        setLoading(false);

                        console.log("localStorageから読み出しました");
                        return;
                    }
                }

                // データがない or 古いときはAPIからデータ取得
                const res = await fetch("/api/city");
                if (!res.ok) {
                    throw new Error("IDの取得に失敗しました");
                }
                const text = await res.text();
                // parseして地名IDを取得
                const parser = new DOMParser();
                const cityTags = parser.parseFromString(text, "application/xml").querySelectorAll("city");
                const data: City[] = [];
    
                cityTags.forEach((tag) => {
                    const name = tag.getAttribute("title");
                    const id = tag.getAttribute("id");
                    if (name && id) {
                        data.push({ name, id });
                    }
                });
                
                setCityList(data);

                // localStorageに格納
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                localStorage.setItem(`${STORAGE_KEY}_timestamp`, Date.now().toString());
                console.log("localStorageに保存しました");

            } catch (e) {
                setError(`Failed to fetch city list: ${e}` );
            } finally {
                setLoading(false);
            }
        };
        // 地域IDを使って天気予報をリクエスト
        fetchCityID();
    }, []);

    return { cityList, loading, error };
};

export default useCityList;