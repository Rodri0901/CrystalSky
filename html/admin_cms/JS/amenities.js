let url = "http://localhost/CrystalSky/html/admin_cms/api/";

$(document).ready(function () {
  getRoomForm();
});

const getRoomForm = () => {
  $.ajax({
    url: url + "getRoomsCateg",
    type: "post",
    dataType: "json",
  })

    .done(function (data) {
      let RoomContent = data.payload;

      let str = `   
        <style>
        
          
          </style>
            <form action="${url}addAmenitiy" method="POST" enctype="multipart/form-data">
            
            <div class="amenity_sub_main_cont">
            <div class="amenity_main_container">
            <div class="amenity_title_icon">
            <label class="amenity_label_icon" for="amenity_image">Amenity Icon</label>
            </div>

            <div class="amenities_images_cont">
            <input class="amenities_images_cont_input" type="file" name="amenity_image" id="amenity_image" onchange="previewImage()">
            </div>
            </div>

            <div id="amenity_image_preview"></div>
            

            <div class="amenities_category_container">
            <div class="choose_category_amenities">Choose Category:</div>
            <select class="category_drop_container" id="category" name="category">
            
           `;

      RoomContent.forEach((content) => {
        str += ` 
                  
                  
                  <option value="${content.id}">${content.name}</option>
  
            `;
      });
      str += `  
            </select>
            </div>

            <div class="amenities_item_container">
            <div id="amenities-container" >
            <div class="add_amenity_item_cont">Add Amenities Item:</div>
            <div class="amenity-item">
              <input class="amenity_name_input" type="text" name="amenity_name" id="amenity_name" placeholder="Type here...">
            </div>
          </div>
          </div>
          </div>

        <div class="amenities_submit_input_container">
          <input class="amenities_submit_input" type="submit" value="Submit">
          </div>
  
          </form>`;
      console.log(data);

      $("#getAmenitiesForm").append(str);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });

  //   console.log(data);
};

function previewImage() {
  const preview = document.getElementById("amenity_image_preview");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const image = document.createElement("img");
    image.src = reader.result;
    preview.innerHTML = "";
    preview.appendChild(image);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "";
  }
}

//<button type="button" class="add-amenity-btn">+</button>

// $(document).ready(function() {
//   $(document).on('click', '.add-amenity-btn', function() {
//     console.log("hello");
//     const newItem = `
//       <div class="amenity-item">
//         <input type="text" name="amenity_name" placeholder="Amenity Item">
//         <button type="button" class="remove-amenity-btn">-</button>
//       </div>
//     `;
//     $('#amenities-container').append(newItem);
//   });

//   $(document).on('click', '.remove-amenity-btn', function() {
//     $(this).parent().remove();
//   });
// });



$(document).ready(function () {
  getAllAmenities();
});

