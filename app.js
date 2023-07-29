import { catalog } from "./catalog/routes.js"
import { app } from "./zghost/app/init.js"

config()
app.all('/', (req, res) =>{
	res.redirect('/catalog')
})
app.use('/catalog', catalog)

export { app };
