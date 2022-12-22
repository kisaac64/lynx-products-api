import Ajv from 'ajv/dist/2020'
import addFormats from 'ajv-formats'
import ajvKeywords from 'ajv-keywords'

/**
 * AjvClient initialized and exported with default configuration.
 * Client used for validation all schemas throughout the application.
 */
export const ajvClient = new Ajv({
    allErrors: true,
    strict: 'log',
    logger: false,
    coerceTypes: true,
    useDefaults: true
})

/** Adding support for additional formats using `ajv-formats` */
addFormats(ajvClient)

/** Adding support for additional keywords using `ajv-keywords` */
ajvKeywords(ajvClient)
