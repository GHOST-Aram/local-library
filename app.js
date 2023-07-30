import { accounts } from "./accounts/routes.js"
import { catalog } from "./catalog/routes.js"
import { app } from "./zghost/app/init.js"
import { config } from "./zghost/app/config.js"
import { render404 } from "./zghost/utils/http-response.js"

config()
app.use((req, res, next) =>{
	res.locals.user = req.user
	next()
})
app.all('/', (req, res) =>{
	res.redirect('/catalog')
})
app.use('/catalog', catalog)
app.use('/accounts', accounts)
app.use((req, res) =>{
	render404(res, '404', { title: 'Page not found.'})
})

export { app };
