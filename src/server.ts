import { app, init } from './app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    init()
})
