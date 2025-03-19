"use client"; // client componentとして動作
import { Autocomplete, AutocompleteChangeReason, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useCityList from "@/hooks/useCityList";
import HeaderWeather from "@/components/Header";
import useSearchWeather from "@/hooks/useSearchWeather";
import { City } from "./type";

function App() {
    const { cityList, loading: isCityListLoading, error: isCityListError } = useCityList(); // {name: string, id: string}[]

    // 地名検索
    const [searchCity, setSearchCity] = useState<string | "" >("");
    const { weather, fetchWeatherForecast, loading: isWeatherLoading, error: isWeatherError } = useSearchWeather();

    const handleChange = (
        event: React.SyntheticEvent, 
        value: City | null, 
        reason: string,
    ) => {
        if (!value) {
            throw new Error("値をしゅとくできませんでした");
        }
        setSearchCity(value.name);
    };
    const handleSearchCity = () => {
        const target = cityList.find((city) => city.name === searchCity);
        if (!target) {
            console.error("該当する都市が見つかりませんでした");
            return;
        }
        fetchWeatherForecast(target.id); 
    };
    return (
        <>  
            <HeaderWeather />
            <Box sx={{ paddingTop: "70px", marginX: 1 }}>
                {isCityListLoading && 
                    <Typography variant="inherit">
                        Data Loading...
                    </Typography>
                }{isCityListError && 
                    <Typography variant="subtitle1">
                        {isCityListError}
                    </Typography>
                }
                <Stack direction="row">
                    <Autocomplete
                        options={cityList}
                        noOptionsText="該当する地名がありません"
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        onChange={handleChange}
                        renderInput={(params) => 
                            <TextField {...params} label="地名を入力" margin="normal" />}
                    />
                    <Button
                        variant="outlined"
                        size="medium"
                        sx={{ margin: 1 }}
                        onClick={handleSearchCity}
                    >今日の天気は？
                    </Button>
                </Stack>
                {/* loading */}
                {isWeatherLoading && 
                    <Typography variant="inherit">
                        天気予報を取得中...
                    </Typography>
                }{isWeatherError && 
                    <Typography variant="inherit">
                        {isWeatherError}
                    </Typography>
                }{weather && (
                    // 天気予報を横並びで表示
                    <Stack 
                        direction="row" 
                        spacing={2} 
                        sx={{ overflowX: "auto", padding: 1 }}
                    >{weather.forecasts.map((day, index) => {
                        const whatDay = new Date(day.date);
                        const whatDayNumber = ["日", "月", "火", "水", "木", "金", "土"];
                        const dayOfWeek = whatDayNumber[whatDay.getDay()];
                        
                        return (
                            <Card key={index} sx={{ maxWidth: 250, minWidth: 200, marginTop: 1, padding: 1 }} >
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Typography variant="subtitle1">
                                        {weather.location?.city || "Unknown"}の天気
                                    </Typography>
                                    
                                    <Typography variant="body1">{day.date}({dayOfWeek})</Typography>
                                    <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                                        <img src={day.image.url} alt="天気アイコン" width={50} />
                                        <Stack>
                                            <Typography variant="caption">最高: {day.temperature.max.celsius}</Typography>
                                            <Typography variant="caption">最低: {day.temperature.min.celsius}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Typography variant="body1">{day.telop}</Typography>  
                                </CardContent>
                            </Card>
                        );
                    })}
                    </Stack>
                )}
            </Box>
        </>
    );
};
export default App;