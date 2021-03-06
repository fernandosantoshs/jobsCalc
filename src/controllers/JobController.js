const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require('../model/Profile')

module.exports = {  
  create(req, res) {
    return res.render("job");
  },

  async save(req, res) {
    // Em JS, o símbolo "?" no fim de uma atribuicao, é um opcional 'Logical Chaining operator'(Encadeamento). Se o valor da primeira opção (antes do '?'), for falso, será atribuído o segundo valor que foi passado. Neste caso, o jobId será o length de jobs -1 (Assim tenho o índice no array que começa com 0), mas caso nao exista item no array, receberá '1' no push().
    //const lastId = jobs[jobs.length - 1]?.id || 0;

    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(),
    })

    return res.redirect("/");
  },

  async show(req, res) {
    const jobId = req.params.id;
    const jobs = await Job.get()

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job not found! :(");
    }

    const profile = await Profile.get()

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const jobId = req.params.id;
    
    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    await Job.update(updatedJob, jobId)

    res.redirect("/job/" + jobId);
  },

  async delete(req, res) {
    const jobId = req.params.id;
    
    await Job.delete(jobId)
    
    /* Refatorando : Como o responsavel pelos dados é o model, deve-se passar para ele as responsabilidade dos dados enviando o parametro para delete.* 
    const jobs = Job.get()
    Job.data = jobs.filter((job) => Number(job.id) !== Number(jobId));*/

    return res.redirect("/");
  },
};
