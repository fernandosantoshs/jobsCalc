const Database = require("../db/config");

module.exports = {
  async get() {
    const db = await Database();

    // Diferente do db.get() que só traz um dado, o db.all() traz todos os dados que satisfazem a query.
    const jobs = await db.all(`SELECT * FROM jobs`);

    await db.close();
    //Em uma arrow function sem estrutura de função (apenas retornando um objeto), não é necessário usar outro return nem {}. Ao invés disso, basta colocar parênteses envolvendo os colchetes do objeto retorno.
    return jobs.map((job) => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      created_at: job.created_at,
    }));
  },

  async update(updatedJob, jobId) {
    const db = await Database()

    db.run(`UPDATE jobs SET 
    name = "${updatedJob.name}",
    daily_hours = ${updatedJob["daily-hours"]},
    total_hours = ${updatedJob["total-hours"]}
    WHERE id = ${jobId}
    `)

    await db.close()
  },

  async delete(id) {
    const db = await Database()

    await db.run(`DELETE FROM jobs
    where id = ${id}`)

    await db.close()
  },

  async create(newJob) {
    const db = await Database();

    await db.run(`INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
      ) VALUES (
        "${newJob.name}",
        ${newJob["daily-hours"]},
        ${newJob["total-hours"]},
        ${newJob.created_at}
    )`);

    await db.close();
  },
};
