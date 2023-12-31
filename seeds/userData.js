const { User } = require('../models');

const userSeeds = [
    {
        "name": "Hobo Johnson",
        "email": "hjohnson@gmail.com",
        "password": "password123"
    },
    {
        "name": "Hillary Duff",
        "email": "hduff@gmail.com",
        "password": "password1234"
    },
    {
        "name": "Lady Gaga",
        "email": "thefame@gmail.com",
        "password": "justdance123"
    },
    {
        "name": "Brad Pitt",
        "email": "pitty@gmail.com",
        "password": "password1"
    },
    {
        "name": "Shania Twain",
        "email": "stwain@gmail.com",
        "password": "password3"
    },
    {
        "name": "Lebron James",
        "email": "ljames@gmail.com",
        "password": "password22"
    }    
]

const seedUsers = async () => await User.bulkCreate(userSeeds);

module.exports = seedUsers;