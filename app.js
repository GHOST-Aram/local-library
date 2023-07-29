import { accounts } from "./accounts/routes.js"
import { catalog } from "./catalog/routes.js"
import { app } from "./zghost/app/init.js"
import { config } from "./zghost/app/config.js"

config()
app.all('/', (req, res) =>{
	res.redirect('/catalog')
})
app.use('/catalog', catalog)
app.use('/accounts', accounts)

export { app };
