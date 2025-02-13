const express = require('express')
const app = express()
const PORT = 8080

app.get('/ping', (req,res)=>{
    try {
        res.status(200).send('This is Home Route')
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})