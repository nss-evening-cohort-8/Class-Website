// initialize the tool-tip plugin for Bootstrap4
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

const proImgList = [];
const funImgList = [];

document.getElementById('cohort').addEventListener('mouseover', (event) => {
  if (event.target.id.includes('img')) {
    const indexer = parseInt(event.target.id.replace('img', ''), 10);
    event.target.src = funImgList[indexer - 1];
  }
});

document.getElementById('cohort').addEventListener('mouseout', (event) => {
  if (event.target.id.includes('img')) {
    const indexer = parseInt(event.target.id.replace('img', ''), 10);
    event.target.src = proImgList[indexer - 1];
  }
});

$.ajax({
  url: "data/cohort.json"
}).done(cohortMembers)
  .fail(function (error) {
    console.log("error", error);
  });

function cohortMembers(list) {
  let data = list.cohort;
  data.forEach(function (item) {
    let studentContact = `<div class="studentContact">`
    //if student doesn't have a portfolio site then don't display the icon
    if (item.portfolio != null && item.portfolio != '') {

      studentContact += `<a href=${item.portfolio} target="_blank">
      <i class="fas fa-globe fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a github site then don't display the icon
    if (item.github != null) {

      studentContact += `<a href=${item.github} target="_blank">
      <i class="fab fa-github fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a linkedin site then don't display the icon
    if (item.linkedIn != null) {

      studentContact += `<a href=${item.linkedIn} target="_blank">
      <i class="fab fa-linkedin fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have an email then don't display the icon
    if (item.email != null) {

      studentContact += `<a href=mailto:${item.email}>
              <i class="fas fa-envelope fa-2x contactIcons"></i>
            </a>`
    }
    studentContact += `</div>`

    let studentInfo = `<div class="col-md-3 cohortMems">
          <img class="card-img-top" src="${item.proImg}" alt="${item.firstName} ${item.lastName}"
            data-toggle="modal" data-target="#cohortMember${item.id}" style="cursor:pointer;" id='img${item.id}'>
          <div class="card-body studentCardBody">
            <h4 class="card-title title-font">${item.firstName} ${item.lastName}</h4>`
    //if student didn't provide a reelthemin quote then nothing is displayed
    if (item.reelThemIn != null) {
      studentInfo += `<div class='studentCardTextContainer'><p class="card-text">${item.reelThemIn}</p></div>`
    }
    studentInfo += studentContact

    //if a student doesn't have a bio, then the learn more button doesn't appear and a modal isn't created
    if(item.bio != null){

    studentInfo += `
            <center><button type="button" class="btn btn-outline-primary title-font bottom" data-toggle="modal" data-target="#cohortMember${item.id}">
           Learn More!
          </button></center>
          </div>
        </div>`
    //modal info
    studentInfo +=`
        <div class="modal fade" id="cohortMember${item.id}" tabindex="-1" role="dialog" aria-labelledby="cohortMember${item.id}Label" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
           <h5 class="modal-title title-font" id="cohortMember${item.id}Label">${item.firstName} ${item.lastName}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <center><img src="${item.funImg}" /></center><br>

            `

    studentInfo += studentContact


    studentInfo += `
      
    ${item.bio}
    </div>
    <center><button type="button" data-dismiss="modal" class="backButton btn btn-outline-primary title-font bottom" aria-label="Close">
      Back
              </button></center>
            
          </div >
        </div >
      </div > `;
    } else {
      studentInfo += `
      </div>
        </div>
        `
    }
    document.getElementById("cohort").innerHTML += studentInfo;
    proImgList.push(item.proImg);
    funImgList.push(item.funImg);
  });
};
//checks to see if url string is empty, if not, creates specified image
function createLink(urlString, img, mail) {
  let link = urlString !== '' ? `< a href = "${urlString}" target = "_blank" > <img src="/images/${img}.png"></a>` : '<!-- -->';
  return link
};

function createMailto(urlString, img) {
  let link = urlString !== '' ? `< a href = "mailto:${urlString}" target = "_blank" > <img src="/images/${img}.png"></a>` : '<!-- -->'
  return link
}

$.ajax({
  url: "data/techs.json"
}).done(techs)
  .fail(function (error) {
    console.log("error", error);
  });

function techs(list) {
  let data = list.techs;
  data.forEach(function (item) {
    document.getElementById("techs").innerHTML +=
      `<div class="col-sm-2 technologies">
         <center><a href="${item.link}" target="_blank"><img class="techs" src="${item.image}" alt="${item.name}" data-toggle="tooltip" data-placement="top" title="${item.name}"></a><br>
         </center>
      </div>`;
  });
};
