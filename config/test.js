/**
 * Created by dcreey on 6/6/2016.
 */

module.exports = {
    db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/myapp-dev',
    debug: true,
    logging: {
        format: 'common'
    },
    port:'3001',
    hostname: 'http://localhost:3001',
    app: {
        name: 'MyApp'
    }
}