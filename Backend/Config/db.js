const {connect, ModifiedPathsSnapshot} = require('mongoose')

const connectToDb = async(url) =>{
    try {
        await connect(url)
        console.log('Connected to database')
    } catch (error) {
        console.log('Error in Connecting to Database')
    }
}

module.exports = connectToDb