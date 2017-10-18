import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JavaScriptLibsWebPart.module.scss';
import * as strings from 'JavaScriptLibsWebPartStrings';

export interface IJavaScriptLibsWebPartProps {
  description: string;
}

//add
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import * as jQuery from 'jquery';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import 'jqueryui';

interface ITask {
  Id: number;
  Title: string;
  StartDate: Date;
  DueDate: Date;
  TaskStatus: string;
}

class MockHttpClient {
  
    private static _items: ITask[] = [
    { Title: 'Mock Task 1', Id: 1, StartDate: new Date(2017, 10, 22), DueDate: new Date(2017, 10, 23), TaskStatus: 'New'  },
    { Title: 'Mock Task 2', Id: 2, StartDate: new Date(2017, 10, 22), DueDate: new Date(2017, 10, 23), TaskStatus: 'In Progress'  },
    { Title: 'Mock Task 3', Id: 3, StartDate: new Date(2017, 10, 22), DueDate: new Date(2017, 10, 23), TaskStatus: 'Complete'  },
    { Title: 'Mock Task 4', Id: 4, StartDate: new Date(2017, 10, 22), DueDate: new Date(2017, 10, 23), TaskStatus: 'New'  },
    { Title: 'Mock Task 5', Id: 5, StartDate: new Date(2017, 10, 22), DueDate: new Date(2017, 10, 23), TaskStatus: 'In Progress'  }
    ];

    public static get(restUrl: string, options?: any): Promise<ITask[]> {
    return new Promise<ITask[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}


export default class JavaScriptLibsWebPartWebPart extends BaseClientSideWebPart<IJavaScriptLibsWebPartProps> {
  //add
  private _listName: string = "Tasks";
  
  //replace
  public render(): void {
    require("../../../node_modules/jqueryui/jquery-ui.css");
    require("../../../node_modules/chartist/dist/chartist.min.css");

    this.getListItems()
      .then((items: ITask[]) => {
        this.renderListItems(items);
      });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }


  //add

  private _getMockListData(): Promise<ITask[]> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl)
        .then((data: ITask[]) => {
              return data;
          });
  }

  private _getSharePointListItems(): Promise<ITask[]> {
    const url: string = this.context.pageContext["web"]["absoluteUrl"]
      + `/_api/web/lists/GetByTitle('${this._listName}')/items?$select=Id,Title,StartDate,TaskDueDate,TaskStatus`;
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse): Promise<any> => {
        return response.json();
      })
      .then((data: any): ITask[] => {
        return data.value;
      }) as Promise<ITask[]>;
  }

  private getListItems(): Promise<ITask[]> {
    if(Environment.type === EnvironmentType.Local) {
        return this._getMockListData();
    }
    else {
      return this._getSharePointListItems();
    }
  }


  private renderListItems(items: ITask[]): void {
    const groupedItems = {};
    for (const item of items) {
      if (groupedItems[item.TaskStatus] == undefined) {
        groupedItems[item.TaskStatus] = [];
      }
      groupedItems[item.TaskStatus].push(item);
    }

    const chartistData = {
      labels: [],
      series: []
    };

    let html: string = '<div class="accordion">';
    for (const key in groupedItems) {
      const value = groupedItems[key];
      html += `<h3>${key}</h3>`;
      html += '<div><table><thead><tr><td>Task Name</td><td>Start Date</td><td>Due Date</td></tr></thead>';
      for (const item of value) {
        html += `<tr><td>${item.Title}</td><td>${moment(item.StartDate).format('MM/DD/YYYY')}</td><td>${moment(item.TaskDueDate).format('MM/DD/YYYY')}</td></tr>`;
      }
      html += '</table></div>';

      chartistData.labels.push(key);
      chartistData.series.push(value.length);
    }
    html += '</div>';
    html += `<div class="${styles.pieChartContainer}"><h3>Pie Chart</h3><div><div class="ct-chart"></div></div></div>`;
    this.domElement.innerHTML = `<div class="${styles.javaScriptLibs}"><div class="${styles.container}">${html}</div></div>`;

    const accordionOptions: JQueryUI.AccordionOptions = {
      animate: true,
      collapsible: false,
      icons: {
        header: 'ui-icon-circle-arrow-e',
        activeHeader: 'ui-icon-circle-arrow-s'
      }
    };

    const rootDom = jQuery(this.domElement);
    rootDom.find('.accordion').accordion(accordionOptions);

    var options = {
      height: "200px"
    };

    new Chartist.Pie(rootDom.find(`.${styles.pieChartContainer} .ct-chart`)[0], chartistData, options);
  }
}
