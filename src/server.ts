import { app, init } from './app'

/** Reads and stored port number from environment with 3000 as default. */
const PORT = process.env.PORT || 3000

/** Starts app on specified port and bootstraps the application using init. */
app.listen(PORT, () => { init() })
