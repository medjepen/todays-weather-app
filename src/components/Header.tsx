import { AppBar, Toolbar, Typography } from "@mui/material";

const HeaderWeather = () => {
    return (
        <>
            <AppBar sx={{ 
                position: "fixed", 
                top: 0, zIndex: 1, 
                bgcolor: "#5c946e", 
                color: "#efe"
                }}>
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{ flexGrow: 1 }}
                        >Today&apos;s Weather
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
};
export default HeaderWeather;