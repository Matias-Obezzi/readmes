const moment = require('moment')
require('moment/locale/es')

const get = async (route) => await fetch(route).then(res => res.json())

const getRateLimit = async () => await fetch("https://api.github.com/rate_limit").then(res => res.json())

const getFromRepo = async (path, queryParams = {}) => {
    return await getRateLimit().then(rateLimit => {
        
        if(rateLimit.rate.remaining === 0)
            throw new Error(`Superaste la cantidad de request que podes hacer.\nIntenta de nuevo ${moment(rateLimit.rate.reset * 1000).fromNow().toString()}`)
        
        let params = ""
        for(let param in queryParams){
            params += `&${param}=${queryParams[param]}`
        }

        return get(`https://api.github.com/repos/Matias-Obezzi/readmes/${path}?ref=readmes${params}`)
    })
}

export const getReadmes = async () => {
    return await getFromRepo("contents")
}

export const getReadme = async (dirName) => {
    if(!dirName)
        throw new Error("Se necesita el nombre de la carpete")
    return await fetch(`https://raw.githubusercontent.com/Matias-Obezzi/readmes/readmes/${dirName}/readme.md`)
}

export const getMediaLink = (dirName, mediaName) => {
    if(!mediaName.startsWith("."))
        return mediaName
    let validExtension = ['jpg', 'png', 'gif', 'pdf'];
    if(!dirName)
        throw new Error("Se necesita el nombre de la carpeta")
    if(!mediaName)
        throw new Error("Se necesita un nombre para el archivo")
    if(!validExtension.includes(mediaName.split(".").slice(-1)[0]))
        throw new Error("Asegurate de pasar el nombre del archivo incluyendo la extension")
    return `https://raw.githubusercontent.com/Matias-Obezzi/readmes/readmes/${dirName}/${mediaName}`
}

export const getUrlLink = (dirName, link) => {
    if(!link.startsWith("."))
        return link
    if(!dirName)
        throw new Error("Se necesita el nombre de la carpeta")
    if(!link)
        throw new Error("Se necesita un nombre para el archivo")
    return `/r/${dirName}/${link}`
}