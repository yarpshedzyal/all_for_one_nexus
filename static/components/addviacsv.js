import FETCH from "./FETCH.js";

export default function addviascsv(data, ArrKeys) {
    let indextd = document.querySelectorAll('td[class="btnModal"][data-column="index"]');
    let titleModalAddViacsv = document.querySelector(".titleModalAddViacsv");
    let contentModalAddViacsv = document.querySelector(".ContentModalAddViacsv");
    let POSTaddviascsv = document.querySelector(".POSTaddviascsv");
    let title = "Modal Addviacsv";

    indextd.forEach((thisTd) => {
        thisTd.addEventListener("click", () => {
            contentModalAddViacsv.innerHTML = "";
            titleModalAddViacsv.textContent = `${title} id: ${thisTd.title}`;

            let e = data.items[Number(thisTd.title)];
            console.log(e);
            contentModalAddViacsv.insertAdjacentHTML("beforeend", `
                <div> 
                ${ArrKeys.map((key) => `
                    ${e[key] === undefined ? "" : `
                    <span>${key}:
                    <input class="form-control my-2 inpaddviascsv" placeholder="${key}" value="${e[key]}" data-column="${key}" title='${e[key] === undefined ? "" : e[key]}'>
                    <span/>
                    `}
                `).join('')}
                </div> 
                `);

            let inpaddviascsv = document.querySelectorAll(".inpaddviascsv");
            inpaddviascsv.forEach((thisInp) => {
                thisInp.addEventListener("change", () => {
                    e[thisInp.dataset.column] = thisInp.value;
                })
            });
            let test = false;
            POSTaddviascsv.addEventListener("click", () => {
                FETCH("/update_product", e).then(async (r) => {
                    console.log(r);
                })
            });
        });
    });

    console.log(indextd);
}






   // function handleCsvUpload() {
    //     // Trigger the file input click
    //     $("#csv-file-input").click();
    // }

    // // Handle file selection and form submission
    // $("#csv-file-input").change(function () {
    //     // Get the selected file
    //     var file = this.files[0];

    //     // Create a FormData object and append the file
    //     var formData = new FormData();
    //     formData.append("csv_file", file);

    //     // Use Ajax to submit the form
    //     $.ajax({
    //         type: "POST",
    //         url: "/upload_csv",
    //         data: formData,
    //         contentType: false,
    //         processData: false,
    //         success: function (response) {
    //             // Handle the response from the server
    //             console.log(response);
    //             // Optionally, you can display a message to the user
    //             alert(response.message);
    //         },
    //         error: function (error) {
    //             // Handle the error
    //             console.error("Error uploading CSV file:", error);
    //         }
    //     });
    // });