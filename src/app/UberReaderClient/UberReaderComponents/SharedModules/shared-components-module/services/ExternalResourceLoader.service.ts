import { Injectable } from '@angular/core';
import { DictionaryString } from '../../../../../UberReaderData/Utils/Dictionary';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

declare var google:any;

@Injectable()
export class ExternalResourceLoaderService {

    private resourcesAvailable:string[] = [];
    private resourcesInLoading:any[] = [];
    public avatarLoaded: Subject<any> = new Subject();

    public GetVideoJs(callback:() => void)
    {
        var jsFiles:string[] = [];
        var cssFiles:string[] = ["https://www.vjs.zencdn.net/5.11/video-js.min.css"];
        this.loadMultipleResources(jsFiles, cssFiles, () =>
        {
            callback();
        });
        // var jsFiles:string[] = [AppSettings.GetAssetLocation() + "libs/videojs/video.min.js"]
        // //var jsFiles:string[] = [];
        // var cssFiles:string[] = []
        // //var cssFiles:string[] = ["https://www.vjs.zencdn.net/5.11/video-js.min.css"];
        // this.loadMultipleResources(jsFiles, cssFiles, () =>
        // {
        //     var jsFiles2:string[] = [ AppSettings.GetAssetLocation() + "libs/videojs/videojs-contrib-hls.min.js",
        //         AppSettings.GetAssetLocation() + "libs/videojs/dash.all.min.js",
        //         AppSettings.GetAssetLocation() + "libs/videojs/videojs-dash.min.js"];
        //     var cssFiles2:string[] = []
        //     this.loadMultipleResources(jsFiles2, cssFiles2, () =>
        //     {
        //         callback();
        //     });
        //     //(window as any).videojs = videojs;
        //     //callback();
        // });
    }

    // private googlechartsStartedLoading:boolean = false;
    // private googleChartsCallBacks:(() => void)[] = [];
    private googlechartsLoaded:boolean = false;
    public GetGoogleCharts(callback:() => void):void
    {
        var jsFiles:string[] = [AppSettings.GetAssetLocation() + 'assets/script/loader.js'/* "https://www.www.gstatic.com/charts/loader.js" */];

        var cssFiles:string[] = [];
        if (this.googlechartsLoaded) {
            callback();
        }
        else {
            this.loadMultipleResources(jsFiles, cssFiles, () => {
                google.charts.load('current', { packages:['corechart', 'bar', 'gauge'] });
                google.charts.setOnLoadCallback(() => {
                    console.log('GOOGLE CHARTS LOADED!!!!!');
                    this.googlechartsLoaded = true;
                    callback();
                });
            });
        }
    }
    
    public GetBootstrapTour(callback:() => void):void
    {
        var jsFiles:string[] = [AppSettings.GetAssetLocation() + "libs/bootstrap-tour/bootstrap-tour-standalone.min.js"];
        var cssFiles:string[] = [AppSettings.GetAssetLocation() + "libs/bootstrap-tour/bootstrap-tour-standalone.min.css"];
        this.loadMultipleResources(jsFiles, cssFiles, () =>
        {
            callback();
        });
    }

    public GetMdlExt(callback:() => void):void
    {
        //var jsFiles:string[] = ["libs/eq.min.js", "libs/mdl-ext/mdl-ext.min.js"];
        var jsFiles:string[] = [];
        var cssFiles:string[] = [AppSettings.GetAssetLocation() + "libs/mdl-ext/mdl-ext-eqjs.min.css"];
        this.loadMultipleResources(jsFiles, cssFiles, () =>
        {
            callback();
        });
    }

    public GetMaterialDatePicker():Observable<any>
    {
        var jsFiles:string[] = [AppSettings.GetAssetLocation() + "libs/material-datepicker/material-datetime-picker.standalone.js"];
        var cssFiles:string[] = [AppSettings.GetAssetLocation() + "libs/material-datepicker/material-datetime-picker.css"];
        return this.loadMultipleResources2(jsFiles, cssFiles);
    }

