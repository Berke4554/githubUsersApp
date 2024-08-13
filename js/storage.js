class Xstorage {
  //! *** HATIRLATMA *** -Bir sınıfın ıcerısındekı metotları static olarak olusturursak o sınıftan nesne turetmeden o metotlara erısebılırız

  //*JSON.stringify objeyi JSON’a çevirir.
  //* JSON.parse JSON’dan objeye çevirmeye yarar.(dizi de bir objedir)

  static key = "searchedUsers";

  static getSearchedUserFromStorage() {
    let users;

    if (localStorage.getItem(this.key) == null) {
      //*bu key'e sahip bir deger yoksa yani boş ise users dizimiz boş olacak
      users = [];
    } else {
      //*eger this.key ---> "searchedUsers" keyine sahip bir deger var ise users dizimiz o key'e sahip olan degeri ıcıne alacak
      users = JSON.parse(localStorage.getItem(this.key));
    }

    //? Ardından kosula göre deger alan users'ı return ederiz
    return users;
  }

  //*Daha onceden eklenmıs mı dıye kontrol edıyor
  static checkUser(username) {
    const users = this.getSearchedUserFromStorage();
    if (!users.includes(username)) {
      return true;
    }
    return false;
  }

  static addUserToStorage(username) {
    const users = this.getSearchedUserFromStorage();
    //*getSearchedUserFromStorage fonksıyonumuzun dondurdugu users degerlerını buradakı users degıskenımıze atadık

    if (this.checkUser(username)) {
      //!checkuser true ıse ıcerı gırecek
      //* 1-) username daha onceden dızımıze konulmadıysa
      users.push(username.trim());
      //* 2-) users dizimizin icerisine username'imizi ekleriz
      localStorage.setItem(this.key, JSON.stringify(users));
      //* 3-) users dizimizin son halini JSON.stringify metodu ile json formatına yani stringe ceviriyoruz ardından localStorage.setItem metodumuzla da keyini vermiş olduğumuz yere kaydedıyoruz
    }
  }

  static clearAllStorage() {
    localStorage.removeItem(this.key);
  }

  // static addSearchedUserToStorage(username) {
  //   const users = this.getSearchedUserFromStorage();
  //   if (users != null && users.length > 0) {
  //     if (!users.includes(username)) {
  //       users.push(username.trim());
  //       localStorage.setItem(this.key, JSON.stringify(users));
  //     }
  //   }
  // }
}
