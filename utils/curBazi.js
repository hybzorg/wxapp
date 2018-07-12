function create() {
  return JSON.parse('{"xing": "", "ming": "", "sex": "", "birthday": "", "hour": "", "minute": "", "orderno": "", "email": "", "status": "" }');
}
function createCurUser() {
  return JSON.parse('{"Xing": "", "Ming": "", "Sex": "", "Birthday": "", "Hour": "", "Minute": "", "Orderno": "", "Email": "", "Status": "" }');
}

module.exports = {
  create: create,
  createCurUser: createCurUser,
}