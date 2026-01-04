import app from "./app";

let server;
const port = process.env.PORT || 3000;
const bootstrap = async () => {
    try {
        server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

bootstrap();
