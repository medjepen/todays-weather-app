import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({
            error: "ID is required."
        }, {
            status: 400
        });
    }

    try {
        const apiUrl = `https://weather.tsukumijima.net/api/forecast/city/${id}`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
            throw new Error(`Weather APi responded with ${res.status}`);
        }
        const weatherForecast = await res.json();
        return NextResponse.json(weatherForecast, { status: 200 });
    } catch {
        return NextResponse.json({
            error: "Request failed to get Weather Forecast."
        }, { 
            status: 500
        });
    }
}