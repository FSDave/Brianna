//////////////// Base Functions To Make Life Easy////////////////////////////
function getVal(name){
    return document.getElementById(name).value;
}
function setVal(name, newVal){
    document.getElementById(name).value= newVal;
}
function setValbyClass(name, newVal){
    var x = document.getElementsByClassName(name);
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].value= newVal;
  }
}
function showId(name){
    document.getElementById(name).style.display="block";
}
function hideId(name){
    document.getElementById(name).style.display="none";
}
function changeHTML(name, html){
    document.getElementById(name).innerHTML=html;   
}
function move_to(firstPage, newPage){
    hideId(firstPage);
    showId(newPage);
}
//////////////// Useful functions////////////////////////////

function add_region(){
    fetch('Php/brianna.php?option=add_region&region_name='+getVal("region_name"))
    .then(() => {
           alert(getVal("region_name")+" Added to Regions!");
        setVal("region_name", ""); 
        region_names('region_id');
    })
}

function add_workpost(){
    fetch('Php/brianna.php?option=add_workpost&workpost_name='+getVal("workpost_name")+
                                            '&workpost_location='+getVal("workpost_location")+
                                            '&shift_managers='+getVal("shift_managers")+
                                            '&workers_amount='+getVal("workers_amount")+
                                            '&region_id='+getVal("region_id"));
    alert('Php/brianna.php?option=add_workpost&workpost_name='+getVal("workpost_name")+
    '&workpost_location='+getVal("workpost_location")+
    '&shift_managers='+getVal("shift_managers")+
    '&workers_amount='+getVal("workers_amount")+
    '&region_id='+getVal("region_id"));
    alert(getVal("workpost_name")+" Added to Workposts!");
    setVal("workpost_name", "");
    setVal("workpost_location", "");
    setVal("shift_managers", "");
    setVal("workers_amount", "");
    setVal("region_id", "");
}

function region_names(elementid){
    fetch("Php/brianna.php?option=region_names")
        .then(regionObject =>{
            return regionObject.json();
        })
        .then(names => {
            var options = "";
            names.forEach(name => { 
                options+=`<option value = "${name.id}">${name.region}</option>`;
                
            });
            changeHTML(elementid, options);
    })
}

function workpost_names(elementid){
    fetch("Php/brianna.php?option=workpost_names")
                .then(workpost_names =>{
                    return workpost_names.json();
                })
                .then(names => {
                    var options = "";
                    names.forEach(name => { 
                    options+=`<option value = "${name.id}">${name.name}</option>`;
                });
                changeHTML(elementid, options);
            })
}
//////////////// Worker manipulation////////////////////////////

function add_worker(){
    fetch('Php/brianna.php?option=add_worker&first_name='+getVal("add_worker_first_name")+
                                            '&last_name='+getVal("add_worker_last_name")+
                                            '&national_id='+getVal("add_worker_national_id"));
    alert(getVal("add_worker_first_name")+" "+getVal("add_worker_last_name") +" Added to Workers!");
    hideId('add_worker');
    setVal("add_worker_first_name", "");
    setVal("add_worker_last_name", "");
    setVal("add_worker_national_id", "");
    showId('add_worker_personal_details');
}

function add_worker_personal_details(){
    fetch('Php/brianna.php?option=add_worker_personal_details&street_name='+getVal("add_worker_streetname")+
                                            '&number='+getVal("add_worker_number")+
                                            '&city='+getVal("add_worker_city")+
                                            '&phone_number='+getVal("add_worker_phone_number")+
                                            '&additional_details='+getVal("add_worker_additional_details"));
    hideId('add_worker_personal_details');
    alert(getVal("add_worker_first_name")+" "+getVal("add_worker_last_name") +"Private details Added to Workers private details!");
    changeHTML('add_worker_postId', workpost_names('add_worker_postId'));
    setVal("add_worker_streetname", "");
    setVal("add_worker_number", "");
    setVal("add_worker_city", "");
    setVal("add_worker_phone_number", "");
    setVal("add_worker_additional_details", "");
    showId('add_worker_work_details');
}

function add_worker_work_details(){
    fetch('Php/brianna.php?option=add_worker_work_details&transport='+getVal("add_worker_transport")+
                                            '&status='+getVal("add_worker_status")+
                                            '&rank='+getVal("add_worker_rank")+
                                            '&post_id='+getVal("add_worker_postId"));
    move_to('add_worker_work_details', 'add_worker');
}

