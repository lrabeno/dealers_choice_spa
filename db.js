const Sequelize = require('sequelize');


const { STRING, UUID, UUIDV4 } = Sequelize; 

const db = new Sequelize(process.env.DATABASE_URL || 
    'superheroes', 
    'postgres', 
    'Ny1knicks23', {
    host: 'localhost',
    dialect: 'postgres'
  });

  const Hero = db.define('hero', {
      name: {
          type: STRING
      },
      team: {
          type: STRING
      },
      power: {
          type: STRING
      }
  })

  Hero.findAvenger = function() {
      return this.findAll({
          where: {
              name: 'Captain America'
          },
          include: {
              model: Hero,
              as: 'ledby'
          }
      })
  }
  
  Hero.findXmen = function() {
    return this.findAll({
        where: {
            name: 'Cyclops'
        },
        include: {
            model: Hero,
            as: 'ledby'
        }
    })
}

Hero.findJustice = function() {
    return this.findAll({
        where: {
            name: 'Wonder Woman'
        },
        include: {
            model: Hero,
            as: 'ledby'
        }
    })
}

  Hero.belongsTo(Hero, { as: 'leader'})
  Hero.hasMany(Hero, {as: 'ledby', foreignKey: 'leaderId'})
  const syncAndSeed = async () => {
      
      await db.sync({force: true});
      
      const [batMan, wolverine, phoenix, spiderMan, wonderWoman, capMarvel, capAmerica, ironMan,
        cyclops, superMan, blackWidow] = await Promise.all([
      Hero.create({name: 'Batman', team: 'Justice League', power: 'none'}),
      Hero.create({name: 'Wolverine', team: 'X-men', power: 'Claws'}),
      Hero.create({name: 'Phoenix', team: 'X-men', power: 'Telepathy'}),
      Hero.create({name: 'Spider-man', team: 'Avengers', power: 'Spider powers'}),
      Hero.create({name: 'Wonder Woman', team: 'Justice League', power: 'Super strength'}),
      Hero.create({name: 'Captain Marvel', team: 'Avengers', power: 'Super strength'}),
      Hero.create({name: 'Captain America', team: 'Avengers', power: 'Super soldier'}),
      Hero.create({name: 'Iron-man', team: 'Avengers', power: 'billionaire'}),
      Hero.create({name: 'Cyclops', team: 'X-men', power: 'Laser Eyes'}),
      Hero.create({name: 'Superman', team: 'Justice League', power: 'Super Strength'}),
      Hero.create({name: 'Black Widow', team: 'Avengers', power: 'none'}),
      ])

      batMan.leaderId = wonderWoman.id;
      wolverine.leaderId = cyclops.id;
      phoenix.leaderId = cyclops.id;
      spiderMan.leaderId = capAmerica.id;
      capMarvel.leaderId = capAmerica.id;
      ironMan.leaderId = capAmerica.id;
      superMan.leaderId = wonderWoman.id;
      blackWidow.leaderId = capAmerica.id;

      await Promise.all([batMan.save(), wolverine.save(), phoenix.save(), 
        spiderMan.save(), capMarvel.save(), ironMan.save(), superMan.save(), blackWidow.save()])  
  }
  
  module.exports = {
      syncAndSeed,
      db,
      Hero
  }