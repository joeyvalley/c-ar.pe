# Joseph Valle - SEI Noble - Unit 2 Project
### **App Title:** 
#### c-ar.pe

### **App Description:**
#### This project will build on my Unit 1 project, wherein I will build an API based off the Wikipedia API calls that I was using. I will create my database seed files by calling the Features Wikipedia API and parsing the JSON responses for the data that will be useful in my API, pulling this information out of the response and writing this information into JSON files for seeding. Users will be able to search the database based on multiple routes, post to the database via a single route, as well update and delete entries.

### **API's Used:** 
#### Wikipedia

### **Data Model:**

```javascript

const holidaySchema = new mongoose.Schema({
  title: String,
  links: [{
    title: String,
    link: String
  }]
})

const eventsSchema = new mongoose.Schema({
  title: String,
  year: Number,
  links: [{
    title: String,
    link: String
  }]
})

const deathSchema = new mongoose.Schema({
  name: String,
  year: Number,
  description: String,
  extract: String,
  link: String
})

const birthdaySchema = new mongoose.Schema({
  name: String,
  year: Number,
  description: String,
  extract: String,
  link: String
})

const selectionSchema = new mongoose.Schema({
  event: String,
  year: Number,
  links: [{
    title: String,
    link: String
  }]
})

const daySchema = new mongoose.Schema({
  date: String,
  selections: [selectionSchema],
  births: [birthdaySchema],
  deaths: [deathSchema],
  events: [eventsSchema],
  holidays: [holidaySchema],
  features: [featuresSchema]
})
```
### **Routing Table:**
| Route  |  HTTP Method | DB Action  | Description  |
|---|---|---|---|
| /api/birthdays  | GET  | INDEX  | Indexes all the births on the current day  |
| /api/birthdays/add  | POST | CREATE  | Create a birthday entry on the current day  |
| /api/birthdays/show/:year  | GET  | SHOW  | Show all birthdays on the current day in the selected year  |
| /api/birthdays/edit/:id  | PUT  | UPDATE  | Edit the birthday entry with the selected id |
| /api/birthdays/delete/:id  | DELETE  | DELETE  | Delete the birthday with the selected id |

### **MVP:** 
#### Build out a database for every day of the year that will include the days featured articles, most read articles, image of the day, events of the day, birthdays, notable deaths, and holidays. Create an REST file for GET, POST, PATCH, and DELETE requests for the birthdays route.

### **Post MVP:**
#### Learn how to configure a javascript file to be excecuted by the server on a set schedule. This will allow the database to stay up to date by automatically updating  on a daily basis. Build out a basic search interface that will allow the user to search the entire database.

### **Goals:**
#### **Tuesday**: Get project approval. Continue working on building out the database based on my existing code.
#### **Wednesday:** Develop an application that will create a seed file for every day of the year and seed the information to the database.
#### **Thursday:** Build out my router and controller files to handle the different routes that my API will employ.
#### **Friday:** Write api.rest file to test our routes and controllers.
#### **Saturday - Sunday:** Debugging, refining, documentation. Ensure that the application works flawlessly for all MVP requirements.
#### **Monday:** Begin to implement Post MVP goals.
