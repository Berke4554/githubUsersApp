class UI {
  constructor() {
    this.profileContentRow = document.querySelector("#profileContentRow");
    this.githubNameInput = document.querySelector("#userSearchBar");
    this.tableContent = document.querySelector("#tableContent");
    this.reposTable = document.querySelector("#reposTable");
    this.searchedUserList = document.querySelector("#searchedUserList");
    this.isShowRepo = true;
  }

  fillSearchedUserToUIFromStorage() {
    const users = Xstorage.getSearchedUserFromStorage();
    users.forEach((user) => {
      this.searchedUserList.innerHTML += `<li class="list-group-item">${user}</li>`;
    });
  }

  addSearchedUserToUI(username) {
    if (Xstorage.checkUser(username)) {
      //*Kullanıcı storage'da var ise ui olarak tekrar tekrar eklememizi önlemiş olur
      //!checkUser true donmesı demek bu kullanıcı daha onceden kayıtlı degıl oyleyse ekleyebılırsın demek
      this.searchedUserList.innerHTML += `<li class="list-group-item">${username}</li>`;
    }
  }

  addUserProfileToUI(user) {
    //! this.profileContentRow.style.display = "flex";
    this.reposTable.style.display = "none"; //! addUserProfileToUI calıstıgında reposTable none olacak
    this.isShowRepo = true; //! addUserProfileToUI calıstıgında isShowRepo true olsun ki repoları kapatmadan farklı bir kullanıcı arattıgımızda o kullanıcının repolarını ac dedıgımızde dırekt acabılsın
    //* id'sinden yakaladıgımız div'in icerisine template literals ile verilerimizi ve tasarımlarımızı ekliyoruz.
    this.profileContentRow.innerHTML = `
     <div class="col-sm-12 col-md-4 col-lg-4">
          <div id="profileDiv">
            <img
              id="profileImg"
              class="mb-3"
              src=${user.avatar_url}
              width="200"
              height="200"
            />
            <hr style="width: 200px" />
            <span>${user.name}</span>
            <span> Software Developer</span>
          </div>
        </div>
        <div class="col-sm-12 col-md-8 col-lg-8">
          <!--* Butonlar -->
          <div id="badgeDiv" class="mt-2 mt-sm-2 gap-3">
            <button type="button" class="btn btn-primary">
              Takipçi <span class="badge text-bg-light">${user.followers}</span>
            </button>
            <button type="button" class="my-2 my-sm-0 btn btn-success">
              Takip <span class="badge text-bg-light">${user.following}</span>
            </button>
            <button type="button" class="btn btn-secondary">
             Repository <span class="badge text-bg-light"> ${
               user.public_repos
             }</span>
            </button>
          </div>
          <div id="infoDiv" class="mt-3">
            <div class="info m-3">
              <i class="fa-regular fa-building fa-2x"></i>
              <span>${user.company}</span>
            </div>
            <div class="info m-3">
              <i class="fa-solid fa-location-dot fa-2x"></i>
              <span>${user.location}</span>
            </div>
            <div class="info m-3 ">
              <i class="fa-regular fa-envelope fa-2x"></i>
              <span>${
                user.email == null ? "Veri girilmemiş" : user.email
              }</span>
            </div>
            <div class="info m-3">
              <a id="reposButton" href="#">Repoları Göster</a>
            </div>
          </div>
        </div>  
    `;
  }

  changeMessage() {
    if (this.isShowRepo == false) {
      //!Elementimizi constructor yerine burada sectık cunku bu element uygulama basladıgı gıbı olusan bır yapı degıl kullanıcı olusturulduktan sonra va oluyor eger constructor'da yapsaydık null olurdu
      document.querySelector("#reposButton").textContent = "Repoları Kapat";
    } else {
      document.querySelector("#reposButton").textContent = "Repoları Göster";
    }
  }

  showRepos(repos) {
    this.tableContent.innerHTML = ""; //! temizle butonunu kullanmadan silmek isteyenler olursa diye repoları birleştirme hatası olmasın dıye. Yani önceki kullanıcının repoları ile sonraki kullanıcının repoları birleşmesin

    if (this.isShowRepo === true) {
      //*true ise repoları göster
      this.reposTable.style.display = "flex";
      //! table içeriklerini oluşturup repoları giriyoruz hem ui hem data olarak
      if (repos != null && repos.length > 0) {
        let sayac = 0;
        repos.forEach((repo) => {
          sayac++;
          this.tableContent.innerHTML += `
        <tr>
            <th scope="row">${sayac}</th>
            <td>${repo.name}</td>
            <td>${repo.created_at}</td>
        </tr>
        `;
        });
      }
      // *false yap ardından mesajı da false'a göre degistiren metodumuzu cagır
      this.isShowRepo = false;
      this.changeMessage();
    } else {
      //* true degilse
      this.reposTable.style.display = "none";
      this.isShowRepo = true;
      this.changeMessage();
      this.tableContent.innerHTML = "";
    }
  }

  clearInput() {
    //!temizle tusuna bastıgımda eger repolar acıksa kapatması ıcın buraya da koyduk
    this.reposTable.style.display = "none";
    this.githubNameInput.value = "";
    this.profileContentRow.innerHTML = "";
    // * this.profileContentRow.style.display = "none";
  }
}