    public GetPdfMake():Observable<any>
    {
        var jsFiles:string[] = [
            AppSettings.GetAssetLocation() + "libs/pdfmake/pdfmake.min.js"
            //AppSettings.GetAssetLocation() + "libs/pdfmake/vfs_fonts.js"
        ];
        var cssFiles:string[] = [];
        return this.loadMultipleResources2(jsFiles, cssFiles);
    }

    public LoadOdometerFiles(): Observable<any>
    {
        let elementIds: string[] = ['odometer1', 'odometer2'];
        let jsFiles:string[] = [AppSettings.GetAssetLocation() + "libs/odometer/odometer.js"];
        let cssFiles:string[] = [AppSettings.GetAssetLocation() + "libs/odometer/odometer.css"];

        //let odometer resources be recreated / reloaded for every call of this function
        //thus, remove these files first if they are already in the resourcesAvailable variable
        //and remove their corresponding html elements created previously - RemoveOdometerResources()
        let odometerResources: string[] = jsFiles.concat(cssFiles);
        for(let file of odometerResources) {
            if (this.resourcesAvailable.indexOf(file) > -1) {
                this.resourcesAvailable.splice(this.resourcesAvailable.indexOf(file), 1);
            }
        }

        return this.loadMultipleResources2(jsFiles, cssFiles, elementIds);
    }

    public RemoveOdometerResources(): void {
        let head = document.getElementsByTagName('head')[0];
        let elementIds: string[] = ['odometer1', 'odometer2'];

        for (let _id of elementIds) {
            let child = document.getElementById(_id);
            if(child)
                head.removeChild(child);
        }
    }

