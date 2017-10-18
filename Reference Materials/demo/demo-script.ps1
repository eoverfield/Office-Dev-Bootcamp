http://portal.office.com

u: admin@dev365x810645.onmicrosoft.com
p: ***


#demo 1 - intro to modern page - modern webparts - client side:

    #https://dev365x810645.sharepoint.com/sites/onlinemarketing
    #review sections and add quick links, linking to bing.com

#demo 2 - custom SPFx webpart in action

    #https://github.com/SharePoint/sp-dev-fx-webparts/
    #https://github.com/SharePoint/sp-dev-fx-webparts/tree/dev/samples/react-todo-basic

    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\02-react-todo-basic"
    gulp serve

    #load in remote workbench as well, add a task list and add tasks
    #https://dev365x810645.sharepoint.com/sites/onlinemarketing/_layouts/workbench.aspx

#demo 3 - install dev env
    
    #install latest LTS of node, www.nodejs.org
    
    npm install -g yo gulp
    npm install -g @microsoft/generator-sharepoint

    #https://code.visualstudio.com/

    node -v
    yo --version
    gulp --version
    yo --generators

#demo 4 - Set up SP dev env
    #Create app catalog:
    #https://dev365x810645-admin.sharepoint.com/_layouts/15/online/tenantadminapps.aspx

    #Create a dev site - mainly for add-on dev, but works well for us
    #https://dev365x810645-admin.sharepoint.com/_layouts/15/online/SiteCollections.aspx

    #Load workbench in dev tenant
    #https://dev365x810645.sharepoint.com/sites/dev/_layouts/workbench.aspx 

    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\04-hello-world"
    gulp serve

    #load workbench again in dev tenant

#demo 5 - Create our first webpart

    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\05-hello-world"

    yo @microsoft/sharepoint

    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\04-hello-world"
    gulp serve

    #debug in workbench, look at mapping files
    #source -> dist -> Ctrl-P
    #look for Hello...ts
    #set breakpoint on RenderDom
    #refresh, F8 to continue

#demo 6 - Review webpart structure
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\04-hello-world"
    code .

    #look at ts and scss files, configuration as well

#demo 7 - Review webpart in workbenches, local and remote
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\04-hello-world"

    gulp serve

    #load in dev workbench as well.
    #https://dev365x810645.sharepoint.com/sites/dev/_layouts/workbench.aspx 
    
#demo 8 - Status indicators
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\08-status-indicators"
    gulp serve

    #work through StatusIndicatorsWebPart.ts and add status indicators back in

#demo 9 - Mock data
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\09-sharepoint-data"

    yo @microsoft/sharepoint
    #create new webpart - Bootcamp Data
    gulp serve --nobrowser
    #copy over code from "MockData"

#demo 10 - SharePoint data
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\09-sharepoint-data"

    yo @microsoft/sharepoint
    #add SharePoint Data to "Bootcamp Data"
    gulp serve --nobrowser
    #copy over code from "SharePointData"

    #https://dev365x810645.sharepoint.com/sites/dev/_layouts/workbench.aspx 

#demo 11 - SharePoint CRUD operations
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\09-sharepoint-data"

    yo @microsoft/sharepoint
    #create new webpart - Bootcamp CRUD
    gulp serve --nobrowser
    #copy over code from "SharePointCRUD"

    #load: #https://dev365x810645.sharepoint.com/sites/dev/_layouts/workbench.aspx 

    #will not work in local workbench, no mock data
    #Create a test list: "Test"
   

#demo 12 - Basic React Webpart
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\12-sharepoint-ui-fabric"

    #review HelloWorld React webpart
    npm i office-ui-fabric-react --save
    #review package.json


#demo 13 - Basic Office UI Fabric integration
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\12-sharepoint-ui-fabric"
    
    #review: https://developer.microsoft.com/en-us/fabric

    yo @microsoft/sharepoint
    #create new webpart - UI Fabric - React
    gulp serve --nobrowser
    #copy over code from "SharePointUIFabric"


#demo 14 - Office UI Fabric integration - extended, following advice
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\12-sharepoint-ui-fabric"
    
    #https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/office-ui-fabric-integration

    yo @microsoft/sharepoint
    #create new webpart - UI Fabric - React2
    gulp serve --nobrowser
    #copy over code from "SharePointUIFabric2"

    #review more examples:
    #https://github.com/SharePoint/sp-dev-fx-webparts/

    
#demo 15 - UI Fabric method

    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\02-react-todo-basic"
    code .
    gulp serve

    #look at different components and how they nest, with state


#demo 16 - Webpart properties
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\16-sharepoint-props"

    yo @microsoft/sharepoint
    #create new webpart - Bootcamp Props - no framework
    gulp serve --nobrowser
    #copy over code from "SharePointProps"
    #when updating manifest with default values, restart gulp

    yo @microsoft/sharepoint
    #create new webpart - Bootcamp Props React - React Framework
    gulp serve --nobrowser
    #copy over code from "SharePointPropsReact"

#demo 17 - Webpart custom properties
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\17-sharepoint-custom-props"

    #create a new custom property
    yo @microsoft/sharepoint
    #create new webpart - Bootcamp Props - no framework
    gulp serve --nobrowser
    #copy over code from "SharePointProps"


    #check out detailed example of react as well
    #https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-custompropertypanecontrols
    cd "E:\Datastore\Git Projects\GitHub\SPDevFXWebparts\samples\react-custompropertypanecontrols"
    gulp serve --nobrowser

#demo 18 - loading javascript libraries
    cd "E:\Datastore\Git Projects\GitHub\OfficeDevTraining\SharePointFramework\demos\18-javascript-libraries"

    #create a new custom property
    yo @microsoft/sharepoint
    #create new webpart - Bootcamp jQuery - no framework
    
    #copy over code from "JavaScriptLibs"
    #package.json, config.json, then
    
    gulp serve --nobrowser
    
    #then primary code and review

