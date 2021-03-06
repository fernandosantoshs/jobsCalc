const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()
    
    //O metodo get() para trazer do banco de dados traz apenas um dado, ou seja, neste caso que só tem um perfil para receber pode ser usado, mas no Jobs não.
    const data = await db.get(`SELECT * FROM profile`)

    await db.close()

    return {
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "days-per-week": data.days_per_week,
      "hours-per-day": data.hours_per_day,
      "vacation-per-year": data.vacation_per_year,
      "value-hour": data.value_hour
    };
  },

  async update(newData) {
    const db = await Database()

    db.run(`UPDATE profile SET 
    name = "${newData.name}",
    avatar = "${newData.avatar}",
    monthly_budget = ${newData["monthly-budget"]},
    days_per_week = ${newData["days-per-week"]},
    hours_per_day = ${newData["hours-per-day"]},
    vacation_per_year = ${newData["vacation-per-year"]},
    value_hour = ${newData["value-hour"]}
    WHERE id=${newData.id}`)

    await db.close()
  }
};
