import mongoose from 'mongoose'

export async  function connect(uri) {
    await mongoose.connect(uri, {
        //& must add in order to not get any error masseges:
        useUnifiedTopology:true,
        useNewUrlParser: true 
    }).then(
        console.log("DB CONNECTED SUCCESS")
        
    ).catch(error => {
        console.log("DB CONNECTION FAILED ", error)
        process.exit(1)  
    })

    return true
  }
  
export async function disconnect() {
    await mongoose.disconnect()
  }