function delete_worker(workerId){
    fetch("Php/brianna.php?option=delete_worker&workerId="+workerId);
    alert("worker Deleted");
    workers_full_info(); 
}

function edit_worker(workerId=-1){
    bossmainpart('edit_worker');
    workpost_names('edit_worker_postId');
    fetch("Php/brianna.php?option=worker_all_info&workerId="+workerId)
    .then(workers_all_info =>{
        return workers_all_info.json();
    })
    .then(workers => {
        workers.forEach(worker => { 
            setVal('edit_worker_first_name', `${worker.first_name}`);
            setVal('edit_worker_last_name', `${worker.last_name}`); 
            setVal('edit_worker_national_id', `${worker.national_id}`); 
            setVal('edit_worker_streetname', `${worker.street_name}`);
            setVal('edit_worker_number', `${worker.number}`);
            setVal('edit_worker_city', `${worker.city}`);
            setVal('edit_worker_phone_number', `${worker.phone_number}`); 
            setVal('edit_worker_additional_details', `${worker.additional_details}`); 
            setVal('edit_worker_transport', `${worker.transport}`); 
            setVal('edit_worker_status', `${worker.status}`); 
            setVal('edit_worker_rank', `${worker.rank}`); 
            setVal('edit_worker_postId', `${worker.postId}`); 
        });
    })
    
}

function edit_worker_details(){
    fetch('Php/brianna.php?option=edit_worker_details&first_name='+getVal("edit_worker_first_name")+
    '&last_name='+getVal("edit_worker_last_name")+
    '&national_id='+getVal("edit_worker_national_id")+
    '&street_name='+getVal("edit_worker_streetname")+
    '&number='+getVal("edit_worker_number")+
    '&city='+getVal("edit_worker_city")+
    '&phone_number='+getVal("edit_worker_phone_number")+
    '&additional_details='+getVal("edit_worker_additional_details")+
    '&transport='+getVal("edit_worker_transport")+
    '&status='+getVal("edit_worker_status")+
    '&rank='+getVal("edit_worker_rank")+
    '&post_id='+getVal("edit_worker_postId"));
    alert("updated details!");
    bossmainpart('manipulate_workers');
}

function worker_personal_details(workerId){
    fetch("Php/brianna.php?option=workers_personal_details&workerId="+workerId)
    .then(workers_personal_details =>{
       return workers_personal_details.json(); 
    })
    .then(details => {
        var detailsTable ="<table><tr><th>name</th><th>address</th><th>phone number</th><th>additional details</th><th>edit</th><th>delete</th></tr>";
        details.forEach(detail =>{
            detailsTable+=`<tr><td>${detail.first_name} ${detail.last_name}</td><td>${detail.street_name} ${detail.number}, ${detail.city}</td><td>${detail.phone_number}</td><td>${detail.additional_details}</td><td><button onclick="edit_worker(${detail.id})">edit</button></td><td><button onclick="delete_worker(${detail.id})">x</button></td></tr>`;
        });
        detailsTable+="</table>";
        changeHTML('workers_list', detailsTable);
    })
}

function worker_work_details(workerId){
    fetch("Php/brianna.php?option=workers_work_details&workerId="+workerId)
    .then(workers_work_details =>{
        return workers_work_details.json(); 
     })
    .then(details => {
        var detailsTable = "<table><tr><th>Name</th><th>Main Post</th><th>Transport</th><th>status</th><th>rank</th><th>edit</th><th>delete</th></tr>";
        details.forEach(detail =>{
            detailsTable+=`<tr><td>${detail.first_name} ${detail.last_name}</td><td>${detail.name}</td><td>${detail.transport}</td><td>${detail.status}</td><td>${detail.rank}</td><td><button onclick="edit_worker(`+workerId+`)">edit</td><td><button onclick="delete_worker(`+workerId+`)">x</td>`;
        });
        detailsTable+="</table>";
        changeHTML('workers_list', detailsTable);
    })
}

function worker_private_details(){
    fetch("Php/brianna.php?option=worker_private_details")
    .then(worker_private_details =>{
        return worker_private_details.json();
    })
    .then(workers => {
        workers.forEach(worker => { 
            changeHTML('profile_name', `${worker.first_name} ${worker.last_name}`);
            changeHTML('profile_phone_number', `${worker.phone_number}`); 
            changeHTML('profile_national_id', `${worker.national_id}`); 
            changeHTML('profile_shift_count', `${worker.total_shifts}`);
            changeHTML('profile_hour_count', `${worker.total_hours}`);
        })
    })
}

