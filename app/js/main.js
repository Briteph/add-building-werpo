import { updateData, deleteData} from "./updateDeleteBuildings.js"
import { setID } from "./addDeleteBuilding.js";

ZOHO.embeddedApp.on("PageLoad",(data) => {
    setID(data.EntityId);

    ZOHO.CRM.API.getRecord({
        Entity:"Projects_Won",
        RecordID: data.EntityId
    })
    .then(function(res){
        $("#isBuildingRelated").prop("checked", res.data[0].All_Buildings_Are_Added);
        $(".client-name").html("View " + res.data[0].Contacts.name + "'s Buildings");
    })

    ZOHO.CRM.API.getRelatedRecords({
        Entity:"Projects_Won",
        RecordID: data.EntityId,
        RelatedList: "Buildings"
    })
    .then(function(res){
        if(res.data){
            displayData(res.data);
            updateData();
            deleteData();
        } else {
            $(".noData").css("display", "flex")
        }
    })
});

export function displayData(data){
    
    var table = document.getElementById('dataList');
    data.sort((a, b) => {
        let textA = a.Name;
        let textB = b.Name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    
    for(var i=0; i<data.length; i++){
        var row = `
        <tr>
            <th class="theader">${data[i].Name}</th>
            <td>${data[i].Building_Address}</td>
            <td>${data[i].Contact_Person}</td>
            <td>${data[i].Contact_Number}</td>
            <td>${data[i].Email}</td>
            <td>
                <div class="d-flex justify-content-center action">
                    <button class=" item update-data" value="${data[i].id}" id="edit"><i class="fas fa-edit color-gray mr-2"></i></button>
                    <button class="item delete-data" data-bs-target="#myModal" data-bs-toggle="modal" value="${data[i].id}" id="delete"><i class="fas fa-trash-can color-gray mr-2"></i></button>
                </div>
            </td>
        </tr>`;

        table.innerHTML += row;
    }
}


/*
 * initializing the widget.
 */
ZOHO.embeddedApp.init();
