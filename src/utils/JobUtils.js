module.exports = {
    remainingDays(job) {
      // Remaining days
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(); // toFixed() funcao do JS, arredonda um number para o numero de casas decimais que passar por parametro -> 12.1.toFixed() = "12" // 12.5.toFixed() = 13. Ao passar por essa funcao, o resultado é uma string.

      // Data de cricao do projeto
      const createdDate = new Date(job.created_at);

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
  }