function workers_full_info(){
    fetch("Php/brianna.php?option=workers_full_info")
                .then(workers_full_info =>{
                    return workers_full_info.json();
                })
                .then(workers => {
                    var workersTable = "<table><tr><th>name</th><th>national id</th><th>personal details</th><th>work details</th><th>edit</th><th>delete</th></tr>";
                    workers.forEach(worker => { 
                        workersTable+=`<tr><td>${worker.first_name} ${worker.last_name}</td><td>${worker.national_id}</td><td><button onclick="worker_personal_details(${worker.id})">personal details</button></td><td><button onclick="worker_work_details(${worker.id})">work details</button></td><td><button onclick="edit_worker(${worker.id})">edit</button></td><td><button onclick="delete_worker(${worker.id})">delete</button></td></tr>`;
                });
                workersTable+="</table>";
                changeHTML('workers_list', workersTable);
            })
}

//////////////// Workpost manipulation////////////////////////////

function workpost_full_info(){
    fetch("Php/brianna.php?option=workpost_full_info")
                .then(workpost_full_info =>{
                    return workpost_full_info.json();
                })
                .then(workstations => {
                    var workstationTable = "<table><tr><th>name</th><th>location</th><th>shift manager</th><th>number of workers</th><th>region</th><th>edit</th><th>delete</th></tr>";
                    workstations.forEach(workstation => { 
                        workstationTable+=`<tr><td>${workstation.name}</td><td>${workstation.location}</td><td>${workstation.shift_manager}</td><td>${workstation.workers}</td><td>${workstation.region}</td><td><button onclick="edit_workpost(${workstation.id})">edit</button></td><td><button onclick="delete_workpost(${workstation.id})">delete</button></td></tr>`;
                });
                workstationTable+="</table>";
                changeHTML('workstations_list', workstationTable);
            })
}

function delete_workpost(workpostId){
    fetch("Php/brianna.php?option=delete_workpost&workpostId="+workpostId);
    alert("workpost Deleted");
    workpost_full_info(); 
}

function edit_workpost(workpostId =-1){
    bossmainpart('edit_workpost');
    region_names('edit_region_id');
    fetch("Php/brianna.php?option=workpost_all_info&workpostId="+workpostId)
    .then(workpost_all_info =>{
        return workpost_all_info.json();
    })
    .then(workposts =>{
        workposts.forEach(workpost => { 
            setVal('edit_workpost_name', `${workpost.name}`);
            setVal('edit_workpost_location', `${workpost.location}`);
            setVal('edit_shift_managers', `${workpost.shift_manager}`);
            setVal('edit_workers_amount', `${workpost.workers}`);
            setVal('edit_region_id', `${workpost.regionId}`);
        });
    })
}

function edit_workpost_details(){
    fetch('Php/brianna.php?option=edit_workpost_details&workpost_name='+getVal("edit_workpost_name")+
    '&workpost_location='+getVal("edit_workpost_location")+
    '&shift_managers='+getVal("edit_shift_managers")+
    '&workers_amount='+getVal("edit_workers_amount")+
    '&region_id='+getVal("edit_region_id"));
    bossmainpart('manipulate_workstations');
    region_names('edit_region_id');
}

function updatePassword(){
    if(getVal('newpassword1')!=getVal('newpassword2')){
        alert("New password dont match!")
    }
    else{
        fetch("Php/brianna.php?option=updatePassword&password="+getVal('newpassword1'));
    }
}

