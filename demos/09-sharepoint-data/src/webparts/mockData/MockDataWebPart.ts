import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'MockDataWebPartStrings';
import MockData from './components/MockData';
import { IMockDataProps } from './components/IMockDataProps';

//insert
import MockHttpClient from './MockHttpClient';
import { ISPList } from './ISPList';

export interface IMockDataWebPartProps {
  description: string;
}

export default class MockDataWebPart extends BaseClientSideWebPart<IMockDataWebPartProps> {

  public render(): void {
    
    /*
    const element: React.ReactElement<IMockDataProps > = React.createElement(
      MockData,
      {
        description: this.properties.description
      }

      ReactDom.render(element, this.domElement);
    );
    */

    this._getMockListData().then(lists => {
      const element: React.ReactElement<IMockDataProps> = React.createElement(MockData, {
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

  //insert
  private _getMockListData(): Promise<ISPList[]> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl)
        .then((data: ISPList[]) => {
              return data;
          });
  }

}
