import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SharePointUiFabric2WebPartStrings';
import SharePointUiFabric2 from './components/SharePointUiFabric2';
import { ISharePointUiFabric2Props } from './components/ISharePointUiFabric2Props';

export interface ISharePointUiFabric2WebPartProps {
  description: string;
}

export default class SharePointUiFabric2WebPart extends BaseClientSideWebPart<ISharePointUiFabric2WebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISharePointUiFabric2Props > = React.createElement(
      SharePointUiFabric2,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
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
