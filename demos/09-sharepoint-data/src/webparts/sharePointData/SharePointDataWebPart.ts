import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SharePointDataWebPartStrings';
import SharePointData from './components/SharePointData';
import { ISharePointDataProps } from './components/ISharePointDataProps';

//add
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';
import MockHttpClient from './MockHttpClient';
import { ISPList } from './ISPList';

export interface ISharePointDataWebPartProps {
  description: string;
}

export default class SharePointDataWebPart extends BaseClientSideWebPart<ISharePointDataWebPartProps> {

  public render(): void {
    /*
    const element: React.ReactElement<ISharePointDataProps > = React.createElement(
      SharePointData,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
    */

    this._getListData().then(lists => {
      const element: React.ReactElement<ISharePointDataProps> = React.createElement(SharePointData, {
        description: this.properties.description,
        lists: lists
      });

      ReactDom.render(element, this.domElement);
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

  private _getMockListData(): Promise<ISPList[]> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl)
        .then((data: ISPList[]) => {
              return data;
          });
  }

  private _getSharePointListData(): Promise<ISPList[]> {
    const url: string = this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`;

    //https://dev.office.com/sharepoint/reference/spfx/sp-http/class/sphttpclient
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json.value;
      }) as Promise<ISPList[]>;
  }

  private _getListData(): Promise<ISPList[]> {
    if(Environment.type === EnvironmentType.Local) {
        return this._getMockListData();
    }
    else {
      return this._getSharePointListData();
    }
  }
}
