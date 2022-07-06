export function updateData(){
    $(".update-data").click(function(){
        $(".update-data").attr("disabled", true);
        $(".delete-data").attr("disabled", true);
        $(".delete-data").attr("data-bs-toggle", "");
        $(".add-bldg").attr("disabled", true);
        let stash = [];
        var parent = $(this).parent().parent().parent();
        let children = parent.children();
        let id = $(this).val();
        for (let i=0; i < children.length; i++)
            stash.push(children.eq(i).html());
        parent.html(`
            <th>
                <input class='form-control form-control-sm' id="buildingNameField" type='text' name='b_name' placeholder='Building Name' aria-label='asd' value="${stash[0]}">
                <div class="validContainer">
                <small class = "valid" id="insertNameAddBuilding">Insert a name<br></small>
                <small class = "valid" id="invalidNameAddBuilding">Invalid name</small>
            </div>
                
            </th>
            <td>
                <input class='form-control form-control-sm' id="buildingAddressField" type='text' placeholder='Building Address' aria-label='' value="${stash[1]}">
                <div class="validContainer">
                <small class="valid" id="insertAddressAddBuilding">Insert an address<br></small>
                <small class="valid" id="invalidAddressAddBuilding">Invalid address</small>
            </div>
            </td>
            <td>
                <input class='form-control form-control-sm' id="contactPersonField" type='text' placeholder='Contact Person' aria-label='' value="${stash[2]}">
                <div class="validContainer">
                <small class="valid" id="insertPersonAddBuilding">Insert a contact person<br></small>
                <small class="valid" id="invalidPersonAddBuilding">Invalid contact person</small>
            </div>
            </td>
            <td>
                <input class='form-control form-control-sm' id="contactNumberField" type='text' placeholder='Contact No.' aria-label='' value="${stash[3]}">
                <div class="validContainer">
                <small class="valid" id="insertContactAddBuilding">Insert a contact number<br></small>
                <small class = "valid" id="invalidContactAddBuilding">Invalid contact number</small>
            </div>
            </td>
            <td>
                <input class='form-control form-control-sm' id="emailField" type='email' placeholder='Email Address' aria-label='' value="${stash[4]}">
                <div class="validContainer">
                <small class = "valid" id="insertEmailAddBuilding">Insert an email<br></small>
                <small class = "valid" id="invalidEmailAddBuilding">Invalid email</small>
            </div>
            </td>
            <td class='d-flex'>
                <button type='button' class='btn btn-success btn-sm mr-2 save-row'>Update</button>
                <button type='button' class='btn btn-danger btn-sm cancel-row' value="${id}">Cancel</button>
            </td>`
        );

        $(".save-row").click(() => {
            $(".delete-data").attr("data-bs-toggle", "modal");
            let buildingName = $("#buildingNameField").val();
            let buildingAddress = $("#buildingAddressField").val();
            let contactPerson = $("#contactPersonField").val();
            let contactNumber = $("#contactNumberField").val();
            let email = $("#emailField").val();
            let id = $(this).val();
            let pwedeNaMaSubmit = [];
            let checker = arr => arr.every(v => v === true);

            // mga way sulod ang fields
            if (!buildingName) {
                $("#insertNameAddBuilding").addClass("name-empty");
                $("#buildingNameField").addClass("_form");
                pwedeNaMaSubmit.push(false);
            }
            else {
                $("#insertNameAddBuilding").removeClass("name-empty");
                $("#buildingNameField").removeClass("_form");
                pwedeNaMaSubmit.push(true);
            };
            if (!buildingAddress) {
                $("#insertAddressAddBuilding").addClass("address-empty");
                $("#buildingAddressField").addClass("_form");
                pwedeNaMaSubmit.push(false);
            }
            else {
                $("#insertAddressAddBuilding").removeClass("address-empty");
                $("#buildingAddressField").removeClass("_form");
                pwedeNaMaSubmit.push(true);
            }
            if (!contactPerson) {
                $("#insertPersonAddBuilding").addClass("person-empty");
                $("#contactPersonField").addClass("_form");
                pwedeNaMaSubmit.push(false);
                
            }
            else {
                $("#insertPersonAddBuilding").removeClass("person-empty");
                $("#contactPersonField").removeClass("_form");
                pwedeNaMaSubmit.push(true);
            }
            if (!contactNumber) {
                $("#insertContactAddBuilding").addClass("contact-empty");
                $("#contactNumberField").addClass("_form");
                pwedeNaMaSubmit.push(false);
            }
            else {
                $("#insertContactAddBuilding").removeClass("contact-empty");
                $("#contactNumberField").removeClass("_form");
                pwedeNaMaSubmit.push(true);
            }
            if (!email) {
                $("#insertEmailAddBuilding").addClass("email-empty");
                $("#emailField").addClass("_form");
                pwedeNaMaSubmit.push(false);
            }
            else {
                $("#insertEmailAddBuilding").removeClass("email-empty");
                $("#emailField").removeClass("_form");
                pwedeNaMaSubmit.push(true);
            }

            
            // mga invalid nga fields
            let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im;
            if (!contactNumber.match(regex) && pwedeNaMaSubmit[3]) {
                $("#invalidContactAddBuilding").addClass("contact-invalid");
                $("#contactNumberField").addClass("_form");
                pwedeNaMaSubmit.push(false);
            }
            else {
                $("#invalidContactAddBuilding").removeClass("contact-invalid");
                if (pwedeNaMaSubmit[3]) $("#contactNumberField").removeClass("_form");
                pwedeNaMaSubmit.push(true);
            }
            if (!email.includes("@") && pwedeNaMaSubmit[4]) {
                $("#invalidEmailAddBuilding").addClass("email-invalid");
                $("#emailField").addClass("_form");
                pwedeNaMaSubmit.push(false);
            }
            else {
                $("#invalidEmailAddBuilding").removeClass("email-invalid");
                if (pwedeNaMaSubmit[4]) $("#emailField").removeClass("_form");
                pwedeNaMaSubmit.push(true);
            }


            if (checker(pwedeNaMaSubmit)) {
    
                $(".update-data").attr("disabled", false);
                $(".delete-data").attr("disabled", false);
                $(".add-bldg").attr("disabled", false);
                parent.html(`
                    <th class="theader">${buildingName}</th>
                    <td>${buildingAddress}</td>
                    <td>${contactPerson}</td>
                    <td>${contactNumber}</td>
                    <td>${email}</td>
                    <td>
                        <div class="col-12 d-flex justify-content-center action">
                            <button class=" item update-data"  value="${id}" id="edit"><i class="fas fa-edit color-gray mr-2"></i></button>
                            <button class="item delete-data" data-bs-target="#myModal" data-bs-toggle="modal" value="${id}" id="delete"><i class="fas fa-trash-can color-gray mr-2"></i></button>
                        </div>
                    </td>
                `);
    
                // zoho insert record
                ZOHO.CRM.API.updateRecord({
                    Entity: "Buildings",
                    APIData: {
                        id: id,
                        Name: buildingName,
                        Building_Address: buildingAddress,
                        Contact_Person: contactPerson,
                        Contact_Number: contactNumber,
                        Email: email
                    },
                    Trigger: ["workflow"]
                })
                .then(function(data){
                    updateData();
                    deleteData();
                });
            }
        });

        $(".cancel-row").click(() => {
            $(".delete-data").attr("data-bs-toggle", "modal");
            $(".update-data").attr("disabled", false);
            $(".delete-data").attr("disabled", false);
            $(".add-bldg").attr("disabled", false);
            let buildingName = stash[0];
            let buildingAddress = stash[1];
            let contactPerson = stash[2]
            let contactNumber = stash[3];
            let email = stash[4];
            let id = $(this).val();

            parent.html(`
                <th class="theader">${buildingName}</th>
                <td>${buildingAddress}</td>
                <td>${contactPerson}</td>
                <td>${contactNumber}</td>
                <td>${email}</td>
                <td>
                    <div class="col-12 d-flex justify-content-center action">
                        <button class=" item update-data" value="${id}" id="edit"><i class="fas fa-edit color-gray mr-2"></i></button>
                        <button class="item delete-data" data-bs-target="#myModal" data-bs-toggle="modal" value="${id}" id="delete"><i class="fas fa-trash-can color-gray mr-2"></i></button>
                    </div>
                </td>
            `);
            updateData();
            deleteData();
        });


    })
}

export function deleteData(){
    $(".delete-data").click(function(){
        let id = $(this).val();
        let deleteBtn = $(this);
        $(".sure-delete").click(() => {
            deleteBtn.parent().parent().parent().remove();
            // zoho insert record
            ZOHO.CRM.API.deleteRecord({
                Entity: "Buildings",
                RecordID: id
            })
            .then(function(data){
                updateData();
                deleteData();
            });
            if (!$("#dataList").children().length > 0) {
                $(".noData").css("display", "flex")
            }

        });
    })
}