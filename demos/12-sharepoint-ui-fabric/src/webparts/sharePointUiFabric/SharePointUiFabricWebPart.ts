import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SharePointUiFabricWebPartStrings';
import SharePointUiFabric from './components/SharePointUiFabric';
import { ISharePointUiFabricProps } from './components/ISharePointUiFabricProps';

export interface ISharePointUiFabricWebPartProps {
  description: string;
}

export default class SharePointUiFabricWebPart extends BaseClientSideWebPart<ISharePointUiFabricWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISharePointUiFabricProps > = React.createElement(
      SharePointUiFabric,
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
