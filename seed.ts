import mongoose from 'mongoose';
import { MemberSchema } from './src/members/schema/member.schema';

const Member = mongoose.model('Member', MemberSchema);

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/nest-members');

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log('MongoDB Connected');
    await Member.insertMany(
      [
        { name: 'Place', email: 'place@gmail.com', age: '31' },
        { name: 'Product', email: 'product@gmail.com', age: '31' },
        { name: 'likes', email: 'john@gmail.com', age: '31' },
        { name: 'Bad', email: 'john@gmail.com', age: '21' },
        { name: 'Wait', email: 'wait@gmail.com', age: '41' },
        { name: 'Kick', email: 'kick@gmail.com', age: '351' },
        { name: 'Image', email: 'img@gmail.com', age: '6' },
        { name: 'pop', email: 'pop@gmail.com', age: '71' },
        { name: 'Ppp', email: 'pp@gmail.com', age: '61' },
      ],
      { session },
    );

    await session.commitTransaction();
    console.log('Seeding complete');
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  } finally {
    await session.endSession();
    await mongoose.disconnect();
  }
}
seed();