function bossmainpart(option){
    switch (option) {
        case "view_logistics_reports" :changeHTML('bossmainpart', 
            `<div id="view_logistics_reports" dir="rtl" lang="ar">
                    <h2>View Logistics Reports</h2>
                    <h1>דוחות אחמש</h1>
                    <hr>
                    <form>
                        <label for="date">תאריך</label>
                        <input type="date" id="date">
                        <label for="time">משמרת</label>
                        <select id="time" name="time">
                            <option value="all">הכל</option>
                            <option value="morning">בוקר</option>
                            <option value="afternoon">צהריים</option>
                            <option value="night">לילה</option>
                        </select>
                        <label for="checkpost">מעבר</label>
                        <select class="checkpost" name="checkpost">
                            <option value="all">הכל</option>
                            <option value="Azaim">אזעים</option>
                            <option value="zeitim">זיתים</option>
                            <option value="tabaat">טבעת</option>
                            <option value="rachel">רחל</option>
                            <option value="mizmoriah">מזמוריה</option>
                            <option value="shechsaed">שיח סעד</option>
                            <option value="suachrah">סוואחרה</option>
                            <option value="enyael">עין יעל</option>
                            <option value="minharot">מנהרות</option>
                        </select>
                        <button>הצג דוח אחמש</button>
                    </form>
                    <table>
                        <tr><th>תפקיד+ מעבר</th><th>שם מלא</th><th>שחפץ+ מגן צוואר</th><th>נעליים</th><th>חולצה+ מכנס עבודה</th><th>כובע זיהוי+גז פלפל</th><th>רישיון נשק</th><th>תעודת מאבטח</th><th>מספר מכשיר קשר</th><th>אקדח+שרוך</th></tr>
                        <tr><td>אחמש</td><th>ראובן</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>121</th><th>-</th></tr>
                        <tr><td>מאבטח</td><th>שמעון</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>400</th><th>v</th></tr>
                        <tr><td>מאבטח</td><th>לוי</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>322</th><th>-</th></tr>
                        <tr><td>מאבטח</td><th>יהודה</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>467</th><th>-</th></tr>
                        <tr><td>מאבטח</td><th>יששכר</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>408</th><th>-</th></tr>
                        <tr><td>מאבטח</td><th>זבולון</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>v</th><th>350</th><th>-</th></tr>
                    </table><br>
                    <h2>דוח ציוד</h2><br>
                    <table>
                        <tr><th>ציוד</th><th>כמות</th><th>הערות</th></tr>
                        <tr><td>נשקים תקינים כולל כוונת קדמית וידית סער</td><td>6</td><td></td></tr>
                        <tr><td>כוונת "טריגיקון"</td><td>3</td><td></td></tr>
                        <tr><td>כוונת "מארס"</td><td>3</td><td></td></tr>
                        <tr><td>מחסניות תקינות עם 29 כדורים</td><td>12</td><td></td></tr>
                        <tr><td>פונדות פלסטיק</td><td>12</td><td></td></tr>
                        <tr><td>קסדות תקינות עם משקף</td><td>6</td><td></td></tr>
                        <tr><td>מכשירי קשר תקינים</td><td>8</td><td></td></tr>
                        <tr><td>מטענים לקשר</td><td>5</td><td></td></tr>
                        <tr><td>מעדים</td><td>6</td><td></td></tr>
                        <tr><td>רדיאטור</td><td>1</td><td>תקין</td></tr>
                        <tr><td>נרתיק עור לקשרים</td><td>3</td><td></td></tr>
                        <tr><td>חליפות סערה</td><td>6</td><td></td></tr>
                        <tr><td>חרמוניות</td><td>6</td><td></td></tr>
                        <tr><td>קומקום</td><td>1</td><td>תקין</td></tr>
                        <tr><td>אספקה (קפה, סוכר,כוסות, כפיות)</td><td>-</td><td>חסר כוסות חמות</td></tr>
                        <tr><td>מפתח לכספת (אצל אחמ"ש)</td><td>v</td><td></td></tr>
                    </table>
        </div>`)
            ; break;
        case "manipulate_workstations" :changeHTML('bossmainpart', `<div id="manipulate_workstations">
                                                                <h2>Create and modify workstations</h2>
                                                                <button onclick="edit_workpost()">add</button>
                                                                <div id="workstations_list"></div>
                                                                </div>`);
                                        workpost_full_info(); break;
        case "manipulate_workers" :changeHTML('bossmainpart',`<div id="manipulate_workers">
                                                            <h2>Add edit and view workers</h2>
                                                            <button onclick="edit_worker()">add</button> 
                                                            <div id="workers_list"></div>`);
                                     workers_full_info(); break;
        case "view_rota" : changeHTML('bossmainpart', ` <div id="view_rota" dir="rtl" lang="ar">
        <h2>View Rota</h2>
        <h2>רחל</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td></tr>      
        </table>
        <h2>זיתים</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>ליווי</td><td>ליווי</td><td>ליווי</td><td>ליווי</td><td>ליווי</td><td>ליווי</td><td>ליווי</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
        <h2>מנהרות</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td></tr>      
        </table>
        <h2>אזעים</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td><td>x</td></tr>      
        </table>
        <h2>טבעת</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td><td>x</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td><td>x</td></tr>
        </table>
        <h2>עין יעל</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
        <h2>מזמוריה</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
        <h2>שיח סעד</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
        <h2>סוואחרה</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
    </div>`); break;
        case "edit_worker" : changeHTML('bossmainpart', `<div id="edit_worker" class="set_up" style="display:block">
        <h1>Worker Details</h1>
        First Name: <input id="edit_worker_first_name" type="text"><br>
        Last Name: <input id="edit_worker_last_name" type="text"><br>
        National Id: <input id="edit_worker_national_id" type="text"><br>
        <h1>Personal Details</h1>
        Address: <input id="edit_worker_streetname" type="text" placeholder="Street Name">
        <input id="edit_worker_number" type="text" placeholder="Number">
        <input id="edit_worker_city" type="text" placeholder="City"><br>
        Phone Number: <input id="edit_worker_phone_number" type="text"><br>
        Additional Details: <input id="edit_worker_additional_details" type="text" placeholder="Up to 250 Characters" value=" "><br>
        <h1>Work Details</h1>
        Transport: <select id = "edit_worker_transport">
                        <option value = "self">self</option>
                        <option value = "transport">transport</option>
                   </select><br>
        Status: <input id="edit_worker_status" type="text"><br>
        Rank: <select id = "edit_worker_rank">
        <option value = "worker">Worker</option>
        <option value = "shiftsetter">Shift setter</option>
        <option value = "shift manager">Shift manager</option>
        <option value = "boss">Boss</option></select><br>
        Main Work Post: <select id = "edit_worker_postId"></select><br>  
        <button onclick="edit_worker_details()">Submit</button>
        </div>`); break;
        case "edit_workpost": changeHTML('bossmainpart', `<div id="edit_workpost" class="set_up" style="display:block">
        <h1>Workpost Details</h1>
        Name: <input id="edit_workpost_name" type="text"><br>
        Location: <input id="edit_workpost_location" type="text"><br>
        Shift Manager: <input id="edit_shift_managers" type="text"><br>
        Number Of workers: <input id="edit_workers_amount" type="text"><br>
        Region: <select id="edit_region_id"></select><br>
        <button onclick="edit_workpost_details()">Submit</button>
        </div>`); break;
}
}
function workermainpart(option){
    switch (option) {
        case "current_shifts" : changeHTML('workermainpart', ` <div id="current_shifts">
        <h1>Current Shifts</h1>
        <div id="shift_visualizer">
            <div id="sunday_shift" class="day_visualizer">Sunday</div>
            <div id="monday_shift" class="day_visualizer">Monday</div>
            <div id="tuesday_shift" class="day_visualizer">Tuesday</div>
            <div id="wednesday_shift" class="day_visualizer">Wednesday</div>
            <div id="thursday_shift" class="day_visualizer">Thursday</div>
            <div id="friday_shift" class="day_visualizer">Friday</div>
            <div id="saturday_shift" class="day_visualizer">Saturday</div>
        </div>

        <div id="day_visualizer_expanded">
            <h1 id="visualized_day">Day</h1>
            Shift: <p id="visualized_day_shift"></p>
            Checkpoint: <p id="visualized_day_checkpoint"></p>
            Shift Manager: <p id="visualized_day_shift_manager"></p>
        </div>
    </div>`);closeNav(); break;
        case "view_profile" : changeHTML('workermainpart', `<div id="view_profile">
        <h2>Private Details</h2>
        Name:<p id="profile_name"></p>
        National ID: <p id="profile_national_id"></p>
        Phone Number: <p id="profile_phone_number"></p>
        <button onclick="workermainpart('update_password')">Change Password</button>
        <h2>Work Details</h2>
        Shifts this month: <p id="profile_shift_count"></p>
        Hours this month: <p id="profile_hour_count"></p>
    </div>`);worker_private_details();closeNav(); break;
        case "view_rota" : changeHTML('workermainpart', `<div id="view_rota">
        <h2>רחל</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td></tr>      
        </table>
        <h2>זיתים</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>ליווי</td><td>ליווי</td><td>ליווי</td><td>ליווי</td><td>ליווי</td><td>ליווי</td><td>ליווי</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
        <h2>מנהרות</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td></tr>      
        </table>
        <h2>אזעים</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td><td>x</td></tr>      
        </table>
        <h2>טבעת</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td><td><b>אחמש</b></td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td><td>x</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>x</td><td>x</td></tr>
        </table>
        <h2>עין יעל</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
        <h2>מזמוריה</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
        <h2>שיח סעד</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
        <h2>סוואחרה</h2>
        <table>
            <tr><th>א</th><th>ב</th><th>ג</th><th>ד</th><th>ה</th><th>ו</th><th>ש</th></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
            <tr><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td><td>מאבטח</td></tr>
        </table>
    </div>`);closeNav(); break;
        case "request_shift" : changeHTML('workermainpart', ` <div id="request_shifts">
        <h2>Request Shifts</h2>
        <table>
            <tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr>
            <tr><td>Morning<input type="checkbox" name="shift[]" value="11"></td><td>Morning<input type="checkbox" name="shift[]" value="21"></td><td>Morning<input type="checkbox" name="shift[]" value="31"></td><td>Morning<input type="checkbox" name="shift[]" value="41"></td><td>Morning<input type="checkbox" name="shift[]" value="51"></td><td>Morning<input type="checkbox" name="shift[]" value="61"></td><td>Morning<input type="checkbox" name="shift[]" value="71"></td></tr>
            <tr><td>Afternoon<input type="checkbox" name="shift[]" value="12"></td><td>Afternoon<input type="checkbox" name="shift[]" value="22"></td><td>Afternoon<input type="checkbox" name="shift[]" value="32"></td><td>Afternoon<input type="checkbox" name="shift[]" value="42"></td><td>Afternoon<input type="checkbox" name="shift[]" value="52"></td><td>Afternoon<input type="checkbox" name="shift[]" value="62"></td><td>Afternoon<input type="checkbox" name="shift[]" value="72"></td></tr>
            <tr><td>Night<input type="checkbox" name="shift[]" value="13"></td><td>Night<input type="checkbox" name="shift[]" value="23"></td><td>Night<input type="checkbox" name="shift[]" value="33"></td><td>Night<input type="checkbox" name="shift[]" value="43"></td><td>Night<input type="checkbox" name="shift[]" value="53"></td><td>Night<input type="checkbox" name="shift[]" value="63"></td><td>Night<input type="checkbox" name="shift[]" value="73"></td></tr>
        </table> 
        <button onclick='submitRequest()'>Submit Request</button>
    </div>`);closeNav(); break;
        case "shift_requested" : changeHTML('workermainpart',`<div id="shift_requested">
        <h1>Submitted Request!</h1>
        <table><tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr>
        <tr><td id='sunday_request'>Day Off!</td><td id='monday_request'>Day Off!</td><td id='tueday_request'>Day Off!</td><td id='wednesday_request'>Day Off!</td><td id='thursday_request'>Day Off!</td><td id='friday_request'>Day Off!</td><td id='saturday_request'>Day Off!</td></tr>
        </table>
    </div>`);shift_requested();closeNav(); break;
        case "update_password" : changeHTML('workermainpart',`<div id="updatePassword" class="set_up">
        <h1>Update password</h1>
        Current Password: <input id="currentpassword" type="password"><br>
        New Password: <input id="newpassword1" type="password"><br>
        Confirm New Password: <input id="newpassword2" type="password"><br>
        <button onclick="updatePassword()">Update Password</button>
    </div>`); break;
}
}
function openNav() {
    document.getElementById("sidepart").style.width = "250px";
    document.getElementById("workermainpart").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("sidepart").style.width = "0";
    document.getElementById("workermainpart").style.marginLeft= "0";
  }
