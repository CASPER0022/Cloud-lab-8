const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://heyitsmealbinjohn_db_user:nrEkiLyIyAtNIxiR@cluster0.vlot00i.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('btech');
    const stories = database.collection('success_stories');

    console.log("Connected to MongoDB!");

    // CREATE: Insert success stories
    console.log("\n Creating success stories...");
    const insertResult = await stories.insertMany([
      {
        name: "Raj Kumar",
        batch: 2020,
        company: "Google",
        position: "Software Engineer",
        salary: 15000000,
        success_story: "Started as intern, got converted to full-time"
      },
      {
        name: "Priya Singh",
        batch: 2019,
        company: "Microsoft",
        position: "Cloud Architect",
        salary: 18000000,
        success_story: "Built microservices at scale"
      },
      {
        name: "Amit Patel",
        batch: 2021,
        company: "Amazon",
        position: "Data Engineer",
        salary: 14000000,
        success_story: "Optimized ML pipelines"
      }
    ]);
    console.log(`Inserted ${insertResult.insertedCount} stories`);

    // READ: Find all records
    console.log("\n All success stories:");
    const allStories = await stories.find().toArray();
    allStories.forEach(story => {
      console.log(`- ${story.name} (${story.batch}) at ${story.company}`);
    });

    // READ: Find specific record
    console.log("\n Find story by name:");
    const rajStory = await stories.findOne({ name: "Raj Kumar" });
    console.log(rajStory);

    // UPDATE: Update a record
    console.log("\n Updating Raj's salary...");
    const updateResult = await stories.updateOne(
      { name: "Raj Kumar" },
      { $set: { salary: 20000000 } }
    );
    console.log(`Updated ${updateResult.modifiedCount} record`);

    // DELETE: Delete a record
    console.log("\n Deleting Amit's record...");
    const deleteResult = await stories.deleteOne({ name: "Amit Patel" });
    console.log(`Deleted ${deleteResult.deletedCount} record`);

    // Final count
    console.log("\n Total records remaining:");
    const count = await stories.countDocuments();
    console.log(`${count} stories in database`);

  } finally {
    await client.close();
  }
}

run();