const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
      //Quando o objeto tem mesmo nome para propriedade e valor (profile), pode-se resumir { profile : profile } para { profile }
      return res.render("profile", { profile: Profile.get() });
    },

    update(req, res) {
      // req.body para trazer os dados
      const data = req.body;
      // semanas por ano
      const weeksPerYear = 52;
      // remover as semana de férias do profile pra ter a média de semanas trabalhadas/mes
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
      // Total de horas trabalhadas na semana
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
      // Horas trabalhadas no mes
      const monthlyTotalHours = weekTotalHours * weeksPerMonth;
      // Valor da hora
      const valueHour = data["monthly-budget"] / monthlyTotalHours;

      // Joga o data que veio do req.body para o data do obj Profile
      Profile.update({
        ...Profile.get(),
        ...req.body,
        "value-hour": valueHour
      }) 
      
      return res.redirect("profile");
    },
  }