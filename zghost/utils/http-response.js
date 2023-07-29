export const render = (res, template, context) =>{
    res.render(template, context)
}

export const redirect = (res, redirectUrl) =>{
    res.redirect(redirectUrl)
}