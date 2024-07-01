import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/cms')
    .then(() => { console.log('Database connected!') })
    .catch(err => { console.log('Error while connecting: ', err) });

export default mongoose.connection;