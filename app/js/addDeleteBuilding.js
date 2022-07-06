import { deleteData, updateData } from "./updateDeleteBuildings.js";

var EntityID;

export function setID(id) {
    EntityID = id;
}

// add building
$(".add-bldg").click(function () {
    $(this).attr("disabled", true);
    let markup = `
    <tr id="rowInput">
        <th>
            <input class='form-control form-control-sm' id="buildingNameField" type='text' name='b_name' placeholder='Building Name' aria-label=''>
            <div class="validContainer">
                <small class = "valid" id="insertNameAddBuilding">Insert a name<br></small>
                <small class = "valid" id="invalidNameAddBuilding">Invalid name</small>
            </div>
        </th>
        <td>
            <input class='form-control form-control-sm' id="buildingAddressField" type='text' placeholder='Building Address' aria-label='' >
            <div class="validContainer">
                <small class="valid" id="insertAddressAddBuilding">Insert an address<br></small>
                <small class="valid" id="invalidAddressAddBuilding">Invalid address</small>
            </div>
        </td>
        <td>
            <input class='form-control form-control-sm' id="contactPersonField" type='text' placeholder='Contact Person' aria-label=''>
            <div class="validContainer">
                <small class="valid" id="insertPersonAddBuilding">Insert a contact person<br></small>
                <small class="valid" id="invalidPersonAddBuilding">Invalid contact person</small>
            </div>
        </td>
        <td>
            <input type="tel" class='form-control form-control-sm' id="contactNumberField" type='text' placeholder='Contact No.' aria-label=''>
            <div class="validContainer">
                <small class="valid" id="insertContactAddBuilding">Insert a contact number<br></small>
                <small class = "valid" id="invalidContactAddBuilding">Invalid contact number</small>
            </div>
        </td>
        <td>
            <input type="email" class='form-control form-control-sm' id="emailField" type='email' placeholder='Email Address' aria-label=''>
            <div class="validContainer">
                <small class = "valid" id="insertEmailAddBuilding">Insert an email<br></small>
                <small class = "valid" id="invalidEmailAddBuilding">Invalid email</small>
            </div>
            
        </td>
        <td class='d-flex'>
            <button type='button' class='btn btn-success btn-sm mr-2 submit-row'>Submit</button>
            <button type='button' class='btn btn-danger btn-sm delete-row'>Cancel</button>
        </td>
    </tr>
    `;
    let tableBody = $("table tbody");
    tableBody.prepend(markup);
    
});

// cancel record
$("#buildingTable").on('click', '.delete-row', function(){
    $(".add-bldg").attr("disabled", false);
    $(this).parent().parent().remove();
})

// submit record
$("#buildingTable").on('click', '.submit-row', function(){
    $(".add-bldg").attr("disabled", false);
    let buildingName = $("#buildingNameField").val();
    let buildingAddress = $("#buildingAddressField").val();
    let contactPerson = $("#contactPersonField").val();
    let contactNumber = $("#contactNumberField").val();
    let email = $("#emailField").val();
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
        // enable button
        $(this).attr("disabled", false);

        // zoho insert record
        ZOHO.CRM.API.insertRecord({
            Entity: "Buildings",
            APIData: {
                Name: buildingName,
                Building_Address: buildingAddress,
                Contact_Person: contactPerson,
                Contact_Number: contactNumber,
                Email: email,
                Project: EntityID
            },
            Trigger: ["workflow"]
        })
        .then(function(res){
            // let id = res.data.id;
            console.log(res);
            let newID = res.data[0].details.id;
            console.log(newID);

            let rowData = `
            <tr>
                <th class="theader">${buildingName}</th>
                <td>${buildingAddress}</td>
                <td>${contactPerson}</td>
                <td>${contactNumber}</td>
                <td>${email}</td>
                <td>
                    <div class="col-12 d-flex justify-content-center action">
                        <button class=" item update-data" value="${newID}" id="edit"><i class="fas fa-edit color-gray mr-2"></i></button>
                        <button class="item delete-data" data-bs-target="#myModal" data-bs-toggle="modal" value="${newID}" id="delete"><i class="fas fa-trash-can color-gray mr-2"></i></button>
                    </div>
                </td>
            </tr>
            `;
            $("#rowInput").remove();
            $("#dataList").prepend(rowData);

            updateData();
            deleteData();
            if ($("#dataList").children().length > 0) {
                $(".noData").css("display", "none")
            }
        });
    }
});

// save and close
$("#saveClose").click(() => {
    if($("#isBuildingRelated").prop("checked")){
        ZOHO.CRM.API.updateRecord({
            Entity:"Projects_Won",
            APIData:{
                "id": EntityID,
                "All_Buildings_Are_Added": true
            },
            Trigger: []
        })
        .then(function(data){})
        ZOHO.CRM.BLUEPRINT.proceed();
    }
    ZOHO.CRM.UI.Popup.closeReload()
    .then((data) => {});
});