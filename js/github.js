//Apiden istek atmamızı sağlayacak kısım

class Github {
  constructor() {
    this.url = "https://api.github.com/users/";
  }

  async getGithub(username) {
    // Hem kişi hem de kişinin repositosunun bılgılerı için istek attık
    const userData = await (await fetch(`${this.url}${username}`)).json();
    const repoData = await (await fetch(`${this.url}${username}/repos`)).json();

    return { user: userData, repo: repoData };
    // Promise olarak dönecek buradaki objemizi çünkü asenkron yapının ıcerısınde
  }
}
