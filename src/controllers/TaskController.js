function index(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM task', (err, task) => {
            if(err){
                res.json(err)
            }
            res.render('tasks/index', { task });
        });
    });
}

function create(req, res) {

    res.render('tasks/create');
}

function store(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO task SET ?', [data], (err, rows) =>{
            res.redirect('/tasks');
        })
    });
}

function destroy(req,res) {
    const id =req.body.id
    req.getConnection((err, conn )=> {
        conn.query('DELETE FROM task WHERE id = ?', [id], (err, rows) => {
            res.redirect('/tasks');
        })
    })
}

function edit (req, res) {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM task WHERE id = ?', [id], (err, task) => {
            if(err){
                res.json(err)
            }
            res.render('tasks/edit', { task });
        });
    });
}

function update (req,res) {
    const id = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE task SET ? WHERE id=?', [data, id], (err, rows) => {
            res.redirect('/tasks')
        })
    })
}

module.exports = {
    index: index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
}