const swagger = require( 'swagger-ui-express')
const YAML = require( 'yamljs')
const config = require( '#config')

const spec = YAML.load(config.openApiPath)

export default [swagger.serve, swagger.setup(spec)]
 