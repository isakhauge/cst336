import {cout, get, getAll, HTTP, Http, isJSON, flushChildren, make} from "../functions.js";

function makeRow({id, fname, lname, dob, dod}) {
    // Make components:
    const row = make('tr');
    const col_id = make('td', id);
    const col_fname = make('td', fname);
    const col_lname = make('td', lname);
    const col_dob = make('td', dob);
    const col_dod = make('td', dod);
    const col_crud = make('td');
    const btn_edit = make('button', 'Edit');
    const btn_delete = make('button', 'Delete');

    // Add event listeners:
    btn_edit.addEventListener('click', function(e) {
        cout('Edit author(' + id + ') clicked!');
        get('#new-author').click();
        populateModal(id, function() {
        });
    });

    // Add attributes:
    row.id = id;
    col_id.setAttribute('data-id','');
    col_fname.setAttribute('data-fname','');
    col_lname.setAttribute('data-lname','');
    col_dob.setAttribute('data-dob','');
    col_dod.setAttribute('data-dod','');
    col_crud.setAttribute('data-crud','');
    btn_edit.classList.add('btn', 'btn-warning', 'mr-2');
    btn_delete.classList.add('btn', 'btn-danger');
    btn_delete.setAttribute('data-toggle', 'modal');
    btn_delete.setAttribute('data-target', '#delete-modal');

    btn_delete.onclick = function() {
      populateDeleteModal(id, function() {
          cout('User with ID ' + id + ' has been deleted.');
          populateAuthors(function() {
              get('#delete-cancel').click();
          });
      });
    };

    // Structure row element
    col_crud.append(
        btn_edit,
        btn_delete
    );
    row.append(
        col_id,
        col_fname,
        col_lname,
        col_dob,
        col_dod,
        col_crud
    );

    return row;
}

function populateDeleteModal(id, callback) {
    const url = '/api/lab9/author/' + id;
    Http.request(Http.method.get, url, null, function(result) {
        if (isJSON(result)) {
            const jsonArray = JSON.parse(result);
            const jsonObject = jsonArray[0];
            get('#author-name').innerText = jsonObject['firstName'] + ' ' + jsonObject['lastName'];
            get('#delete').onclick = function () {
                Http.request(Http.method.delete, url, null, function(result) {
                    callback(result);
                })
            }
        }
    });
}

function populateAuthors(callback) {
    HTTP.GET('/api/lab9/author', function(result) {
        if (isJSON(result)) {
            const jsonArray = JSON.parse(result);
            const tbody = get('tbody');
            flushChildren(tbody, function () {
                for (let i = 0; i < jsonArray.length; i++) {
                    tbody.append(
                        makeRow({
                            id: jsonArray[i]['authorId'],
                            fname: jsonArray[i]['firstName'],
                            lname: jsonArray[i]['lastName'],
                            dob: mysqlTimeToJsTime(jsonArray[i]['dob']),
                            dod: mysqlTimeToJsTime(jsonArray[i]['dod'])
                        })
                    );
                }
                callback();
            });
        }
    });
}

function resetModal(callback) {
    get('#input-id').value = '';
    get('#input-fname').value = '';
    get('#input-lname').value = '';
    get('#input-dob').value = '';
    get('#input-dod').value = '';
    callback();
}

function mysqlTimeToJsTime(value) {
    const t = value.split(/[T]/);
    const date = new Date(t[0]);
    date.setDate(date.getDate() + 1);
    const s = date.toLocaleDateString().split(/[\/]/);
    const out = s[2] + '-' + s[1] + '-' + s[0];
    return out;
}

function editAuthor(id, {fname, lname, dob, dod, sex}, callback) {
    const requestBody = {
        fname: fname,
        lname: lname,
        dob: dob,
        dod: dod,
        sex: sex,
        id: id
    };
    const url = '/api/lab9/author';
    Http.request(Http.method.put, url, requestBody, function(result) {
        if (isJSON(result))
            console.log(result);
        else console.log(result);
        callback();
    });
}

function populateModal(id, callback) {
    HTTP.GET(`/api/lab9/author/${id}`, function(result) {
        if (isJSON(result)) {
            const jsonArray = JSON.parse(result);
            const jsonObject = jsonArray[0];
            resetModal(function() {
                get('#input-id').value = jsonObject['authorId'];
                get('#input-fname').value = jsonObject['firstName'];
                get('#input-lname').value = jsonObject['lastName'];
                get('#input-dob').value = mysqlTimeToJsTime(jsonObject['dob']);
                get('#input-dod').value = mysqlTimeToJsTime(jsonObject['dod']);
                const options = get('#select-gender').options;
                for (let i = 0; i < options.length; i++) {
                    options[i].selected = options[i].value === jsonObject['sex'];
                }
                callback();
            });
        }
    });
}

function createAuthor({fname,lname,dob,dod,sex}, callback) {
    const requestBody = {
        fname: fname,
        lname: lname,
        dob: dob,
        dod: dod,
        sex: sex,
        profession: 'UNDEFINED',
        country: 'UNDEFINED',
        portrait: 'UNDEFINED',
        biography: 'UNDEFINED'
    };
    const url = '/api/lab9/author/new';
    Http.request(Http.method.post, url, requestBody, function(result) {
        callback(result);
    });
}

function onLoad() {

    cout('JS Loaded: Lab 10');

    get('#new-author').onclick = function() {
        resetModal(function() {
            cout('Modal reset');
        });
    };

    get('#submit').onclick = function() {
        const id = get('#input-id').value;
        cout('ID: ' + id, 'success');
        cout('Length: ' + id.length, 'success');
        const data = {
            fname: get('#input-fname').value,
            lname: get('#input-lname').value,
            dob: get('#input-dob').value,
            dod: get('#input-dod').value,
            sex: get('#select-gender').options[get('#select-gender').selectedIndex].value
        };
        if (id.length > 0) {
            editAuthor(id, data, function(result) {
                populateAuthors(function() {
                    cout('Updated');
                    get('#cancel').click();
                });
            });
        } else {
            createAuthor(data, function(result) {
                console.log(result);
                populateAuthors(function() {
                    cout('Created');
                    get('#cancel').click();
                });
            });
        }
    };

    populateAuthors(function() {
        console.log('End of code');
    });
}

window.onload = onLoad;
