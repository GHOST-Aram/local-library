export const render = (res, template, context) =>{
    res.render(template, context)
}

export const redirect = (res, redirectUrl) =>{
    res.redirect(redirectUrl)
}

export const render404 = (res, template, context) =>{
    res.status(404).render(template, context)
}