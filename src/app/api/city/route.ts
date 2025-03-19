import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://weather.tsukumijima.net/primary_area.xml");
        if (!res.ok) {
            throw new Error("Failed to fetch City ID data.");
        }
        const xmlData = await res.text();
        return new Response(xmlData, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch {
        return NextResponse.json({
            error: "Request failed to get City ID data."
        }, { 
            status: 500
        });
    }
}