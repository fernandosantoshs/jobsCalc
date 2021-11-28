const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
        progress: 0,
        done: 0,
        total: jobs.length
    }

    let jobTotalHours = 0
    
    // a funcao .map() passará item por item no array (job) 
    const updatedJobs = jobs.map((job) => {
      // Ajustes nos jobs
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      // Passando o 'status' por referência para o objeto statusCount, é somado á propriedade dele que seja igual à referência. Seria como: statusCouns["done"] +=1 || statusCount["progress"] += 1
      statusCount[status] += 1

      // Somando qntde horas de jobs 'in progress'
      jobTotalHours = status == "progress" ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours
      
      /*if (status == "progress") {
        jobTotalHours += Number(job["daily-hours"])
      }*/

      // Espalhamento de objeto no JS
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    // Horas de trabalho/dia[profile] - Horas/dia de cada projeto 'in progress'
    const freeHours = profile["hours-per-day"] - jobTotalHours

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
  },
};
