const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()

    // Diferente do db.get() que só traz um dado, o db.all() traz todos os dados que satisfazem a query.
    const jobs = await db.all(`SELECT * FROM jobs`)
    
    await db.close()
    //Em uma arrow function sem estrutura de função (apenas retornando um objeto), não é necessário usar outro return nem {}. Ao invés disso, basta colocar parênteses envolvendo os colchetes do objeto retorno.
    return jobs.map (job => ({      
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        create_at: job.created_at
      })
    )
  },

  update(newJob) {
    data = newJob
  }, 

  delete(id){
    data = data.filter(job => Number(data.id) !== Number(id))
  },
  
  create(newJob) {
    data.push(newJob)
  }
};