const getAllAmenities = () => {
  $.ajax({
    url: url + "getAllAmenities",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let AllAmenities = data.payload;
      // accessing all items in the payload
      console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = `
      <style>
      .amenitiesDelbtn{
          padding: 7px 10px;
          border: none;
          border-radius: 3px;
          font-family: 'montserrat-medium';
          color: white;
          background-color: #FF5D5D;
          text-decoration: none;
      }
      .amenitiesEditBtn{
        padding: 7px 10px;
        border: none;
        border-radius: 3px;
        font-family: 'montserrat-medium';
        color: white;
        cursor: pointer;
        background-color: #4BB1F7;
        text-decoration: none;
      }
      </style>

      <table>
      <tr>
        <th>id</th>
        <th>Image</th>
        <th>Amenities Item</th>
        <th>Category</th>
     
        <th>Actions</th>
      </tr>`;

      AllAmenities.forEach((content) => {
        str += `    
        <tr>
          <td>${content.amn_id}</td>
          <td><img src="/assets/SUBSYSTEM_PHOTOS/CMS/${content.icon}" alt="${content.icon}" width="100px" height="100px"></td>
          <td>${content.item}</td>
          <td>${content.name}</td>
        
          <td>
          <button type="button" id="editRoom${content.id}" class="btn btn-primary edit-button edit_about amenitiesEditBtn" data-id="${content.id}" data-toggle="modal" data-target="#editModal">Edit</button>
          <a href="#" data-id="${content.amn_id}" class="delete-link amenitiesDelbtn">Delete</a>
          </td>
        </tr>


   
    
        `;
      });
      str += `
      </table>`;

      $("#getAllAmenities").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};




// Show the modal when the edit button is clicked
$(document).on("click", ".edit-button", function () {
  // Get the ID of the item being edited
  let itemId = $(this).data("id");

  // let itemName = $(this).closest("tr").find("td:eq(0)").text();
  let itemIcon = $(this).closest("tr").find("td:eq(0)").text();
  let itemDesc = $(this).closest("tr").find("td:eq(1)").text();



  // // Set the values of the form

  $("#amenity_image_preview").val(itemIcon);

  // $("#RoomNumber").val(itemName);
  // $("#categoriInput").val(itemDesc);

  // console.log(itemDesc);

  $("#id").val(itemId);
  // console.log(itemId);
  // // Show the modal
  $(".modal-container").fadeIn();
});

// Hide the modal when the cancel button is clicked
$(document).on("click", "#cancelButton", function () {
  $(".modal-container").fadeOut();
});

// Update the item when the save button is clicked
// $(document).on("click", "#saveButton", function () {
//   // get the values from the form
//   let id = $("#id").val();
//   let icon = $("#amenity_image_preview").val();
//   let item = $("#amenity_name").val();
//   // let name = $("#RoomNumber").val();

//   // console.log(id);
//   // console.log(icon);
//   // console.log(item);
//   // console.log(name);

//   // i want to get the value of the select option by id
//   let category = $("#categoriInput option:selected").val();

//   // console.log(category);
//   // console.log(category);
//   $(document).ready(function () {
//     updateRoomCategory();
//   });

//   const updateRoomCategory = () => {
//     // Send a POST request to the server
//     $.ajax({
//       url: url + "updateAmenities",
//       type: "POST",
//       dataType: "json",
//       data: {
//         id: id,
//         icon: icon,
//         item: item,
//         category: category,

//       },
//     });

//     // i want to console log the response
//     console.log(id);
//     console.log(category);
//     console.log(icon);
//     console.log(item);
//     // if success
//     // post the data to the server
//     $.post(url + "updateAmenities", {
//       id: id,
//       category: category,
//       icon: icon,
//       item: item,
//     });
//     // window.location.href = `/html/admin_cms/admin_cms_amenities.html`;
//   };
// });


    

// form

$(document).ready(function () {
  getRoomsCategory();
});

const getRoomsCategory = () => {
  $.ajax({
    url: url + "getRoomsCateg",
    type: "post",
    dataType: "json",
  })
    // if success

    .done(function (data) {
      let getCateg = data.payload;
      // accessing all items in the payload
      // console.log(data.remarks);

      // $("#ArchivedGallery").empty();

      let str = ` 
              <form class="form_container_about">
              
                  <input type="hidden" id="id">
                
                  <div class="amenities_modal_images">
                <input class="amenities_modal_images_input" type="file" id="file" name="media" accept="image/*" onchange="loadFile(event)" />
                </div>
                <img class="amenities_modal_preview" id="output" />
                <script>

                var loadFile = function(event) {
                var output = document.getElementById('output');
                output.src = URL.createObjectURL(event.target.files[0]);
                };
                
                </script>

                <div class="about_text_container">
                  <input class="amenities_input_edit" type="amenities" id="amenities" placeholder="Edit item" >
                </div>

                <div class="amenities_textarea_container">
                <div class="edit_category_amenities">Edit Category:</div>
                <select class="amenities_text_select" id="categoriInput">
                <option value="" selected disabled>Select a category</option>

          
        `;

        getCateg.forEach((content) => {
        
        str += `  
                
                <option value="${content.id}">${content.name}</option>



                `;
      });
      str += `
              <select>
                </div>

               
              <div class="submit_button_amenities">
                <button class="saveButtonAmenities" type="button" id="saveButtonUpdate">Save</button>
      
                <button class="cancelButtonAmenities" type="button" id="cancelButton">Cancel</button>
              </div>
            </form>`;

      $("#getCategoryID").append(str);

      console.log(data);
    })
    // if failed
    .fail(function (data) {
      console.error("not okay");
    });
};






$(document).on("click", "#saveButtonUpdate", function () {
  // Get the values from the form
  let id = $("#id").val();
  let category = $("#categoriInput option:selected").val();
  let amenities = $("#amenities").val();
  let icon = $("#file")[0].files[0];

  // Create a FormData object and add the values to it
  let formData = new FormData();
  formData.append('id', id);
  formData.append('category', category);
  formData.append('amenities', amenities);
  if (icon) {
    formData.append('icon', icon);
  }

  // Send a POST request to the server
  $.ajax({
    url: url + "updateAmenities",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (response) {
      if (response.success) {
        // Show a success message
        alert('Record updated successfully.');
      } else {
        // Show an error message
        alert(response.message);
      }
    },
    error: function () {
      // Handle error if AJAX request failed
      alert('Error: Failed to send AJAX request.');
    }
  });
});




$(document).on("click", ".delete-link", function () {
  let id = $(this).data("id");

  // Confirm delete action
  if (confirm("Are you sure you want to delete this category?")) {
    // AJAX call to delete category
    $.ajax({
      url: url + "deleteAmenities", // change to the correct PHP file
      type: "post",
      dataType: "json",
      data: {
        id: id,
      },
    })

      .done(function (data) {
        console.log(data);
      
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Category has been deleted.',
            showConfirmButton: false,
            timer: 1500
          });
          
          setTimeout(function() {
            location.reload();
          }, 1800);
        
      })
      .fail(function (data) {
        console.log(data );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  }
});

// $(document).on("click", ".delete-button", function () {
//   // Get the ID of the item being deleted
//   let itemId = $(this).data("id");
//   console.log(itemId);
//   // Confirm with the user before deleting the item
//   if (confirm("Are you sure you want to delete this item?")) {
//     // Send a DELETE request to the server
//     $.ajax({
//       url: url + "deleteAmenities",
//       type: "post",
//       data: {
//         id: itemId,
//       },
//       success: function (data) {
//         // post the data to the server
//         $.post(url + "deleteAmenities", {
//           id: itemId,
//         });
        
        
//         location.reload();
//       },
//       error: function(jqXHR, textStatus, errorThrown) {
//         console.log(textStatus, errorThrown);
//       }
//     });
//   }
// });
