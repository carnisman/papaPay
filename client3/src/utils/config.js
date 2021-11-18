exports.config = {
    BASE_URL: process.env.REACT_APP_BASE_URL || '',
    BASENAME: process.env.NODE_ENV == "development" ? "" : "/frontend/recetas",
    MICRONAME: "recetas",
    ENV: process.env.NODE_ENV,
}