import express from 'express'
import bodyParser from 'body-parser';
import { Routes } from 'interfaces/routes.interface';


class App {
    private app: express.Application

    constructor(routes: Routes[]){
        this.app = express()
        this.app.use(bodyParser.json())
        this.initializeRoutes(routes,'/api/')

    }
    public async listen(){
        this.app.listen(1337,()=>{
            console.log('App listening on port 1337')
        })
    }
    public get Server() {
        return this.app;
    }
    private initializeRoutes(routes: Routes[],basePath:string){
        routes.forEach((route)=>{
            this.app.use(basePath,route.router)
        })
    }

}

export default App;