    public LoadAvatarBuilderFiles(): Observable<any>
    {
        let elementIds: string[] = ['avatarSrc1', 'avatarSrc2', 'avatarSrc3', 'avatarSrc4', 'avatarSrc5',
                                    'avatarSrc6', 'avatarSrc7', 'avatarSrc8', 'avatarSrc9', 'avatarSrc10'];

        let jsFiles:string[] = [AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/js/tools/svg.min.js",
                                AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/js/tools/jquery.scrollbar.js",
                                AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/js/tools/spectrum.min.js",
                                AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/js/tools/rgbcolor.js",
                                AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/js/tools/StackBlur.js",
                                AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/js/tools/canvg.min.js",
                                AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/js/typesy-svgavatars.defaults.js",
                                AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/js/languages/svgavatars.en.js"];

        let cssFiles:string[] = [AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/css/spectrum.css",
                                 AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/css/svgavatars.css"];

        /*let jsFiles:string[] = ["https://www.typesy.com/avatar-generator/svgavatars/js/svg.min.js",
                                "https://www.typesy.com/avatar-generator/svgavatars/js/spectrum.min.js",
                                "https://www.typesy.com/avatar-generator/svgavatars/js/jquery.scrollbar.min.js",
                                "https://www.typesy.com/avatar-generator/svgavatars/js/canvg/rgbcolor.js",
                                "https://www.typesy.com/avatar-generator/svgavatars/js/canvg/StackBlur.js",
                                "https://www.typesy.com/avatar-generator/svgavatars/js/canvg/canvg.js",
                                "https://www.typesy.com/avatar-generator/svgavatars/js/svgavatars.en.js",
                                "https://www.typesy.com/avatar-generator/svgavatars/js/svgavatars.core.min.js"];

         let cssFiles:string[] = ["https://www.typesy.com/avatar-generator/svgavatars/css/spectrum.css",
                                  "https://www.typesy.com/avatar-generator/svgavatars/css/svgavatars.css"];*/

        //let avatar resources be recreated / reloaded for every call of this function
        //thus, remove these files first if they are already in the resourcesAvailable variable
        //and remove their corresponding html elements created previously - RemoveAvatarGeneratorResources()
        let avatarResources: string[] = jsFiles.concat(cssFiles);
        for(let file of avatarResources) {
            if (this.resourcesAvailable.indexOf(file) > -1) {
                this.resourcesAvailable.splice(this.resourcesAvailable.indexOf(file), 1);
            }
        }

        return this.loadMultipleResources2(jsFiles, cssFiles, elementIds);
    }

    public LoadAvatarBuilderMainFile(): Observable<any> {
        let jsFile: string[] = [AppSettings.GetAssetLocation() + "libs/avatar-generator/svgAvatars-1.5/svgavatars/js/typesy-svgavatars.core.min.js"];
        if (this.resourcesAvailable.indexOf(jsFile[0]) > -1) {
            this.resourcesAvailable.splice(this.resourcesAvailable.indexOf(jsFile[0]), 1);
        }
        return this.loadMultipleResources2(jsFile, [], ['avatarSrc11']);
    }

    //called upon closing Profile Dialog
    public RemoveAvatarGeneratorResources(): void {
        let head = document.getElementsByTagName('head')[0];
        let elementIds: string[] = ['avatarSrc1', 'avatarSrc2', 'avatarSrc3', 'avatarSrc4', 'avatarSrc5', 'avatarSrc6',
                                    'avatarSrc7', 'avatarSrc8', 'avatarSrc9', 'avatarSrc10', 'avatarSrc11', 'avatarSrc12'];

        for (let _id of elementIds) {
            let child = document.getElementById(_id);
            if(child)
                head.removeChild(child);
        }
    }

    public LoadTypesyGameAPI(): Observable<any> {
        /** let jsFiles: string[] = ['./app/UberReaderActivities/typesy-activities-module/extended-games/TypesyGameAPI.js',
                                  './games/jquery.ba-dotimeout.min.js']; */
        let jsFiles: string[] = [AppSettings.GetAssetLocation() + 'games/TypesyGameAPI.min12.js',
                                  AppSettings.GetAssetLocation() + 'games/TypesyGameAPIext.js',
                                  AppSettings.GetAssetLocation() + 'games/jquery.ba-dotimeout.min.js'];
        let cssFiles:string[] = [];
        return this.loadMultipleResources2(jsFiles, cssFiles);
    }

    public LoadTypesyGameResources(nameOfGame: string, jsFiles: string[], cssFiles: string[]): Observable<any> {
        let gameResources: string[] = jsFiles.concat(cssFiles);

        let elementIds: string[] = [];
        for (let i = 0; i < gameResources.length; i++) {
            elementIds.push(nameOfGame + i);
        }

        // return observer right away if there are no files to be loaded
        if (gameResources == null || gameResources.length == 0) {
          return Observable.create(observer => {
            observer.next();
            observer.complete();
          });
        }

        for(let file of gameResources) {
            if (this.resourcesAvailable.indexOf(file) > -1) {
                this.resourcesAvailable.splice(this.resourcesAvailable.indexOf(file), 1);
            }
        }
        return this.loadMultipleResources2(jsFiles, cssFiles, elementIds);
    }

    public RemoveTypesyGameResources(nameOfGame: string, gameResouces: string[]): void {
        let head = document.getElementsByTagName('head')[0];
        for (let i = 0; i < gameResouces.length; i++) {
            let child = document.getElementById(nameOfGame + i);
            if(child)
                head.removeChild(child);
        }
    }

    public LoadGradingChartResources(): Observable<any> {
        let elementIds: string[] = ['gradingChart1', 'gradingChart2'];
        let jsFiles:string[] = ["https://code.highcharts.com/highcharts.js", "https://code.highcharts.com/modules/draggable-points.js"];

        //let grading chart resources be recreated / reloaded for every call of this function
        //thus, remove these files first if they are already in the resourcesAvailable variable
        //and remove their corresponding html elements created previously - RemoveGradingChartResources()
        for(let file of jsFiles) {
            if (this.resourcesAvailable.indexOf(file) > -1) {
                this.resourcesAvailable.splice(this.resourcesAvailable.indexOf(file), 1);
            }
        }

        return this.loadMultipleResources2(jsFiles, [], elementIds);
    }

    public RemoveGradingChartResources(): void {
        let head = document.getElementsByTagName('head')[0];
        let child1 = document.getElementById("gradingChart1");
        if(child1) head.removeChild(child1);

        let child2 = document.getElementById("gradingChart2");
        if(child2) head.removeChild(child2);

        let child3 = document.getElementById("gradingTemplateChart");
        if(child3) head.removeChild(child3);
    }

    private waitingResourceSubject: Subject<string> = new Subject();
    // angular way of handling callbacks
    public loadMultipleResources2(jsFiles:string[], cssFiles:string[], elementIds?:string[]): Observable<any>
    {
        return Observable.create(observer => {
            let elementIdIndex: number = 0;
            let head = document.getElementsByTagName('head')[0];
            let resourcesToLoad:string[] = jsFiles.concat(cssFiles);
            let resourceLoaded = () =>
            {
                if (resourcesToLoad.length == 0)
                {
                    observer.next();
                    observer.complete();
                }
            }

            for (let jsFile of jsFiles)
            {
                if (this.resourcesAvailable.indexOf(jsFile) > -1)
                {
                    resourcesToLoad.splice(resourcesToLoad.indexOf(jsFile), 1);
                    resourceLoaded();
                }
                else if (this.resourcesInLoading.indexOf(jsFile) > -1) {
                    this.waitingResourceSubject.subscribe((resource) => {
                        if (resource == jsFile) {
                            resourcesToLoad.splice(resourcesToLoad.indexOf(jsFile), 1);
                            resourceLoaded();
                        }
                    });
                }
                else
                {
                    let script: any = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = jsFile;

                    if(elementIds && elementIds[elementIdIndex]) {
                        script.id = elementIds[elementIdIndex++];
                    }

                    script.onload = () => {
                        this.resourcesAvailable.push(jsFile);
                        this.resourcesInLoading.splice(this.resourcesInLoading.indexOf(jsFile), 1);
                        resourcesToLoad.splice(resourcesToLoad.indexOf(jsFile), 1);
                        resourceLoaded();
                        this.waitingResourceSubject.next(jsFile);
                    };
                    head.appendChild(script);
                    this.resourcesInLoading.push(jsFile);
                }
            }
            for (let cssFile of cssFiles)
            {
                if (this.resourcesAvailable.indexOf(cssFile) > -1)
                {
                    resourcesToLoad.splice(resourcesToLoad.indexOf(cssFile), 1);
                    resourceLoaded();
                }
                else
                {
                    let link = document.createElement('link');
                    link.href = cssFile;
                    link.rel = 'stylesheet';
                    link.type = 'text/css';

                    if(elementIds && elementIds[elementIdIndex]) {
                        link.id = elementIds[elementIdIndex++];
                    }

                    link.onload = () => {
                        this.resourcesAvailable.push(cssFile);
                        resourcesToLoad.splice(resourcesToLoad.indexOf(cssFile), 1);
                        resourceLoaded();
                    };
                    head.appendChild(link);
                }
            }
        });
    }

    public loadMultipleResources(jsFiles:string[], cssFiles:string[], callback:() => void)
    {
        let head = document.getElementsByTagName('head')[0];
        let resourcesToLoad:string[] = jsFiles.concat(cssFiles);
        let resourceLoaded = function ():void
        {
            if (resourcesToLoad.length == 0)
            {
                callback();
            }
        }

        for (let jsFile of jsFiles)
        {
            if (this.resourcesAvailable.indexOf(jsFile) > -1)
            {
                resourcesToLoad.splice(resourcesToLoad.indexOf(jsFile), 1);
                resourceLoaded();
            }
            else
            {
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = jsFile;
                script.onload = () => {
                    this.resourcesAvailable.push(jsFile);
                    resourcesToLoad.splice(resourcesToLoad.indexOf(jsFile), 1);
                    resourceLoaded();
                };
                head.appendChild(script);
            }
        }
        for (let cssFile of cssFiles)
        {
            if (this.resourcesAvailable.indexOf(cssFile) > -1)
            {
                resourcesToLoad.splice(resourcesToLoad.indexOf(cssFile), 1);
                resourceLoaded();
            }
            else
            {
                let link = document.createElement('link');
                link.href = cssFile;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.onload = () => {
                    this.resourcesAvailable.push(cssFile);
                    resourcesToLoad.splice(resourcesToLoad.indexOf(cssFile), 1);
                    resourceLoaded();
                };
                head.appendChild(link);
            }
        }
    }
}
