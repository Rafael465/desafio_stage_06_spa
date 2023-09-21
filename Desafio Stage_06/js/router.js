export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()
        console.log(event)
        window.history.pushState({}, "", event.target.href)
    
        this.handle()
    }

    handle() {
        const { pathname } = window.location
        
        let route
        
        if(pathname === "/index.html") {
          route = this.routes["/"]
        } else {
          route = this.routes[pathname]
        }
        
        this.changeBackground(route)
        
        fetch(route)
          .then(data => data.text())
          .then(html => {
          document.querySelector("#app").innerHTML = html
        })
    }
      
    changeBackground() {
        const { pathname } = window.location;
        const page = document.querySelector("body");
        let currentBackground;
    
        switch (pathname) {
            case "/":
                currentBackground = "/images/background1.png";
                break;
            case "/universo":
                currentBackground = "/images/background2.png";
                break;
            case "/explorar":
                currentBackground = "/images/background3.png";
                break;
        }
    
        page.style.setProperty("background-image", `url(${currentBackground})`);
    }
}