function shiftsettermainpart(option){
    
}
function checkCredentials(){
    fetch('Php/brianna.php?option=checkCredentials&username='+getVal("username")+'&password='+getVal("password"))
    .then( (isUser)=> isUser.text())
    .then(result=>{
        if(result!='invalid'){
            fetch('Php/brianna.php?option=getRank&username='+getVal("username"))
            .then( (isUser)=> isUser.text())
            .then(rank=>{
                switch (rank){
                    case "boss" : self.location = "http://localhost/brianna/bosslandingpage.html"; break;
                    case "worker" : self.location = "http://localhost/brianna/workerlandingpage.html"; break;
                    case "shift manager" : self.location = "http://localhost/brianna/workerlandingpage.html?manager=true"; break;
                    case "shiftsetter" : self.location = "http://localhost/brianna/shiftsetterlandingpage.html"; break;
                }
            })
        }
        else{
            alert('Wrong User Name or Password! '+result);
        }         
    })
}


function submitRequest(){
    markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');  
    shifts = 'Php/brianna.php?option=submitRequest&amount='+markedCheckbox.length;
  for (i=0; i<markedCheckbox.length; i++) {  
    shifts+= '&shift'+i+'='+ markedCheckbox[i].value;
  }  
  fetch(shifts);
}
function getRequests(day= new Date()){   
    fetch('Php/brianna.php?option=getRequests&date='+day);
}
function passwordReset(){
    alert('Try really hard to remember!');
}