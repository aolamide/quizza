import Quiz from '../models/quiz';
import User from '../models/user';

const getStats = async (req, res) => {
  try {
    const userCount = await User.find().countDocuments();
    const aggregate = [
      { $group : { _id : null, quizzes : { $sum : 1 }, timesTaken : { $sum : { $size : '$takenBy'}}} },
      { $project : {
        _id : 0,
        quizzes : 1,
        timesTaken : 1
      }}
    ];
    const data = await Quiz.aggregate(aggregate);
    let stats = data[0];
    stats.users = userCount; 
    return res.json({
      stats
    })
  } catch (error) {
    return res.status(500).json({ error : 'Error occured' })
  }
}

export { getStats };