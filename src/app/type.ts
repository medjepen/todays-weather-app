export type City = {
    name: string;
    id: string;
};

export type WeatherAPIResponse = {
    forecasts: {
        date: string;
        telop: string;
        temperature: {
            min: { celsius: string | null };
            max: { celsius: string | null };
        };
        image: {
            title: string;
            url: string;
        };
    }[];
    location: {
        city: string;
    };
};
