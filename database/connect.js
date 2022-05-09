import mongoose from "mongoose";

const conncetDb = (url)=>{
return mongoose.connect(url)
}
export default conncetDb