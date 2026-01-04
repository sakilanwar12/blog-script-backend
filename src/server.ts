import app from "./app";
import connectDB from "./lib/conectDB";

let server;
const port = process.env.PORT || 3000;
const bootstrap = async () => {

    try {
        await connectDB();
        server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

bootstrap();
