import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import styles from './HelloWorldAngular1.module.scss';
import * as strings from 'helloWorldAngular1Strings';
import { IHelloWorldAngular1WebPartProps } from './IHelloWorldAngular1WebPartProps';

import * as angular from 'angular';
import './app/app-module';

export default class HelloWorldAngular1WebPart extends BaseClientSideWebPart<IHelloWorldAngular1WebPartProps> {
  private $injector: ng.auto.IInjectorService;
  private listName: string = "Test";

  public render(): void {
    if (!this.renderedOnce) {
      this.domElement.innerHTML = `
	        <div class="${styles.helloWorld}" ng-controller="HomeController as vm">
	          <div class="${styles.container}">
	            <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
	              <p class='ms-font-l'>There are {{vm.listItems.length}} item(s) in {{vm.listName}} list</p>
	              <table>
	                  <thead ng-show="vm.listItems.length > 0">
	                      <tr>
	                          <th>Title</th>
	                          <th />
	                          <th />
	                      </tr>
	                  </thead>
	                  <tbody>
	                    <tr ng-repeat="item in vm.listItems">
	                      <td><input class='ms-TextField-field' ng-model="item.Title" /></td>
	                      <td>
                          <button class="${styles.button}" ng-click="vm.updateItem(item)">
                            <label class="${styles.label}">Update</label>
                          </button>
                        </td>
	                      <td>
                          <button class="${styles.button}" ng-click="vm.deleteItem(item)">
                            <label class="${styles.label}">Delete</label>
                          </button>
                        </td>
	                    </tr>
	                  </tbody>
	              </table>
	            </div>
	            <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}" ng-show="vm.isAdding">
	              <table>
	                <tr>
	                  <td><input class='ms-TextField-field' ng-model="vm.newItem" /></td>
                    <td>
                      <button class="${styles.button}" ng-click="vm.addNewItem()">
                        <label class="${styles.label}">Add</label>
                      </button>
                    </td>
                    <td>
                      <button class="${styles.button}" ng-click="vm.showAddNew(false)">
                        <label class="${styles.label}">Cancel</label>
                      </button>
                    </td>
	                </tr>
	              </table>
	            </div>
	            <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
                <button class="${styles.button}" ng-click="vm.showAddNew(true)">
                  <label class="${styles.label}">Add New Item</label>
                </button>
	            </div>
	            <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
	              <p class='ms-font-l' ng-class="vm.hasError ? 'ms-fontColor-red': 'ms-fontColor-white'">{{vm.message}}</p>
	            </div>
	          </div>
	        </div>`;

      this.$injector = angular.bootstrap(this.domElement, ['angularApp']);
    }

    this.$injector.get('$rootScope').$broadcast('init', {
      siteUrl: this.context.pageContext.web.absoluteUrl,
      listName: this.listName
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
}
