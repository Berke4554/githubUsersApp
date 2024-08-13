const userSearchBar = document.querySelector("#userSearchBar");
const userSearchForm = document.querySelector("#userSearchForm");
const clearButton = document.querySelector("#clear");
const profileContentRow = document.querySelector("#profileContentRow");
const clearAll = document.querySelector("#clearAll");

//* Github sınıfımızdan nesne ürettik bu nesne ile getGithub metodumuza ulaşıp apiden veri çekmeye çalışacağız
const github = new Github();

const ui = new UI();

runEventListeners();

function runEventListeners() {
  userSearchForm.addEventListener("submit", getUser);
  clearButton.addEventListener("click", clearInput);
  document.addEventListener("DOMContentLoaded", runPageLoaded);
  clearAll.addEventListener("click", clearUsers);
}

function clearUsers() {
  Xstorage.clearAllStorage();
  ui.searchedUserList.innerHTML = ""; //! son arananların ui'ını temızledı
}

function runPageLoaded() {
  ui.fillSearchedUserToUIFromStorage();
}

//*ui sınıfımızın içerisindeki clear metodunu cagırdık fonksıyonumuzun ıcınde
function clearInput() {
  ui.clearInput();
  profileContentRow.style.display = "none";
}

function getUser(e) {
  e.preventDefault();
  const userName = userSearchBar.value.trim();

  if (userName == null || userName == "") {
    alert("Lütfen bir kullanıcı adı giriniz!");
  } else {
    // İşleme Devam et
    github
      .getGithub(userName)
      .then((response) => {
        //! Kullanıcıyı ekle
        ui.addSearchedUserToUI(userName); //*Son arananlara ui olarak ekle
        Xstorage.addUserToStorage(userName); //*Storage'a ekle
        ui.addUserProfileToUI(response.user); //*kullanıcı profilini ui ekle
        //* asagıdakının, yukarıdaki fonksıyondan sonra olması gerek cunku orada arayuze reposButton eklenıyor o olmadan secım yapamayız repo'larımız da olmaz kullanı olmadan
        //! reposButton'u seç event ekle ve Repoları göster
        document.querySelector("#reposButton").addEventListener("click", () => {
          ui.showRepos(response.repo);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  profileContentRow.style.display = "flex";
}
