const data = {
  name: "Fernando",
  avatar: "https://avatars.githubusercontent.com/u/44985596?v=4",
  //Caso o nome da propriedade esteja separado por '-' ou '.', deve-se encapsular o nome com ""
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 4,
  "vacation-per-year": 4,
  "value-hour": 60,
};

module.exports = {
    get() {
        return data
    }
}