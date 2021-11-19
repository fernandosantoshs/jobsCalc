const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController")

//const views = __dirname + "/views/"; Refatoração setada o views em server.js
// O EJS já entende por padrão a pasta views, porém como ela está dentro da pasta 'src', preciso colocar este path

// Object Literal : Ao criar um objeto, já terá sua propriedades definidas na escrita do codigo.
const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 60,
      createAt: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      createAt: Date.now(),
    },
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        // Ajustes nos jobs
        const remaining = Job.services.remainingDays(job);

        const status = remaining <= 0 ? "done" : "progress";

        // Espalhamento de objeto no JS
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"]) ,
        };
      });

      return res.render("index", { jobs: updatedJobs });
    },

    create(req, res) {
      return res.render("job");
    },

    save(req, res) {
      // Em JS, o símbolo "?" no fim de uma atribuicao, é um opcional 'Logical Chaining operator'. Se o valor da primeira opção (antes do '?'), for falso, será atribuído o segundo valor que foi passado. Neste caso, o jobId será o length de jobs -1 (Assim tenho o índice no array que começa com 0), mas caso nao exista item no array, receberá '1' no push().
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createAt: Date.now(),
      });

      return res.redirect("/");
    },

    show(req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      
      if (!job) {
        return res.send('Job not found! :(')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])
      
      return res.render("job-edit", { job })      
    },

    update(req, res) {  
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      
      if (!job) {
        return res.send('Job not found! :(')
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
      }

      Job.data = Job.data.map(job => {

        if(Number(job.id) === Number(jobId)) {
          job = updatedJob
        }

        return job
      })

      res.redirect('/job/' + jobId)
    },

    delete(req,res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')
    }
  },

  services: {
    remainingDays(job) {
      // Remaining days
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(); // toFixed() funcao do JS, arredonda um number para o numero de casas decimais que passar por parametro -> 12.1.toFixed() = "12" // 12.5.toFixed() = 13. Ao passar por essa funcao, o resultado é uma string.

      // Data de cricao do projeto
      const createdDate = new Date(job.createAt);

      // o .getDate() retorna o dia do mes (1 a 31). O getDay() retorna o dia da semana (0 a 6). Entao dueDay será o dia do mes que foi criado o project e somado aos dias restantes
      const dueDay = createdDate.getDate() + Number(remainingDays);

      // setDate() apenas muda o dia do mes da variavel de acordo com o parametro. Por ex: Date.setDate(1), se esse Date foi criado em 26 de Outubro, o metodo vai mudar o dia desta data para dia 01/10, o retorno é em milisegundos (desde 1 jan 1970).
      const dueDateInMs = createdDate.setDate(dueDay);

      const timeDiffInMs = dueDateInMs - Date.now();

      //transformar ms em dias
      const daysInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiffInMs / daysInMs); // Math.floor vai arredondar o número de dias para baixo.

      return dayDiff;
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  },
};

// *Request / Response* //
routes.get("/", Job.controllers.index);
routes.get("/job", Job.controllers.create);
routes.post("/job", Job.controllers.save);
routes.get("/job/:id", Job.controllers.show);
routes.post("/job/:id", Job.controllers.update);
routes.post("/job/delete/:id", Job.controllers.delete);
// Para renderizar o objeto 'profile', é preciso passá-lo como segundo parametro
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;
