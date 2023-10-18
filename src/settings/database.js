import { connect } from 'mongoose';

export const connectDB = async (uri) => {
  try {
    const db = await connect(uri, {
      dbName: 'fome-mc'
    });
    console.log(`Connected to ${db.connection.name} database`);
  } catch (error) {
    console.log(error);
  }
};
